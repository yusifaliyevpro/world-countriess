"use client";

import useStore from "@/lib/store";
import { Pagination } from "@heroui/pagination";

export default function PaginationUI({ count }: { count: number }) {
  const setPage = useStore((state) => state.setPage);
  const page = useStore((state) => state.page);
  const search = useStore((state) => state.search);
  const total = Math.ceil((search ? 30 : count) / 30);

  return count !== 0 ? (
    <div className="relative mt-5 flex w-full items-center justify-center">
      <Pagination page={page < total ? page : total} total={total !== 0 ? total : 1} onChange={(page) => setPage(page)} />
    </div>
  ) : (
    ""
  );
}
