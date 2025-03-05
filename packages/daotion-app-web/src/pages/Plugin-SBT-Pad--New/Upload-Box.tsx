/*上传区域组件*/
export const UploaderDDF = reaxper(() => {
	const { reax_DDF } = reaxel__create_SBT();
	
	return <UploadFileBox reaxel_DDF = {() => reax_DDF } />;
});

import { Reaxel_fact__DDF } from '@@reaxels/Reaxel-Factories';
import { reaxel__create_SBT } from '@@reaxels';
import { UploadFileBox } from '@@Xcomponents';
import less from './index.module.less';

import { SVGUploadFileIcon  } from '@@SVGcomponents/all-SBT-SVG';

export const SVGClose = ( props : {
	style? : React.CSSProperties,
	onClick? : React.MouseEventHandler<SVGElement>
} ) => {
	
	return <>
		<svg
			onClick = { props.onClick }
			style = { props.style }
			width = "40"
			height = "40"
			viewBox = "0 0 40 40"
			fill = "none"
			xmlns = "http://www.w3.org/2000/svg"
		>
			<rect
				x = "1"
				y = "1"
				width = "38"
				height = "38"
				rx = "19"
				fill = "white"
			/>
			<path
				fillRule = "evenodd"
				clipRule = "evenodd"
				d = "M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
				fill = "#23262F"
			/>
			<rect
				x = "1"
				y = "1"
				width = "38"
				height = "38"
				rx = "19"
				stroke = "#E6E8EC"
				strokeWidth = "2"
			/>
		</svg>
	</>;
};
