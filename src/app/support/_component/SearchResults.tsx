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
            item
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
        <ul>
          {results.map((result, index) => (
            <li key={index} className="border-b py-5">
              <strong>
                <CustomLink
                  href={`/support/${replaceSpaceWithHyphen(result.category)}`}
                  textarea={result.category}
                />
              </strong> &gt; {" "}
              <CustomLink
                href={`/support/${replaceSpaceWithHyphen(result.subcategory)}/${replaceSpaceWithHyphen(result.subcategory)}`}
                textarea={result.subcategory}
              />
              <p>{result.item}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}