import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

export const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f91700001000001ac22187f3df749b5ac359637c75cb9b5";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  //fetch data from api放入useStae
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", Authorization: auth },
    });
    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
  };

  //load more pic
  const morepicture = async () => {
    let newurl;
    if (currentSearch === "") {
      newurl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newurl = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newurl, {
      method: "GET",
      headers: { Accept: "application/json", Authorization: auth },
    });
    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.photos));
  };

  ///fetch data  when the page load
  useEffect(() => {
    search(intialURL);
  }, []);

  useEffect(() => {
    if (currentSearch === "") {
      search(intialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morepicture}>more</button>
      </div>
    </div>
  );
};
export default Homepage;
