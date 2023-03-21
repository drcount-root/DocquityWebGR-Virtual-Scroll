import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { FunctionComponent, useEffect, useRef, useState, useCallback } from 'react';
import { WindowScroller } from "react-virtualized";
import { VariableSizeList, FixedSizeList } from "react-window";
import Card from './Card/Card';


export default function CustomReactComponnets() {
  const list = React.useRef(null);
  const root = React.useRef(null);
  console.log('list', list);
  const onScroll = useCallback(({ scrollTop }) => {
    console.log('scrollTop', scrollTop);
    list.current?.scrollTo(scrollTop);
  }, []);

  const rowSizes = new Array(
    {id: 0, height: 320, heading: 'heading 1', src: 'https://picsum.photos/300/100'},
    {id: 1, height: 370, heading: 'heading 2', src: 'https://picsum.photos/300/100'},
    {id: 2, height: 380, heading: 'heading 3', src: 'https://picsum.photos/300/100'},
    {id: 3, height: 400, heading: 'heading 4', src: 'https://picsum.photos/300/100'},
    {id: 4, height: 410, heading: 'heading 5', src: 'https://picsum.photos/300/100'},
    {id: 5, height: 450, heading: 'heading 6', src: 'https://picsum.photos/300/100'},
    {id: 6, height: 300, heading: 'heading 7', src: 'https://picsum.photos/300/100'},
    {id: 7, height: 500, heading: 'heading 8', src: 'https://picsum.photos/300/100'},
    {id: 8, height: 390, heading: 'heading 9', src: 'https://picsum.photos/300/100'}
  ).map((event) => event);

  const getItemSize = (index) => rowSizes[index].height;


  return (
    <>
    <WindowScroller onScroll={onScroll}>
        {() => <div />}
      </WindowScroller>
        <VariableSizeList
          ref={list}
          itemCount={rowSizes.length}
          itemSize={getItemSize}
          width={window.innerWidth - 10}
          height={window.innerHeight - 80}
          style={{
            height: '100% !important',
            width: '100% !important',
            overflow: 'unset !important'
          }}
        >
          {
            ({ index, style }) =>
            <>
            <div ref={root} className='border rounded shadow p-3 text-center' style={style}>
              <div>
                <h4>{rowSizes[index].heading}</h4>
                <p>Sub heading</p>
                <img className='rounded' src={rowSizes[index].src} alt="image"/>
                <button className='btn btn-success mt-5'>Click Me</button>
              </div>
            </div>
            </>
          }
        </VariableSizeList>
    </>
  );
};
