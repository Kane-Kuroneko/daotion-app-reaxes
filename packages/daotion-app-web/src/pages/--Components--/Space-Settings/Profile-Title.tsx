export const ProfileTitle = ( props ) => {
	return <>
		<h1
			style = { {
				fontWeight : '600' ,
				fontSize : '20px' ,
				lineHeight : "36px" ,
				userSelect : 'none' ,
				marginBottom : "4px" ,
			} }
		>
			{ props.children }
		</h1>
	</>;
};
