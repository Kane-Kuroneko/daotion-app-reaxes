
export const OverviewWithdraw = reaxper(() => {
	const {withdrawStore, overviewInfo, withdrawApply, withdrawSetState, fetchOverviewInfo  } = reaxel_overview_info();
	const { navigate } = toolkits.useRouter();
	const { message, Input, Button, Spin } = antd;
	
	if(!overviewInfo){
		fetchOverviewInfo();
		return (
			<div className={less.loadingSpin}>
				<Spin/>
			</div>
		)
	}
	const { agentBalance } = overviewInfo;
	const { withdrawApplyMoney} = withdrawStore;
	return (
		<div className={less.withdrawContainer}>
			<div className = { less.windowContent }>
				<span className={less.title}>
					提现
				</span>
				<div className = { less.withdrawAmount }>
					<span>提现金额</span>
					<Input
						value={withdrawApplyMoney}
						onChange={(e) => {
							withdrawSetState({
								withdrawApplyMoney: e.target.value
							})
						}}
					/>
					<span className={less.maxWithdrawAmount}>
						最大可到账金额：R${agentBalance < 0 ? 0 : agentBalance}
						<span
							className = { less.withdrawBtn }
							onClick={() => {
								withdrawSetState({
									withdrawApplyMoney: agentBalance
								})
							}}
						>
							全部提现
						</span>
					</span>
				</div>

				<Button
					type = "primary"
					loading={withdrawStore.pending}
					disabled={!withdrawApplyMoney}
					onClick = { () => {
						withdrawApply().then(() => {
							message.success('操作成功');
						}).catch((e) => {
							console.log(e);
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

