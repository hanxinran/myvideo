import { spring } from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig, Img, staticFile
} from 'remotion';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react'
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
	// const frame = _frame
	const { durationInFrames, fps } = useVideoConfig();
	const yushu = frame % fps
	const range = Math.min(1, (frame % fps) / fps);
	const rotateNum = 180 * range
	// const currentSecond = Math.floor(frame / fps);
	// const total = 2
	// const ind = Math.floor(currentSecond % total)
	// const ind = currentSecond
	let flag = useRef(false)
	let numRef = useRef(2)
	//在moving 动画结束后，把rotate值重置为0，并切换到hide（隐藏）状态，将当前数字 下部分显示
	if (yushu == 0 && frame !== 0) {
		if (numRef.current == 0) {
			numRef.current = 2
		} else {
			numRef.current = numRef.current - 1
		}
		flag.current = !flag.current
		console.log(numRef.current, yushu)
	}
	//moving 时 把frame 给到组件
	const num = numRef.current

	console.log(frame,num,flag.current)
	const imgSrc = (flag: boolean) => {
		let n = num, m = num - 1;
		if (num == 1) {
			n = 2
		}
		if (num == 0) {
			n = 1
			m = 2
		}
		if (!flag) {
			return {
				front: staticFile(`${num}-0.png`),
				back: staticFile(`${m}-1.png`)
			}
		} else {
			return {
				front: staticFile(`${m}-0.png`),
				back: staticFile(`${n}-1.png`)
			}
		}

	}

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{ backgroundColor: 'white' }}>
				<AbsoluteFill style={{}}>

					<Img src={staticFile(`${num}-1.png`)} alt="" className='down' />
					{/* <Box front={staticFile("0-0.png")} back={staticFile("2-1.png")} rotate={0} zIndex={ind===2?1:0}></Box> */}
					<Box front={imgSrc(!flag.current).front} back={imgSrc(!flag.current).back} rotate={rotateNum} status={!flag.current ? 'hide' : 'moving'}></Box>
					<Box front={imgSrc(flag.current).front} back={imgSrc(flag.current).back} rotate={rotateNum} status={flag.current ? 'hide' : 'moving'}></Box>
				</AbsoluteFill>
			{/* <Sequence>
			</Sequence> */}
		</AbsoluteFill>
	);
};

interface Props {
	front: string,
	back: string,
	rotate: number,
	// zIndex?: number,
	status: 'moving' | 'hide',
}

const Box = forwardRef(({ front, back, rotate = 0, status }: Props, ref) => {

	// const [count, setCount] = useState(0)
	// const handleCount = () => {
	// 	setCount(180)
	// }
	// useImperativeHandle(ref, () => {
	// 	return {
	// 		// ... your methods ...
	// 		handleCount
	// 	};
	// }, []);
	let r = 0
	let z = 0
	// let status
	if (status === 'moving') {
		r = rotate
		z = 1
	} else if (status === 'hide') {
		r = 0
		z = 0
	}
	return <div className='box' style={{ transform: `rotateX(${r}deg)`, zIndex: z }}>
		<Img src={front} alt="" className='img' />
		<Img src={back} alt="" className='img rotation' />
	</div>
})