// import React from "react";
// import {
//   FunctionComponent,
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
// } from "react";
// import { WindowScroller } from "react-virtualized";
// import { VariableSizeList, FixedSizeList } from "react-window";
// import Card from "./Card/Card";

// export default function CustomReactComponnets() {
//   const list = React.useRef(null);
//   const root = React.useRef(null);

//   // to hold the data of newly fetched page
//   const [rowSizes, setRowSizes] = useState([]);

//   const [pageno, setPageNo] = useState(1);

//   const fetcher = async (pageno) => {
//     const response = await fetch(
//       `https://picsum.photos/v2/list?page=${pageno}&limit=5`
//     );
//     const data = await response.json();

//     console.log(data);

//     setRowSizes((prev) => [...prev, ...data]);
//   };

//   useEffect(() => {
//     fetcher(1);
//   }, []);

//   const onScroll = useCallback(({ scrollTop }) => {
//     list.current?.scrollTo(scrollTop);
//   }, []);

//   rowSizes.map((event) => event);

//   const getItemSize = () => 400;

//   return (
//     <>
//       <WindowScroller onScroll={onScroll}>{() => <div />}</WindowScroller>
//       <VariableSizeList
//         ref={list}
//         itemCount={rowSizes.length}
//         itemSize={getItemSize}
//         width={window.innerWidth - 10}
//         height={window.innerHeight - 80}
//         style={{
//           height: "100% !important",

//           width: "100% !important",
//           overflow: "unset !important",
//         }}
//       >
//         {({ index, style }) => (
//           <>
//             <div ref={root} style={style}>
//               <Card
//                 heading={rowSizes[index].heading}
//                 src={rowSizes[index].download_url}
//                 author={rowSizes[index].author}
//               />
//             </div>
//           </>
//         )}
//       </VariableSizeList>
//     </>
//   );
// }

import React, { useEffect, useRef, useState, useCallback } from "react";
import { WindowScroller } from "react-virtualized";
import { VariableSizeList } from "react-window";
import Card from "./Card/Card";

export default function CustomReactComponnets() {
  const list = useRef(null);
  const root = useRef(null);

  const [rowSizes, setRowSizes] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetcher = async (pageNo) => {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${pageNo}&limit=5`
    );
    const data = await response.json();
    setRowSizes((prev) => [...prev, ...data]);
  };

  const onScroll = useCallback(({ scrollTop, scrollHeight, clientHeight }) => {
    // check if we're about to reach the end of the list
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setPageNo((prev) => prev + 1);
    }
    list.current?.scrollTo(scrollTop);
  }, []);

  useEffect(() => {
    fetcher(1);
  }, []);

  useEffect(() => {
    fetcher(pageNo+1);
  }, [pageNo]);

  const getItemSize = () => 400;

  return (
    <>
      <WindowScroller onScroll={onScroll}>{() => <div />}</WindowScroller>
      <VariableSizeList
        ref={list}
        itemCount={rowSizes.length}
        itemSize={getItemSize}
        width={window.innerWidth - 10}
        height={window.innerHeight - 80}
        style={{
          height: "100% !important",
          width: "100% !important",
          overflow: "unset !important",
        }}
      >
        {({ index, style }) => (
          <div ref={root} style={style}>
            <Card
              id={rowSizes[index].id}
              heading={rowSizes[index].heading}
              src={rowSizes[index].download_url}
              author={rowSizes[index].author}
            />
          </div>
        )}
      </VariableSizeList>
    </>
  );
}
