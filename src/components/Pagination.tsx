"use client";

import { useQueryState } from "nuqs";
import { Pagination } from "@heroui/pagination";
import { searchParams } from "@/lib/searchParams";

export default function PaginationUI({ count }: { count: number }) {
  const [searchQuery] = useQueryState("q", searchParams.q);
  const [pageQuery, setPage] = useQueryState("p", searchParams.p);

  const total = Math.ceil((searchQuery ? 30 : count) / 30);

  return (
    <div className="relative mt-5 flex w-full items-center justify-center">
      <Pagination page={pageQuery < total ? pageQuery : total} total={total !== 0 ? total : 1} onChange={setPage} />
    </div>
  );
}
