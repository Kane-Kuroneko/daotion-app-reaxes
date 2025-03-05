import { ColumnsType } from "antd/es/table";

export const Mch_Withdraw_Rqst = reaxper(() => {
	const reax_mch_withdraw_rqst = reaxel_mch_withdraw_rqst();
	const {fetchWithdrawRqst, checkin, store, setState, verifyWithdrawRqst ,cleanDeps,} = reax_mch_withdraw_rqst
	const {dataList, pending } = store;
	const { current : badge } = useRef(Math.random());
	fetchWithdrawRqst(badge);
	const { Table, Button, Popconfirm, Alert } = antd;
	const columns : ColumnsType<DataType> = [
		{
			title : '订单号' ,
			dataIndex : 'orderID' ,
			fixed : 'left',
		} ,
		{
			title : '商户名/ID' ,
			dataIndex : 'mchName' ,
		} ,
		{
			title : '提现金额（R$）' ,
			dataIndex : 'money' ,
		} ,
		
		{
			title : '提现申请时间' ,
			dataIndex : 'createTimestamp' ,
			render(value){
				return <Timezone
					format
					unix
				>{value}</Timezone>
			} ,
		} ,
		{
			title : '提现账户地址（TRC-20）' ,
			dataIndex : 'address' ,
			width : 300,
		} ,

		{
			title : '操作',
			dataIndex : 'action',
			render : (value , record , index) => (
				<>
					<Button
						type="link"
						style={{padding: 0}}
						onClick={() => {
							setState({
								verifyInfo: record,
								withdrawModalVisible: true
							})
						}}
					>同意</Button>
					<Popconfirm
						title='确定拒绝吗？'
						onConfirm={() => {
							verifyWithdrawRqst(false).then(() => {
								antd.message.success('操作成功')
							}).catch((e) => {
								antd.message.error(e.msg)
							})
						}}
					>
						<Button
							type="link"
							danger
							onClick={() => {
								setState({
									verifyInfo: record,
								})
							}}
						>拒绝</Button>
					</Popconfirm>
				</>
			),
		}
	];
	return (
		<div className = { less.tableContainer }>
			<div className = { less.tableHeader }>
				申请列表
			</div>
			{reax_mch_withdraw_rqst.withdrawMsgList.length > 0 && <Alert
				message = {<span>您有新的订单申请!<Button
					type="link"
					onClick={() => {
						cleanDeps();
						fetchWithdrawRqst(badge)?.then(() => {
							checkin();
						});
					}}
				>刷新</Button></span>}
				type = "info"
				showIcon
			/> }
			<Table
				columns = { columns }
				dataSource={dataList}
				rowKey = "orderID"
				loading = { pending }
				size = "small"
				pagination = { {
					pageSize : 10 ,
				} }
				scroll = { {
					x : 1000 ,
				} }
			/>
			<WithdrawRqstModal/>
		</div>
	)
	interface DataType {
		orderID : string,
		mchNo: string,
		state : number,
		money : number,
		mchName : string,
		address : string,
		createTimestamp : number,
		updateTimestamp : number
	}
});

export const WithdrawRqstModal = reaxper(() => {
	
	const { Modal , Button , Input } = antd;
	const { store, setState, verifyWithdrawRqst } = reaxel_mch_withdraw_rqst();
	const { withdrawModalVisible, verifyPending, verifyUSDT, verifyInfo } = store;
	return (
		<Modal
			title = { '确认提现信息' }
			visible={withdrawModalVisible}
			closable = { false }
			footer = { null }
			width = { 380 }
			className = { less.withdrawModal }
		>
			<div className = { less.contentContainer }>
				<span className = { less.withdrawAmount }>商户提现金额</span>
				<span className = { less.number }>
					<span className = { less.unit }>R$</span>
					{verifyInfo?.money}
				</span>
				<span className = { less.formInput }>转出USDT（TRC-20）</span>
				<Input
					value={verifyUSDT}
					onChange={(e) => {
						setState({
							verifyUSDT: e.target.value
						})
					}}
				/>
				<Button
					type = "primary"
					disabled={!verifyUSDT}
					onClick={() => {
						verifyWithdrawRqst(true).then(() => {
							antd.message.success('操作成功')
						}).catch((e) => {
							antd.message.error(e.msg)
						})
					}}
				>提交</Button>
				<Button type = "default" onClick={() => {setState({withdrawModalVisible: false, verifyUSDT: null})}}>取消</Button>
			</div>
		</Modal>
	);
});

import less from './index.module.less';
import { TestRender } from '@@pages/test';
import { reaxel_mch_withdraw_rqst } from "./reaxel--mch-withdraw-rqst";
import { Timezone } from "@@reaxels";


