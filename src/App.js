import "./App.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Search from "./components/Search";
import Content from "./components/Content";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [display, setDisplay] = useState(false);
  const { people, hasMore, loading, error } = Search(query, pageNumber);

  const observer = useRef();
  const lastPersonRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
        //console.log(pageNumber)
      });
      if (node) observer.current.observe(node);
      //console.log(node)
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
    e.target.value === "" ? setDisplay(false) : setDisplay(true);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        MORTY AND RICK API
      </h1>
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search for a Contact"
          aria-label="Search"
          value={query}
          onChange={handleSearch}
        />
      </form>
      <Content
        people={people}
        display={display}
        loading={loading}
        error={error}
        lastPersonRef={lastPersonRef}
      />
    </div>
  );
}

export default App;
