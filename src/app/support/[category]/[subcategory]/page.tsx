import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { replaceHyphenWithSpace, replaceSpaceWithHyphen } from "@/lib/utils";
import { gettingStartedData } from "../../_data/supportData";
import ContactCard from "../../_component/ContactCard";

// Type definitions
type DescriptionItem = string | { step: string; details: string };
type Description = DescriptionItem[];

interface Subcategory {
  name: string;
  description: Description;
}

interface Category {
  category: string;
  subcategories: Subcategory[];
}

interface PageProps {
  params: { category: string; subcategory: string };
}

export async function generateMetadata({
  params: { category, subcategory },
}: PageProps) {
  return {
    title: `${replaceHyphenWithSpace(category)} | ${replaceHyphenWithSpace(subcategory)}`,
  };
}

export default function Page({ params: { category, subcategory } }: PageProps) {
  if (!category || !subcategory) notFound();

  // Find the category data
  const categoryData = gettingStartedData.find(
    (cat) => replaceSpaceWithHyphen(cat.category).toLowerCase() === category.toLowerCase()
  );

  if (!categoryData) notFound();

  // Find the subcategory data
  const subcategoryData = categoryData.subcategories.find(
    (sub) => replaceSpaceWithHyphen(sub.name).toLowerCase() === subcategory.toLowerCase()
  );

  if (!subcategoryData) notFound();

  return (
    <>
      <section className="bg-brand-surface dark:bg-brand-hover py-3 font-DMSans">
        <Breadcrumb className="container">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/support">Cryptoniq Support Center</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/support/${category}`}>
                {replaceHyphenWithSpace(category)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{replaceHyphenWithSpace(subcategory)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <main className="container py-10 space-y-16 md:py-16">
        <h2 className="text-3xl font-bold mb-4">{replaceHyphenWithSpace(subcategory)}</h2>
        <ul className="space-y-10">
          {subcategoryData.description.map((item, index) => (
            <li key={index} className="space-y-10">
              {typeof item === 'string' ? (
                <p>{item}</p>
              ) : (
                <div>
                  <h5 className="font-manrope font-bold md:text-3xl text-2xl mb-1">{item.step}</h5>
                  <p className="mt-5 font-normal text-lg leading-8 text-gray-500">{item.details}</p>
                </div>
              )}
            </li>
          ))}
        </ul>

        <ContactCard />
      </main>
    </>
  )
}