import { reaxel_new_payment } from './reaxel--new-payment';

export const NewPayment = reaxper(() => {
	
	const { state , setFields , resetState , resetDeps , fetchNewPayment } = reaxel_new_payment();
	const { navigate } = toolkits.useRouter();
	
	useEffect(() => resetState , []);
	
	const { Button , Tabs } = antd;
	return (
		<div className = { less.addPayoutContainer }>
			<div className = { less.addPayoutContent }>
				<div className = { less.title }>
					新增代付
				</div>
				<Tabs
					onChange = { (tab) => {
						setFields({ currentPattern : tab });
					} }
					activeKey = { state.currentPattern }
				>
					<Tabs.TabPane
						tab = "PixPay 方式"
						key = "pix"
					>
						<PixPay />
					</Tabs.TabPane>
					{ __EXPERIMENTAL__ && <Tabs.TabPane
						tab = "银行卡转账方式"
						key = "bank"
					>
						<BankCarTransfer />
					</Tabs.TabPane> }
				</Tabs>
				<Button
					onClick = { () => {
						fetchNewPayment().then((data) => {
							crayon.orange(JSON.stringify(data));
						}).catch((e) => {
							antd.message.error(e.message);
						});
					} }
					type = "primary"
				>
					提交
				</Button>
			</div>
		</div>
	);
});

export const PixPay = reaxper(() => {
	
	const { setFields , state } = reaxel_new_payment();
	
	const { Input } = antd;
	return (
		<div className = { less.pixpayContainer }>
			<div className={less.ppInputForm}>
				<span>
					金额
				</span>
				<Input placeholder={'R$'}/>
			</div>
			<div className={less.ppInputForm}>
				<span>
					Pix支付码
				</span>
				<Input
					placeholder={'输入Pix的支付码'}
					value = { state.pix_code }
					onChange = { (e) => {
						setFields({ pix_code : e.target.value });
					} }
				/>
			</div>
		</div>
	);
});

export const BankCarTransfer = reaxper(() => {
	
	const { Input } = antd;
	
	return (
		<div className = { less.bankCarTransferContainer }>
			<div className = { less.inputForm }>
				<span>
					代付金额
				</span>
				<Input />
				<span>
					最大可代付余额：R$372,654,004.76
				</span>
			</div>
			<div className = { less.inputForm }>
				<span>
					银行
				</span>
				<Input
					placeholder = { '银行卡发卡行' }
				/>
			</div>
			<div className = { less.inputForm }>
				<span>
					银行卡账号
				</span>
				<Input />
				<span>
					请确保输入正确的地址
				</span>
			</div>
			<div className = { less.inputForm }>
				<span>
					持卡人姓名
				</span>
				<Input />
			</div>
		</div>
	);
});

import less from './index.module.less';
