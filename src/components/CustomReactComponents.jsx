// // import * as React from 'react';
// // import { useEffect, useState, useCallback } from 'react';
// // import { WindowScroller } from "react-virtualized";
// // import { VariableSizeList, FixedSizeList } from "react-window";
// // import Card from './Card/Card';
// // import axios from 'axios';

// // export default function CustomReactComponnets() {
// //   const list = React.useRef(null);
// //   const root = React.useRef(null);
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const onScroll = useCallback(({ scrollTop }) => {
// //     console.log('scrollTop', scrollTop);
// //     list.current?.scrollTo(scrollTop);
// //   }, []);

// //   const rowSizes = new Array(100).fill(null).map((_, index) => {
// //     return { id: index, height: Math.floor(Math.random() * 100) + 200 };
// //   });

// //   const getItemSize = (index) => rowSizes[index].height;

// //   const fetchUsers = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get('https://randomuser.me/api/?results=5000');
// //       const newUsers = response.data.results.map((user) => {
// //         return {
// //           id: user.login.uuid,
// //           name: `${user.name.first} ${user.name.last}`,
// //           email: user.email,
// //           picture: user.picture.large
// //         };
// //       });
// //       setUsers((prevUsers) => [...prevUsers, ...newUsers]);
// //       setLoading(false);
// //     } catch (error) {
// //       setError(error);
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchUsers();
// //   }, [fetchUsers]);

// //   const renderRow = ({ index, style }) => {
// //     if (index === users.length - 1 && !loading) {
// //       fetchUsers();
// //     }

// //     if (index >= users.length) {
// //       return null;
// //     }

// //     const user = users[index];

// //     return (
// //       <div className="row" style={style} key={user.id}>
// //         <div className="col-4">
// //           <img src={user.picture} alt={user.name} className="rounded-circle" />
// //         </div>
// //         <div className="col-8">
// //           <h5>{user.name}</h5>
// //           <p>{user.email}</p>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <WindowScroller onScroll={onScroll}>
// //         {() => <div />}
// //       </WindowScroller>
// //       <VariableSizeList
// //         ref={list}
// //         itemCount={users.length + 1}
// //         itemSize={getItemSize}
// //         width={window.innerWidth - 10}
// //         height={window.innerHeight - 80}
// //         style={{
// //           height: '100% !important',
// //           width: '100% !important',
// //           overflow: 'unset !important'
// //         }}
// //       >
// //         {renderRow}
// //       </VariableSizeList>
// //     </>
// //   );
// // };

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
  const [pageno, setPageno] = useState(1);

  // API
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageno}&limit=10`
      );

      const data = await response.json();

      console.log(data);
      setData(data);
      setPageno(prev => prev+1)
    };

    fetcher();
  }, []);

  

  console.log("list", list);

  const onScroll = useCallback(({ scrollTop }) => {
    console.log("scrollTop", scrollTop);
    list.current?.scrollTo(scrollTop);
  }, []);

  data.map(event => event);

  

  const getItemSize = (index) => data[index].height;

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
          height: "100% !important",
          width: "100% !important",
          overflow: "unset !important",
        }}
      >
        {({ index, style }) => (
          <>
            <div ref={root} style={style}>
              <div className="card">
                <h4>Image Id: {data[index].id}</h4>
                <img src={data[index].download_url} alt="image" width={300} height={300}/>
                <p>Author : {data[index].author}</p>
                <p>Id: {data[index].id}</p>
                <button>Click Me</button>
              </div>
            </div>
          </>
        )}
      </VariableSizeList>
    </>
  );
}
