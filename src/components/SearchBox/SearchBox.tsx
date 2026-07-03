import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}
export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      placeholder="Search notes"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}