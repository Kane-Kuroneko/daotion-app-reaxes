export const ExecuteWhitelist = reaxper(() => {
	
	const { contractSaveWhitelst , store__SBT_settings_whitelist } = reaxel__SBT_settings_whitelist();
	
	return <>
		<div
			style={{
				display : "flex",
				justifyContent : "center",
				flexFlow : "column nowrap",
				width : "100%",
				
			}}
		>
			<h1 style={{
				textAlign : "center",
				padding : '50px 0 30px 0',
			}}>RootHash : </h1>
			<p
				style = {{
					textAlign: 'center',
					fontSize: '22px',
					letterSpacing: '1px',
					padding: '12px',
					background: '#eee',
					borderRadius: '6px'
				}}
			>{colourfulWords(store__SBT_settings_whitelist.rootHash)}</p>
			<p
				style={{
					display : "flex",
					justifyContent : "center",
					padding : '128px 0 40px 0',
					
				}}
			>
				<XButton
					onClick={() => {
						contractSaveWhitelst();
					}}
					loading={store__SBT_settings_whitelist.pending}
					type="primary"
					style={{
						width : "200px",
						
					}}
				>
					Execute
				</XButton>
			</p>
		</div>
	</>
});

const colourfulWords = (source : string = "d7225c3363de9d75043d6a63cc660497484af9120d3c3cedc89e56494a3180ba" ,{
	digital = "red",
	letter = "blue",
} = {}) => {
	const reg = /(?<digtal>[0-9]+)|(?<letter>[a-zA-Z]+)/g
	const result = [];
	for(const {groups} of source.matchAll(reg)){
		console.log(groups);
		const content = groups.letter == null ? groups.digtal : groups.letter;
		const key = groups.letter == null ? "digtal" : "letter";
		
		
		result.push(
			<span
				key = {Math.random()}
				style = {{
					color : key === "digtal" ? digital : letter , 
				}}
			>{content}</span>
		)
	}
	return result;
};


import { reaxel__SBT_settings_whitelist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist/reaxel--SBT-settings-whitelist';

import{XButton}from'@@pages/Test/dxz-button';
