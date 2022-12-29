export const FinancialDetails = reaxper(() => {
	const {fetchFinDetail, fin_detail_list, finDetailPending } = reaxel_overview_info();
	const {current:badge} = useRef(Symbol('badge'));
	fetchFinDetail(badge);
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
		},
		{
			title: '交易金额',
			dataIndex: 'money',
			render: (money) => {
				if(money > 0){
					return(
						<span style={{color: '#009D44'}}>
							{money}
						</span>
					)
				}else {
					return(
						<span style={{color: 'black'}}>
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
				dataSource = { fin_detail_list }
				loading={finDetailPending}
				rowKey = "orderID"
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
