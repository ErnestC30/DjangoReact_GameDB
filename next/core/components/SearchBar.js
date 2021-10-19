import styles from "./SearchBar.module.css";

export default function SearchBar({ setSearchQuery }) {
  /* Searchbar component to query games by title or tags.
     Returns the text of the search query to the /games/index page */

  return (
    <div className={styles.container}>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <span className={styles.description}>Search Games: </span>
        <input
          className={styles.inputField}
          type="text"
          id="search-field"
          placeholder="Enter Title or Tags"
          name="search"
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        ></input>
      </form>
    </div>
  );
}
