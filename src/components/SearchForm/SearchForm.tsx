import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.css";

interface Props {
  onSearchCity: (city: string) => void;
}

const SearchFom = ({ onSearchCity }: Props) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchCity(city);
  };
  return (
    <form className={styles["input-group"]} onSubmit={handleSubmit}>
      <input
        placeholder="Enter City Name"
        className={styles["search-input"]}
        type="text"
        onChange={(e) => setCity(e.target.value)}
      />
      <button className={styles["search-btn"]} type="submit">
        <FiSearch opacity={0.7} />
      </button>
    </form>
  );
};

export default SearchFom;
