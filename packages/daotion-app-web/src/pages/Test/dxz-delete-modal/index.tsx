import less from './index.module.less';
import {
	Button ,
	Modal ,
} from 'antd';
import React , { useState } from 'react';

export const DxzDeleteModal = () => {
	return <>
		<Modal
			open = { true }
			className = { less.antdDeleteTabModal }
			centered
			maskClosable
			closable = { true }
			footer = { null }
			mask = { true }
			width = "480px"
			closeIcon = { <SVGClose /> }
		>
			<div
				className = { less.modalContent }
				style = { {
					height : "fit-content" ,
					padding : "0 0" ,
				} }
			>
				<h1 className = { less.mainTitle }>Delete Tab</h1>
				<p className = { less.intro }>Deleting the TAB will delete all contents and cannot be recovered.</p>
				<ButtonDelete />
				<ButtonCancel />
			</div>
		</Modal>
	
	</>;
};

const ButtonDelete = () => {
	return <>
		<Button
			style = { {
				display : "flex" ,
				width : "100%" ,
				alignItems : "center" ,
				justifyContent : "center" ,
				padding : "16px 24px" ,
				height : "48px" ,
				background : "#ffffff" ,
				border : "2px solid #F21361" ,
				borderRadius : "12px" ,
				fontWeight : "700" ,
				fontSize : "16px" ,
				lineHeight : "16px" ,
				color : "#f21361" ,
				marginBottom : "12px",
			} }
		>Delete</Button>
	</>;
};
const ButtonCancel = () => {
	return <>
		<Button
			style = { {
				display : "flex" ,
				width : "100%" ,
				alignItems : "center" ,
				justifyContent : "center" ,
				padding : "16px 24px" ,
				height : "48px" ,
				background : "inherit" ,
				border : "2px solid #e6e8ec" ,
				borderRadius : "12px" ,
				fontWeight : "700" ,
				fontSize : "16px" ,
				lineHeight : "16px" ,
				color : "#141416" ,
			} }
		>Cancel</Button>
	</>;
};
const ButtonUploadCover=()=>{
	return<>
		<Button
			style = { {
				display : "flex" ,
				width : "100%" ,
				alignItems : "center" ,
				justifyContent : "center" ,
				padding : "16px 24px" ,
				height : "48px" ,
				background : "#0070f3" ,
				border : "2px solid #0070f3" ,
				borderRadius : "12px" ,
				fontWeight : "700" ,
				fontSize : "16px" ,
				lineHeight : "16px" ,
				color : "#ffffff" ,
			} }
		>Select file</Button>
	</>
}
const SVGClose = () => {
	return <>
		<svg
			width = "40"
			height = "40"
			viewBox = "0 0 40 40"
			fill = "none"
			xmlns = "http://www.w3.org/2000/svg"
		>
			<path
				fill-rule = "evenodd"
				clip-rule = "evenodd"
				d = "M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
				fill = "#222528"
			/>
			<rect
				x = "1"
				y = "1"
				width = "38"
				height = "38"
				rx = "19"
				stroke = "#E6E8EC"
				stroke-width = "2"
			/>
		</svg>
	</>;
};
