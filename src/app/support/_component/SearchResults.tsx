"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { gettingStartedData } from "../_data/supportData";
import Link from "next/link";
import { replaceSpaceWithHyphen } from "@/lib/utils";
import { CustomLink } from "@/components/CustomLink";

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [results, setResults] = useState<{ category: string; subcategory: string; item: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Simulate an API call with setTimeout
    setTimeout(() => {
      const filteredResults = gettingStartedData.flatMap(category =>
        category.subcategories.flatMap(subcategory =>
          subcategory.description.map(item => ({
            category: category.category,
            subcategory: subcategory.name,
            item: typeof item === 'string' ? item : item.step // Assuming you want to use the 'step' property of the object as the 'item' value
          }))
        )
      ).filter(result =>
        result.category.toLowerCase().includes(query) ||
        result.subcategory.toLowerCase().includes(query) ||
        result.item.toLowerCase().includes(query)
      );

      setResults(filteredResults);
      setIsLoading(false);
    }, 500); // Simulating a 500ms delay
  }, [query]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <section>
          {results.map((result, index) => (
            <div key={index} className="border-b py-5">
              <strong>
                <CustomLink
                  href={`/support/${replaceSpaceWithHyphen(result.category)}`}
                  textarea={result.category}
                />
              </strong> &gt; {" "}
              <CustomLink
                href={`/support/${replaceSpaceWithHyphen(result.category)}/${replaceSpaceWithHyphen(result.subcategory)}`}
                textarea={result.subcategory}
              />
              <p>{result.item}</p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}