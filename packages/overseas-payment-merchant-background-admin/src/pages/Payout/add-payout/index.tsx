export const AddPayout = reaxper(() =>{
	
	const {Button, Menu} = antd
	
	return(
		<div className={less.addPayoutContainer}>
			<div className={less.addPayoutContent}>
				<div className={less.title}>
					新增代付
				</div>
				<Menu
					mode={'horizontal'}
					defaultSelectedKeys={['PixPay']}
				>
					<Menu.Item key="PixPay" >
						PixPay 方式
					</Menu.Item>
					<Menu.Item key="bankCarTransfer" >
						银行卡转账方式
					</Menu.Item>
				</Menu>
				{/*<PixPay/>*/}
				<BankCarTransfer/>
				<Button type="primary">
					提交
				</Button>
			</div>
		</div>
	)
})

export const PixPay = reaxper(() => {
	
	const {Input} = antd
	
	return(
		<div className={less.pixpayContainer}>
			<span>
				Pix支付码
			</span>
			<Input/>
			<span>
				输入Pix的支付码
			</span>
		</div>
	)
})

export const BankCarTransfer= reaxper(() => {
	
	const {Input} = antd
	
	return(
		<div className={less.bankCarTransferContainer}>
			<div className={less.inputForm}>
				<span>
					代付金额
				</span>
				<Input/>
				<span>
					最大可代付余额：R$372,654,004.76
				</span>
			</div>
			<div className={less.inputForm}>
				<span>
					银行
				</span>
				<Input
					placeholder={'银行卡发卡行'}/>
			</div>
			<div className={less.inputForm}>
				<span>
					银行卡账号
				</span>
				<Input/>
				<span>
					请确保输入正确的地址
				</span>
			</div>
			<div className={less.inputForm}>
				<span>
					持卡人姓名
				</span>
				<Input/>
			</div>
		</div>
	)
})

import less from './index.module.less'
