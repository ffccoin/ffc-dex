"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const TableSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <input
      type="text"
      placeholder="Search"
      defaultValue={searchParams.get("query")}
      onChange={(e) => handleSearch(e.target.value)}
      className="bg-gray22/50 rounded-lg p-2 outline-none focus:outline-none text-white"
    />
  );
};

export default TableSearch;
