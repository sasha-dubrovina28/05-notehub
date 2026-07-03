import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}   // 🔥 CRITICAL FIX
      onPageChange={(e) => onChange(e.selected + 1)}
      className={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
    />
  );
}