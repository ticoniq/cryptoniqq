import { replaceHyphenWithSpace, replaceSpaceWithHyphen } from "@/lib/utils";
import { notFound } from "next/navigation";
import { gettingStartedData } from "../_data/supportData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { Metadata } from "next";
import { SearchField } from "@/components/SearchField";
import { CustomLink } from "@/components/CustomLink";
import ContactCard from "../_component/ContactCard";

interface PageProps {
  params: { category: string };
}

export async function generateMetadata({
  params: { category },
}: PageProps): Promise<Metadata> {

  return {
    title: category,
  };
}

function getCategoryData(category: string) {
  return gettingStartedData.find(item => item.category.toLowerCase() === category.toLowerCase());
}

export default function Page({ params: { category } }: PageProps) {

  if (!category) notFound();

  const formattedSlug = replaceHyphenWithSpace(category);
  const categoryData = getCategoryData(formattedSlug);

  if (!categoryData) notFound();

  return (
    <>
      <section className="bg-brand-surface dark:bg-brand-hover py-3">
        <Breadcrumb className="container">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/support">Cryptoniq Support Center</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{formattedSlug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <main className="container py-10 space-y-10">
        <span className="block lg:hidden">
          <SearchField />
        </span>
        <div className="flex flex-col md:flex-row w-full gap-8">
          <div className="w-full md:max-w-[176px] md:border-r md:border-gray-200">
            <ul className="tab-nav flex flex-col md:items-start items-center lg:gap-10 gap-6">
              {gettingStartedData.map((categoryData, index) => (
                <li key={index}>
                  <Link
                    href={`/support/${replaceSpaceWithHyphen(categoryData.category)}`}
                    className="font-medium text-base leading-7 text-indigo-600"
                  >
                    {categoryData.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full tab-pane space-y-10">
            <span className="hidden lg:block">
              <SearchField />
            </span>
            <h2 className="font-manrope font-bold lg:text-4xl text-3xl mb-5">{categoryData.category}</h2>
            <h5 className="font-manrope font-semibold md:text-3xl text-2xl mb-4">{categoryData.category} with Cryptoniq</h5>
            <ul className="ml-4 lg:mb-10 mb-8 space-y-7">
              {categoryData.subcategories.map((subcategory, index) => (
                <li key={index} className="list-disc font-normal text-lg">
                  <CustomLink
                    href={`/support/${replaceSpaceWithHyphen(categoryData.category)}/${replaceSpaceWithHyphen(subcategory.name)}`}
                    textarea={subcategory.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ContactCard />
      </main>
    </>
  );
}