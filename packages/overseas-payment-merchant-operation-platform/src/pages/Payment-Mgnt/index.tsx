export const PayoutManagement = reaxper(() => {
	const { conductApplication, paymentApplicationList, fetchPaymentOrderList, selectedOrders, setSelectedOrders } =
		reaxel_payment_mgnt();
	const { navigate } = toolkits.useRouter();
	const { current: badge } = useRef(Math.random());

	fetchPaymentOrderList(badge);

	const columns: ColumnsType<DataType> = [
		{
			title: '订单号',
			dataIndex: 'orderID',
		},
		{
			title: '用户名/用户名ID',
			dataIndex: 'userName',
		},
		{
			title: '用户名/Telegram',
			dataIndex: 'userName',
		},
		{
			title: '代付金额',
			dataIndex: 'money',
		},
		{
			title: '申请入账银行卡号',
			dataIndex: 'bankAccount',
			key: 'bankAccount',
		},
		// {
		// 	title : '操作' ,
		// 	key : 'action' ,
		// 	fixed : 'right' ,
		// 	render (record){
		// 		const { Popconfirm } = antd;
		// 		return <div className = { less.tableAction }>
		// 			<Popconfirm
		// 				title = "确定同意代付?"
		// 				okText="确认"
		// 				cancelText="取消"
		// 				onConfirm = { () => {
		// 					conductApplication(
		// 						record.orderID ,
		// 						true ,
		// 					);
		// 				} }
		// 			>
		// 				<Button type = "text">同意</Button>
		// 			</Popconfirm>
		// 			<Popconfirm
		// 				title = "确定拒绝?"
		// 				okText="确认"
		// 				cancelText="取消"
		// 				onConfirm = { () => {
		// 					conductApplication(
		// 						record.orderID ,
		// 						true ,
		// 					);
		// 				} }
		// 			>
		// 				<Button type = "text" >拒绝</Button>
		// 			</Popconfirm>
		//
		// 		</div>;
		// 	} ,
		// } ,
	];
	const { Table, Button, Space, Popconfirm } = antd;
	return (
		<div className={less.tableContainer}>
			<div className={less.headerContainer}>
				<Space size="middle">
					<span className={less.headerTitle}>代付申请列表</span>
					{selectedOrders.length > 0 && <span>已选择{selectedOrders.length}项</span>}
					<Popconfirm
						title="确定同意代付?"
						okText="确认"
						cancelText="取消"
						onConfirm={() => {
							conductApplication(true).then(() => {
								antd.message.success('操作成功');
							}).catch((e) => {
								antd.message.error(e.message);
							});
						}}
					>
						<Button type="primary">同意</Button>
					</Popconfirm>
					<Popconfirm
						title="确定拒绝?"
						okText="确认"
						cancelText="取消"
						onConfirm={() => {
							conductApplication(false).then(() => {
								antd.message.success('操作成功');
							}).catch((e) => {
								antd.message.error(e.message);
							});;
						}}
					>
						<Button danger>拒绝</Button>
					</Popconfirm>
				</Space>
				<Button
					onClick={() => {
						navigate('new-payment');
					}}
					type="primary"
				>
					<SVGAddBtn />
					新增代付
				</Button>
			</div>
			<Table
				columns={columns}
				dataSource={paymentApplicationList}
				rowKey="orderID"
				size="small"
				pagination={{
					pageSize: 10,
				}}
				scroll={{
					x: 1000,
				}}
				rowSelection={{
					type: 'checkbox',
					onChange: (selectedRowKeys, selectedRows) => {
						setSelectedOrders(selectedRowKeys);
					},
				}}
			/>
		</div>
	);

	interface DataType {
		key: number;
		serialNumber: string;
		orderNumber: string;
		userId: string;
		userNameAndContact: string;
		tags: string;
		payOutAmount: number;
		bankAccount: string;
	}
});

import { ColumnsType } from 'antd/lib/table';
import less from './index.module.less';
import { SVGAddBtn } from '@@SVGcomponents';
import { reaxel_payment_mgnt } from './reaxel--payment-mgnt';
