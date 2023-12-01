import { Img, staticFile } from "remotion";
 

import { useState, forwardRef, useImperativeHandle,useRef } from 'react'

interface Props {
  front: string,
  back: string
}

const Box = forwardRef(({ front, back }: Props, ref) => {

  const [count, setCount] = useState(0)
  const handleCount = () => {
    setCount(180)
  }
  useImperativeHandle(ref, () => {
    return {
      // ... your methods ...
      handleCount
    };
  }, []);
  return <div className='box' style={{ transform: `rotateX(${count}deg)` }}>
    <img src={front} alt="" className='img' />
    <img src={back} alt="" className='img rotation' />
  </div>
})




export default function Countdown() {
  const refFront = useRef(null);
  const refBack = useRef(null);
  const itemsRef = useRef<any>();
   function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  const start = () => {
    refFront.current.handleCount()
  }

  const refFn = (node:any,id:string) => {
    const map = getMap();
    if(map ===null) return
    if (node) {
      // 添加到 Map
      map.set(id, node);
    } else {
      // 从 Map 删除
      map.delete(id);
    }
  }
  return <div>
    <div onClick={start} style={{ marginBottom: 20 }}>翻转</div>
    <Box front={staticFile("1-0.png")} back={staticFile("0-1.png")} ref={refBack}></Box>
    <Box front={staticFile("2-0.png")} back={staticFile("1-1.png")} ref={refFront}></Box>
  </div>
}
