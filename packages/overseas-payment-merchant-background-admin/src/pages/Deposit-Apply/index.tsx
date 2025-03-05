
export const OverviewDeposit = reaxper(() => {
	const reax_overview_info = reaxel_overview_info();
	const {depositStore : {paymentAddress = '', depositMoney = ''}, deposit, depositSetState  } = reax_overview_info;
	const { message, Input, Button } = antd;
	return (
		<div className={less.depositContainer}>
			<div className = { less.windowContent }>
				<span className={`${less.title} ${less.depositTitle}`}>充值</span>
				<div className = { less.withdrawAmount }>
					<span>充值金额（TRC-20 USDT）</span>
					<Input
						value={depositMoney}
						onChange={(e) => {
							depositSetState({
								depositMoney: e.target.value
							})
						}}
					/>
				</div>
				<div className = { less.withdrawAmount }>
					<span>付款地址（TRC-20）</span>
					<Input
						value={paymentAddress}
						onChange={(e) => {
							depositSetState({
								paymentAddress: e.target.value
							})
						}}
					/>
				</div>
				<div className = { less.address }>
					<span>RainPay收款地址(TRC-20)</span>
					<div className={less.collectionAddress}>
						{/*地址为固定地址*/}
						TF46jFVY4nuxTEdk9t7K4qzC3RA5ZQ49u6
						<SVGProfileCopyBtn/>
					</div>
				</div>
				<Button
					type = "primary"
					loading={reax_overview_info.depositPending}
					onClick = { () => {
						deposit().then(() => {
							message.success('已提交申请');
						}).catch((e) => {
							message.error(  e.msg)
						})
					}}
				>
					提交
				</Button>
			</div>
		
		</div>
	)
});
import less from "./index.module.less";
import { reaxel_overview_info } from "@@reaxels";
import { SVGProfileCopyBtn } from '@@SVGcomponents'

