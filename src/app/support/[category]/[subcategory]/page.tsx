import { replaceHyphenWithSpace, replaceSpaceWithHyphen } from "@/lib/utils";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface PageProps {
  params: { category: string, subcategory: string };
}

export async function generateMetadata({
  params: { category, subcategory },
}: PageProps) {
  return {
    title: `${category} | ${replaceHyphenWithSpace(subcategory)}`,
  };
}

export default function Page({ params: { category, subcategory } }: PageProps) {

  if (!category || !subcategory) notFound();

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
      <main className="container">
        {replaceHyphenWithSpace(category)} <br />
        {replaceHyphenWithSpace(subcategory)}
        page
      </main>
    </>
  )
}