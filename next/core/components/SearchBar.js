import styles from "./SearchBar.module.css";

export default function SearchBar({ setSearchQuery }) {
  return (
    <div className={styles.container}>
      <form onSubmit={(e) => e.preventDefault()}>
        <span className={styles.description}>Search Games: </span>
        <input
          type="text"
          id="search-field"
          placeholder="Enter Title"
          name="search"
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        ></input>
      </form>
    </div>
  );
}
