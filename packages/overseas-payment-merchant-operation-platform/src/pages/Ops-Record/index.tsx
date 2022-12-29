export const OpsRecord = reaxper(() => {
	
	const { current : badge } = useRef(Symbol('badge'));
	const { fetchOpsRecord,records , setState , pending } = reaxel_ops_record();
	
	fetchOpsRecord(badge);
	
	const { Table } = antd;
	return <div>
		<Table
			dataSource={records}
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
						return time_localize_Brazil(text);
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
	</div>;
});


import { reaxel_ops_record } from './reaxel--ops-record';
import { time_localize_Brazil } from '#toolkits/overseas-payment';
