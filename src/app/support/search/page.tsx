import { SearchField } from "@/components/SearchField";
import { SearchResults } from "../_component/SearchResults";
import ContactCard from "../_component/ContactCard";

export default function SearchPage() {
  return (
    <main className="container py-8 space-y-8 md:py-16 font-DMSans">
      <SearchField />
      <SearchResults />
      <ContactCard />
    </main>
  );
}