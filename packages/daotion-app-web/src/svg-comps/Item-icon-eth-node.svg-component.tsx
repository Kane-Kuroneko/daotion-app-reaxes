import React from 'react';

interface Props {
	src? : string;
};
export const ItemIconEthNode = ( props: Props ) => {
	
	if(props.src){
		return <img
			width = "24"
			height = "24"
			src = { props.src }
			style={{
				borderRadius : "50%",
			}}
		/>;
	}
	
	return <svg
		width = "24"
		height = "24"
		viewBox = "0 0 24 24"
		fill = "none"
		xmlns = "http://www.w3.org/2000/svg"
	>
		<path
			d = "M0 12C0 5.3724 5.3725 0 12.0002 0C18.6279 0 24.0004 5.3724 24.0004 12C24.0004 18.6276 18.6279 24 12.0002 24C5.3725 24 0 18.6276 0 12Z"
			fill = "#627EEA"
		/>
		<path
			d = "M6 11.5869L12 15V2L6 11.5869Z"
			fill = "white"
		/>
		<path
			opacity = "0.8"
			d = "M12.0006 2L12 15L18 11.6296L12.0006 2Z"
			fill = "#C0CBF6"
		/>
		<path
			d = "M6 13.296L11.8939 21.6V16.7784L6 13.2966V13.296Z"
			fill = "white"
		/>
		<path
			opacity = "0.8"
			d = "M11.8945 16.7784V21.6L17.7908 13.296L11.8945 16.7784Z"
			fill = "#C0CBF6"
		/>
		<path
			opacity = "0.6"
			d = "M12.0009 9L6 11.6095L12.0009 15L18 11.6095L12.0009 9Z"
			fill = "#8197EE"
		/>
	</svg>;
};
