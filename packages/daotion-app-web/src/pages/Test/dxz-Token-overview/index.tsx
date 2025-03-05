import less from './index.module.less';
import { Segmented } from 'antd';


export const DxzTokenOverview=()=>{
	return<>
		<Segmented
			className={less.TokenBox}
			style={{
				backgroundColor: "#e6e8ec",
				borderRadius: "14px",
				// height:"32px",
				marginTop:"20px",
				display: "flex",
				alignItems: "center",
				// width:"440px",
				width:"fit-content",
			}}
			options={['Token Overview', 'Fundraising Pool', 'Airdopr Pool']}
		/>
	</>
}
