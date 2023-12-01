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
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

  const range = Math.min(1, (frame % fps) / fps);
	const rotateNum = 180*range
	const currentSecond = Math.floor(frame / fps);
	const total = 2
	const ind = Math.floor(currentSecond % total)
	// const ind = currentSecond
	let  r0 = useRef(0)
	let  r1 = useRef(0)
	if(ind === 0){
		r0.current = rotateNum
	}
	if(ind === 1){
		r1.current = rotateNum
	}
	console.log(currentSecond,r0,r1,ind)
	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<AbsoluteFill style={{}}>
				
				<Box front={staticFile("0-0.png")} back={staticFile("2-1.png")} rotate={0} zIndex={ind===2?1:0}></Box>
				<Box front={staticFile("1-0.png")} back={staticFile("0-1.png")} rotate={r1.current} zIndex={ind===1?1:0}></Box>
				<Box front={staticFile("2-0.png")} back={staticFile("1-1.png")} rotate={r0.current} zIndex={ind===0?1:0}></Box>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
interface Props {
  front: string,
  back: string,
	rotate: number,
	zIndex?: number,
}

const Box = forwardRef(({ front, back,rotate=0,zIndex=0 }: Props, ref) => {

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
  return <div className='box' style={{ transform: `rotateX(${rotate}deg)`,zIndex }}>
    <Img src={front} alt="" className='img' />
    <Img src={back} alt="" className='img rotation' />
  </div>
})