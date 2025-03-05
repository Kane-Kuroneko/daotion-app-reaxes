export const FinancialDetails = reaxper(() => {
	const { params } = toolkits.useRouter();
	const pathArr = params['*'].split('/');
	const path = pathArr.pop();
	const reax_overview_info = reaxel_overview_info(path);
	const {fetchFinDetail, finDetailPending} = reax_overview_info;
	fetchFinDetail(path);
	const { Table , Button } = antd;
	const columns = [
		{
			title: '时间',
			dataIndex: 'timestamp',
			render(value){
				if(!value){
					return 'N/A';
				}
				return <Timezone
					format
					unix
				>{value}</Timezone>;
			} ,
		},
		{
			title: '订单号',
			dataIndex: 'orderID',
			render(value){
				if(!value){
					return 'N/A';
				}
				return value;
			},
		},
		{
			title: '交易金额',
			dataIndex: 'money',
			render: (money) => {
				if(money > 0){
					return(
						<span style={{color: 'black'}}>
							{money}
						</span>
					)
				}else {
					return(
						<span style={{color: '#F21361'}}>
							{money}
						</span>
					)
				}
				
			}
		},
		{
			title: '手续费',
			dataIndex: 'tax',
		},
		{
			title: '余额',
			dataIndex: 'balance',
		},
	]
	
	
	return (
		<div className = { less.finDetailTable }>
			<div className = { less.finDetailTableHeader }>
				资金明细
			</div>
			<Table
				columns = { columns }
				dataSource = { reax_overview_info.fin_detail_list }
				loading={finDetailPending}
				rowKey = "id"
				size = "small"
				pagination = { {
					pageSize : 10 ,
				} }
				scroll = { {
					x : 1000 ,
				} }
			/>
		</div>
	);
})

import less from './index.module.less';
import { reaxel_overview_info, Timezone } from '@@reaxels';
import { ColumnsType } from "antd/lib/table";
