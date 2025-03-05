import { ColumnsType } from "antd/es/table";

export const Mch_Desposit_Rqst = reaxper(() => {
	const reax_mch_dpst_rqst = reaxel_mch_dpst_rqst();
	const { fetchDepositRqst , checkin , store , setState , verifyDepositRqst , cleanDeps } = reax_mch_dpst_rqst;
	const { dataList, pending } = store;
	const { current : badge } = useRef(Math.random());
	fetchDepositRqst(badge);
	const { Table, Button, Popconfirm, Alert, message } = antd;
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
			title : '充值USDT数量' ,
			dataIndex : 'usdt' ,
			render: (value) => (
				<span className={less.udstNum}>{value}</span>
			)
		} ,
		{
			title : '付款地址' ,
			dataIndex : 'sourceAddress' ,
			width : 300,
			
		} ,
		{
			title : 'RainPay收款地址' ,
			dataIndex : 'targetAddress' ,
			width : 300,
			
		} ,
		{
			title : '订单创建时间' ,
			dataIndex : 'createTimestamp' ,
			render(value){
				return <Timezone
					format
					unix
				>{value}</Timezone>
			} ,
		} ,
		{
			title : '操作',
			dataIndex : 'action',
			render : (value , record , index) => (
				<>
					<Button
						type = "link"
						style = { { padding : 0 } }
						onClick = { () => {
							setState({
								verifyInfo : record ,
								depositModalVisible : true,
							});
						} }
					>同意</Button>
					<Popconfirm
						title = "确定拒绝吗？"
						onConfirm={() => {
							verifyDepositRqst(false).then(() => {
								message.success('操作成功');
							}).catch((e) => {
								message.error(e.msg)
							})
						} }
					>
						<Button
							type = "link"
							danger
							onClick = { () => {
								setState({
									verifyInfo : record ,
								});
							} }
						>拒绝</Button>
					</Popconfirm>
				</>
			),
		}
	];
	return(
		<div className = { less.tableContainer }>
			<div className = { less.tableHeader }>
				申请列表
			</div>
			{reax_mch_dpst_rqst.depositMsgList.length > 0 && <Alert
				message = {<span>您有新的订单申请!<Button 
					type="link"
					onClick={() => {
						cleanDeps();
						fetchDepositRqst(badge)?.then(() => {
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
			<DespositModal/>
			<CheckModal/>
		</div>
	)
	interface DataType {
		orderID : string;
		usdt : number;
		mchName : string;
		sourceAddress: string;
		targetAddress: string;
		createTimestamp : number;
	}
});

export const DespositModal = reaxper(() => {
	const { Modal , Button , Input } = antd;
	const { store: {depositModalVisible, verifyInfo = {}, verifyR}, setState } = reaxel_mch_dpst_rqst();
	return (
		<Modal
			title = {
				<div>
					<p className = { less.title }>确认充值信息</p>
					<p>请确认充值地址和金额</p>
				</div>
			}
			visible={depositModalVisible}
			closable = { false }
			footer = { null }
			width = { 380 }
			className = { less.depositModal }
		>
			<div className = { less.contentContainer }>
				<span className = { less.depositAmount }>商户充值USDT数量</span>
				<span className = { less.number }>
					{verifyInfo?.usdt}
					<span className = { less.unit }>USTD</span>
				</span>
				<span className = { less.addAmount }>增加账户余额</span>
				<Input
					placeholder = { 'R$' }
					value={verifyR}
					onChange={(e) => {
						setState({
							verifyR: e.target.value
						})
					}}
				/>
				<Button
					type = "primary"
					disabled={!verifyR}
					onClick={() => {
						setState({
							depositVerifyModalVisible: true
						})
					}}
				>继续</Button>
				<Button type = "default" onClick={() => {setState({depositModalVisible: false, verifyR: null })}}>取消</Button>
			</div>
		</Modal>
	);
});

export const CheckModal = reaxper(() =>{
	const { Modal , Button, Divider, message } = antd;
	const {
		store: {depositVerifyModalVisible, verifyInfo = {}, verifyR, verifyPending},
		setState,
		verifyDepositRqst
	} = reaxel_mch_dpst_rqst();
	return(
		<Modal
			title={
				<div className={`${less.title} ${less.flex}`}>
					<div onClick={() => {setState({depositVerifyModalVisible: false})}}>
						<SVGModalBtnBack/>
					</div>
					检查
				</div>
			}
			visible={depositVerifyModalVisible}
			closable={false}
			footer={null}
			width={380}
			className={less.depositModal}
		>
			<div className = { less.contentContainer }>
				<span className = { less.addAmount } style={{fontSize: 16}}>
					确认之后，法币金额将充值到商户的余额
				</span>
				<span style={{fontSize: 16, marginTop: 16}}>R$ {verifyR}</span>
				<Divider/>
				<div className={less.checkAmount}>
					<span className={less.colorGrey}>商户充值(手动填写)</span>
					<span>{verifyInfo?.usdt} USDT</span>
				</div>
				<div className={less.checkAmount} style={{marginTop: 12}}>
					<span className={less.colorGrey}>增加账户余额</span>
					<span>R${verifyR}</span>
				</div>
				<div className={less.alertBox}>
					<SVGModalIconInfo/>
					<span>请确认所有交易信息正确</span>
				</div>
				<Button
					type = "primary"
					loading={verifyPending}
					onClick={() => {
						verifyDepositRqst(true).then(() => {
							message.success('操作成功')
						}).catch((e) => {
							message.error(e.msg)
						})
					}}
				>确认</Button>
				<Button type = "default" onClick={() => {setState({depositVerifyModalVisible: false})}}>取消</Button>
			</div>
		</Modal>
	)
});

import { reaxel_mch_dpst_rqst } from './reaxel--mch-dpst-rqst';
import { SVGModalBtnBack, SVGModalIconInfo} from '@@SVGcomponents';
import less from './inde.module.less';
import { Timezone } from "@@reaxels";
