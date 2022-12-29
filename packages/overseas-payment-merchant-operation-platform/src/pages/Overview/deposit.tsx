
export const OverviewDeposit = reaxper(() => {
	const {depositStore, deposit, depositSetState  } = reaxel_overview_info();
	const { paymentAddress = '', depositMoney = ''} = depositStore;
	const { navigate } = toolkits.useRouter();
	const { message, Input, Button } = antd;
	return (
		<div className={less.withdrawContainer}>
			<div className = { less.windowContent }>
				<h3 className={less.depositTitle}>充值</h3>
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
					<p>RainPay收款地址(TRC-20)</p>
					<div>
						{/*地址为固定地址*/}
						TF46jFVY4nuxTEdk9t7K4qzC3RA5ZQ49u6
						<SVGProfileCopyBtn/>
					</div>
				</div>
				<Button
					type = "primary"
					onClick = { () => {
						if (depositMoney === '') {
							message.error('充值金额不能为空');
						} else if(paymentAddress === '' ) {
							message.error('请先设置地址');
						} else {
							deposit().then((res) => {
								if (res.result === 0) {
									message.success('申请成功');
									depositSetState({
										paymentAddress : '',
										depositMoney: ''
									})
								} else {
									message.error('申请失败');
								}
							
							}).catch((e) => {
								message.error('申请失败' + e)
							})
						}
					} }
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

