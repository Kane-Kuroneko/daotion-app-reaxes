import React from 'react';

interface Props {
	color? : string;
	style?: React.CSSProperties;
};
export const BtnIconShare = ( props: Props ) => {
	
	const { color } = Object.assign(
		{
			color : "#6F767E" ,
			
		} ,
		props ,
	);
	
	const mixedStyle = Object.assign(
		{} ,
		props.style ,
		{},
	);
	
	return <svg
		width = "16"
		height = "16"
		viewBox = "0 0 16 16"
		fill = "none"
		xmlns = "http://www.w3.org/2000/svg"
		style = {mixedStyle}
	>
		<path
			d = "M12.6666 6C12.6666 6.36819 12.9651 6.66667 13.3333 6.66667C13.7014 6.66667 13.9999 6.36819 13.9999 6V3.33333C13.9999 2.59695 13.403 2 12.6666 2H9.99992C9.63173 2 9.33325 2.29848 9.33325 2.66667C9.33325 3.03486 9.63173 3.33333 9.99992 3.33333L11.7238 3.33333L7.52851 7.5286C7.26816 7.78895 7.26816 8.21106 7.52851 8.4714C7.78886 8.73175 8.21097 8.73175 8.47132 8.4714L12.6666 4.27614V6Z"
			fill = {color}
		/>
		<path
			fillRule = "evenodd"
			clipRule = "evenodd"
			d = "M2 4C2 2.89543 2.89543 2 4 2H7.33333C7.70152 2 8 2.29848 8 2.66667C8 3.03486 7.70152 3.33333 7.33333 3.33333H4C3.63181 3.33333 3.33333 3.63181 3.33333 4V12C3.33333 12.3682 3.63181 12.6667 4 12.6667H12C12.3682 12.6667 12.6667 12.3682 12.6667 12V8.66667C12.6667 8.29848 12.9651 8 13.3333 8C13.7015 8 14 8.29848 14 8.66667V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4Z"
			fill = {color}
		/>
	</svg>;
};
