import React, { useState, useEffect } from "react";
import Card from './Card/Card';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=5`
    );
    const newData = await response.json();
    setData((prevData) => [...prevData, ...newData]);
    console.log(newData);
  };

  return (
    <div className="container">
      {data.map((item) => (
        <div key={item.url}>
          <Card id={item.id} author={item.author} src={item.download_url} width={300} height={200}/>
        </div>
      ))}
    </div>
  );
}

export default App;