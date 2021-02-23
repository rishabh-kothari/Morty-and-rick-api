import { useState, useEffect } from "react";
import axios from "axios";

const Search = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPeople([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: "GET",
      url: `https://rickandmortyapi.com/api/character`,
      params: { name: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // console.log(res.data.results)
        setPeople((prevPeople) => {
          return [...new Set([...prevPeople, ...res.data.results])];
        });
        setHasMore(pageNumber <= 5);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, people, hasMore };
};

export default Search;
