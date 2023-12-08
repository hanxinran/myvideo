import {
	AbsoluteFill,
	interpolate,
	Sequence,
	Loop,
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


export const Count: React.FC<z.infer<typeof myCompSchema>> = ({
	logoColor1,
	logoColor2,
}) => {
	const frame = useCurrentFrame();
	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{ backgroundColor: 'white' }}>
			<AbsoluteFill style={{}}>
				<Loop durationInFrames={60} >
					<Sequence from={30} durationInFrames={30}>
						<Img src={staticFile(`0-0.png`)} alt="" className='img' />
						<Box front={staticFile("1-0.png")} back={staticFile("0-1.png")} ></Box>
						<Img src={staticFile(`1-1.png`)} alt="" className='img' style={{ top: 62 }} />
					</Sequence>
					<Sequence from={0} durationInFrames={30}>
						<Img src={staticFile(`1-0.png`)} alt="" className='img' />
						<Box front={staticFile("2-0.png")} back={staticFile("1-1.png")} ></Box>
						<Img src={staticFile(`2-1.png`)} alt="" className='img' style={{ top: 62 }} />
					</Sequence>
				</Loop>
			</AbsoluteFill>
			{/* <Sequence>
			</Sequence> */}
		</AbsoluteFill>
	);
};
interface Props {
	front: string,
	back: string,
	// rotate: number,
	// zIndex?: number,
	// status: 'moving' | 'hide',
}

const Box = forwardRef(({ front, back, }: Props, ref) => {


	const frame = useCurrentFrame();
	const t = interpolate(
		frame,
		[0, 30],
		[0, 180]
	);
	return <div className='box' style={{ transform: `rotateX(${t}deg)`, zIndex: 1 }}>
		<Img src={front} alt="" className='img' />
		<Img src={back} alt="" className='img rotation' />
	</div>
})