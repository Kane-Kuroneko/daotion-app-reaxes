

export const OverviewInfo = reaxper(() => {
	
	const { Button } = antd;
	const { navigate } = toolkits.useRouter();
	const { overviewInfo , fetchOverviewInfo } = reaxel_overview_info();
	const {
		balance = 0 ,
		withdrawingMoney = 0,
	} = overviewInfo;
	const { current : badge } = useRef(Math.random());
	fetchOverviewInfo(badge);
	return (
		<div className = { less.overviewContainer }>
			<span className = { less.overviewTitle }>
				资金总览
			</span>
			<div className = { less.overviewContent }>
				<div className = { less.balanceContainer }>
					<div className = { less.balanceContent }>
						<span className = { less.overviewSubTitle }>
							账户余额（R$）
						</span>
						<span className = { less.balanceAmount }>
							{balance}
						</span>
					</div>
					<Button
						className = { less.checkDetail }
						type = "link"
						onClick = { () => {
							navigate('fin-detail');
						} }
					>
						查看明细
					</Button>
				</div>
				<div className = { less.withdrawContent }>
					<span className = { less.overviewSubTitle }>
						提现处理中
					</span>
					<span className = { less.withdrawingAmount }>
						{withdrawingMoney}
					</span>
				</div>
			</div>
			<div style={{ display : 'flex', gap: '16px'}}>
				<Button
					type = "primary"
					onClick = { () => {
						navigate('deposit')
					} }
				>
					充值
				</Button>
				<Button
					type = "primary"
					onClick = { () => {
						navigate('withdraw')
					} }
				>
					提现
				</Button>
			</div>
		</div>
	);
});

import { reaxel_overview_info } from "@@reaxels";
import less from "@@pages/Overview/index.module.less";