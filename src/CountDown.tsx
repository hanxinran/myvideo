import {spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,Img, staticFile
} from 'remotion';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import { useState, forwardRef, useImperativeHandle,useRef } from 'react'
import "./style.css";

export const myCompSchema = z.object({
	logoColor1: zColor(),
	logoColor2: zColor(),
});

export const Countdown: React.FC<z.infer<typeof myCompSchema>> = ({
	logoColor1,
	logoColor2,
}) => {
	const _frame = useCurrentFrame();
	const frame = _frame + 3
	const {durationInFrames, fps} = useVideoConfig();
	const yushu = frame % fps
  const range = Math.min(1, (frame % fps) / fps);
	const rotateNum = 180*range
	const currentSecond = Math.floor(frame / fps);
	const total = 2
	const ind = Math.floor(currentSecond % total)
	// const ind = currentSecond
	let  flag = useRef(false)
	// let  r0 = useRef(0)
	// let  r1 = useRef(0)
	// if(ind === 0){
	// 	r0.current = rotateNum
	// }
	// if(ind === 1){
	// 	r1.current = rotateNum
	// }
	//在moving 动画结束后，把rotate值重置为0，并切换到hide（隐藏）状态，将当前数字 下部分显示
	if(yushu == 0){
		flag.current =!flag.current
	}
	//moving 时 把frame 给到组件
	console.log(currentSecond,ind,yushu)
	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<AbsoluteFill style={{}}>
				
				{/* <Box front={staticFile("0-0.png")} back={staticFile("2-1.png")} rotate={0} zIndex={ind===2?1:0}></Box> */}
				<Box front={staticFile("1-0.png")} back={staticFile("0-1.png")} rotate={rotateNum} status={!flag.current?'hide':'moving'}></Box>
				<Box front={staticFile("2-0.png")} back={staticFile("1-1.png")} rotate={rotateNum} status={flag.current?'hide':'moving'}></Box>
			</AbsoluteFill>
			<AbsoluteFill style={{}}>
					
				<Img src={staticFile("0-1.png")} alt="" className='down' />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
interface Props {
  front: string,
  back: string,
	rotate: number,
	// zIndex?: number,
	status:'moving' | 'hide',
}

const Box = forwardRef(({ front, back,rotate=0,status }: Props, ref) => {

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
	let r=0
	let z = 0
	// let status
	if(status === 'moving'){
		r = rotate
	}else if(status === 'hide'){
		r = 0
		z =-1
	}
  return <div className='box' style={{ transform: `rotateX(${r}deg)`,zIndex:z }}>
    <Img src={front} alt="" className='img' />
    <Img src={back} alt="" className='img rotation' />
  </div>
})