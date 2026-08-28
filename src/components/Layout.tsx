import { Outlet } from "react-router";
import { Header } from "./Header";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Outlet context={{ debouncedSearchQuery }} />
    </>
  );
}
