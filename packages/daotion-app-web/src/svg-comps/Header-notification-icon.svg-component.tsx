type props = {
	/*铃铛填充色*/
	lightningFilling?: string;
	/*提示点填充色 , 假值则不显示*/
	dotFilling?: string | any;
	/*提示点切割铃铛的填充色*/
	background?: string;
};
export const HeaderNotificationIconSvgComponent = reaxper(( props: props ) => {
	const reax_theme = reaxel_theme();
	/**
	 * 通过props修改fill , stroke等
	 */
	const scheme = {
		"light" : {
			lightningFilling : "#141416" ,
			dotFilling : "#FF6A55" ,
			background : "white" ,
		} ,
		"dark" : {
			lightningFilling : "#ffffff" ,
			dotFilling : "#FF6A55" ,
			background : "#141416" ,
		} ,
	}[ reax_theme.theme ];
	const mixedProps: props = Object.assign<props , props , props>(
		{} ,
		scheme ,
		props ,
	);
	
	
	return <svg
		width = "26"
		height = "26"
		viewBox = "0 0 28 27"
		fill = "none"
		xmlns = "http://www.w3.org/2000/svg"
	>
		<path
			d = "M10.5601 21.6231V16.9202H7.27947C6.67206 16.9202 6.33759 16.2144 6.72222 15.7443L13.1228 7.92126C13.5514 7.39756 14.4001 7.70055 14.4001 8.3772V13.0802H17.6807C18.2881 13.0802 18.6226 13.786 18.238 14.2561L11.8374 22.0791C11.4088 22.6028 10.5601 22.2998 10.5601 21.6231Z"
			fill = {scheme.lightningFilling}
		/>
		<rect
			x = "17.5"
			y = "0.5"
			width = "9.33333"
			height = "9.33333"
			rx = "4.66667"
			fill = {scheme.dotFilling}
		/>
		<rect
			x = "17.5"
			y = "0.5"
			width = "9.33333"
			height = "9.33333"
			rx = "4.66667"
			stroke = "#FCFCFC"
		/>
	</svg>;
	
	
	
	
	
	return <svg
		width = "24"
		height = "24"
		viewBox = "0 0 24 24"
		fill = "none"
		xmlns = "http://www.w3.org/2000/svg"
	>
		<path
			fillRule = "evenodd"
			clipRule = "evenodd"
			d = "M0 18.5959C2.07459e-06 18.2151 0.154705 17.8506 0.428635 17.586L1.45759 16.5922C1.84928 16.2139 2.06977 15.6922 2.06814 15.1476L2.05867 11.9946C2.04543 7.58319 5.61789 4 10.0293 4C14.4314 4 18 7.56859 18 11.9707L18 15.1716C18 15.702 18.2107 16.2107 18.5858 16.5858L19.5858 17.5858C19.851 17.851 20 18.2107 20 18.5858C20 19.3668 19.3668 20 18.5858 20H14C14 22.2091 12.2091 24 10 24C7.79086 24 6 22.2091 6 20H1.40408C0.628628 20 0 19.3714 0 18.5959ZM8 20C8 21.1046 8.89543 22 10 22C11.1046 22 12 21.1046 12 20H8ZM16 15.1716C16 16.2324 16.4214 17.2499 17.1716 18L2.87851 18C3.64222 17.246 4.07136 16.2161 4.06813 15.1416L4.05867 11.9886C4.04875 8.6841 6.7248 6 10.0293 6C13.3268 6 16 8.67316 16 11.9707L16 15.1716Z"
			fill = {mixedProps.lightningFilling}
		/>
		<rect
			x = "11"
			y = "1"
			width = "12"
			height = "12"
			rx = "6"
			fill = "#FF6A55"
		/>
		<rect
			x = "11"
			y = "1"
			width = "12"
			height = "12"
			rx = "6"
			stroke = "#FCFCFC"
			strokeWidth = "2"
		/>
	</svg>
	
	
});
import {reaxel_theme} from '@@reaxels';
