import axios from "axios";
import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { WindowScroller } from "react-virtualized";
import { VariableSizeList, FixedSizeList } from "react-window";
// import Card from './Card/Card';
import './CustomReactComponents.css';

export default function CustomReactComponnets() {
  const list = useRef(null);
  const root = useRef(null);
  const [pageno, setPageno] = useState(0);

  // API
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageno}&limit=10`
      );

      const data = await response.json();

      console.log(data);
      // setData(data);
      setData(prevData => [...prevData, ...data]);
      setPageno(prev => prev+1)
    };

    fetcher();
    setPageno(prev => prev+1)
  }, []);


  useEffect(()=>{
    const fetcher = async () => {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageno+1}&limit=10`
      );

      const data = await response.json();

      console.log(data);
      setData(prevData => [...prevData, ...data]);
    };

    fetcher();
  }, [pageno])

  

  console.log("list", list);

  const onScroll = useCallback(({ scrollTop }) => {
    // console.log("scrollTop", scrollTop);
    list.current?.scrollTo(scrollTop);
  }, []);

  data.map(event => event);

  

  const getItemSize = (index) => 450;

  return (
    <>
      <WindowScroller onScroll={onScroll}>{() => <div />}</WindowScroller>
      <VariableSizeList
        ref={list}
        // itemCount={rowSizes.length}
        itemCount={data.length}
        itemSize={getItemSize}
        width={window.innerWidth - 10}
        height={window.innerHeight - 80}
        style={{
          height: "10% !important",
          width: "100% !important",
          overflow: "unset !important",
        }}
      >
        {({ index, style }) => (
          <>
            <div ref={root} style={style}>
              <div className="card">
                <h4>Image Id: {data[index].id}</h4>
                <img src={data[index].download_url} alt="image" width={300} height={200}/>
                
                <p>Author : {data[index].author}</p>
                <button>Click Me</button>
              </div>
            </div>
          </>
        )}
      </VariableSizeList>
    </>
  );
}