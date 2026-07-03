import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onChange: (page: number) => void;
}
export default function Pagination({
  pageCount,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(e) => onChange(e.selected + 1)}
      className={css.pagination}
    />
  );
}