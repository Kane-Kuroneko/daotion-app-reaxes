
export const OverviewWithdraw = reaxper(() => {
	const reax_overview_info = reaxel_overview_info();
	const { withdrawStore , overviewInfo , withdrawApply , withdrawSetState , fetchOverviewInfo } = reax_overview_info;
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
	const { balance } = overviewInfo;
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
						最大可到账金额：R${balance}
						<span
							className = { less.withdrawBtn }
							onClick={() => {
								withdrawSetState({
									withdrawApplyMoney: balance
								})
							}}
						>
							全部提现
						</span>
					</span>
				</div>
				<div className = { less.address }>
					<span>接收USDT地址(TRC-20)</span>
					<span
						className={(overviewInfo.address === '') ? less.setBtn : ''}
						onClick={() => {
							if (overviewInfo.address) return;
							navigate('/profile/API')
						}}
					>
						{ overviewInfo.address === '' ? '前往设置' : overviewInfo.address}
					</span>
				</div>
				<Button
					type = "primary"
					loading={reax_overview_info.withdrawPending}
					disabled={withdrawApplyMoney <= 0}
					onClick = { () => {
						withdrawApply().then(() => {
							message.success('已提交申请');
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

