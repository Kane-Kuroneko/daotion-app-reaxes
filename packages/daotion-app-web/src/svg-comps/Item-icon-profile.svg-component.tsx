import React  from 'react';

interface Props {
	color? : string,
};
export const ItemIconProfileSvgComponent = ( props:Props ) => {
	
	const {color} = Object.assign(
		{
			color : "#777E90",
		} ,
		props,
	);
	
	return <svg
		width = "20"
		height = "20"
		viewBox = "0 0 20 20"
		fill = "none"
		xmlns = "http://www.w3.org/2000/svg"
	>
		<g clipPath = "url(#clip0_289_6508)">
			<path
				fillRule = "evenodd"
				clipRule = "evenodd"
				d = "M10 11.8313C6.77834 11.8313 4.16667 14.443 4.16667 17.6647V19.3313C4.16667 19.7916 3.79357 20.1647 3.33333 20.1647C2.8731 20.1647 2.5 19.7916 2.5 19.3313V17.6647C2.5 13.5225 5.85786 10.1647 10 10.1647C14.1421 10.1647 17.5 13.5225 17.5 17.6647V19.3313C17.5 19.7916 17.1269 20.1647 16.6667 20.1647C16.2064 20.1647 15.8333 19.7916 15.8333 19.3313V17.6647C15.8333 14.443 13.2217 11.8313 10 11.8313Z"
				fill = {color}
			/>
			<path
				fillRule = "evenodd"
				clipRule = "evenodd"
				d = "M10 10.1648C11.8409 10.1648 13.3333 8.67237 13.3333 6.83142C13.3333 4.99047 11.8409 3.49809 10 3.49809C8.15905 3.49809 6.66667 4.99047 6.66667 6.83142C6.66667 8.67237 8.15905 10.1648 10 10.1648ZM10 11.8314C12.7614 11.8314 15 9.59284 15 6.83142C15 4.07 12.7614 1.83142 10 1.83142C7.23858 1.83142 5 4.07 5 6.83142C5 9.59284 7.23858 11.8314 10 11.8314Z"
				fill = {color}
			/>
		</g>
		<defs>
			<clipPath id = "clip0_289_6508">
				<rect
					width = "20"
					height = "20"
					fill = "white"
					transform = "translate(0 0.998047)"
				/>
			</clipPath>
		</defs>
	</svg>;
};
