export const Header_GoBack = () => {
	return <>
		<div
			style = { {
				display : "flex" ,
				width : "100%",
				height : "80px",
				
			} }
		>
			<Button
				onClick = { () => {
					history.back();
				} }
				className = { less.goBackBtn }
			>
				<SVGGoBack />
				<span>Go Back</span>
			</Button>
		</div>
	</>;
};
import { Button } from 'antd';
import less from './index.module.less';

const SVGGoBack = reaxper(() => {
	return <>
		<svg
			width = "16"
			height = "17"
			viewBox = "0 0 16 17"
			fill = "none"
			xmlns = "http://www.w3.org/2000/svg"
		>
			<path
				d = "M7.13862 12.3619C7.39897 12.6223 7.39897 13.0444 7.13862 13.3047C6.87827 13.5651 6.45616 13.5651 6.19581 13.3047L2.33388 9.44281C1.81319 8.92211 1.81318 8.07789 2.33388 7.55719L6.19581 3.69526C6.45616 3.43491 6.87827 3.43491 7.13862 3.69526C7.39897 3.95561 7.39897 4.37772 7.13862 4.63807L3.94336 7.83333H13.3339C13.7021 7.83333 14.0006 8.13181 14.0006 8.5C14.0006 8.86819 13.7021 9.16667 13.3339 9.16667H3.94336L7.13862 12.3619Z"
				fill = "#353945"
			/>
		</svg>
	</>;
});
