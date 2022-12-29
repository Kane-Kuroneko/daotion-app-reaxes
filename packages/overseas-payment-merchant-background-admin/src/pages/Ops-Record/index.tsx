import less from "@@pages/Fin-Detail/index.module.less";

export const OpsRecord = reaxper(() => {
	
	const { current : badge } = useRef(Symbol('badge'));
	const { fetchOpsRecord,records , setState , pending } = reaxel_ops_record();
	
	fetchOpsRecord(badge);
	
	const { Table } = antd;
	return (
		<div style={{
			width : '100%',
			padding : '24px',
			backgroundColor : '#ffffff',
			borderRadius : '8px',
		}}>
			<div style={{
				fontSize : '18px',
				fontWeight : '500',
				marginBottom: '18px'
			}}>
				操作记录
			</div>
			<Table
				dataSource={records}
				loading={pending}
				rowKey="key"
				columns={[
					{
						title : "操作事项",
						dataIndex:"operation",
					},
					{
						title : "操作时间",
						dataIndex:"timestamp",
						render(text){
							return <Timezone
								format
								unix
							>{text}</Timezone>
						},
					},
					{
						title : "操作账号",
						dataIndex:"account",
					},
					{
						title : "操作IP",
						dataIndex:"ip",
					},
				]}
			/>
		</div>
	);
});


import { reaxel_ops_record } from './reaxel--ops-record';
import { time_localize_Brazil } from '#toolkits/overseas-payment';
import { Timezone } from '@@reaxels'
