/**
 * todo 拆分成小组件
 * 
 * <reaxel--mch-ctrl>负责将表单的输入和被其他reaxel读取状态。
 * <reaxel--edit-mch-cfg>和<reaxel--mch-open-account>应拥有完全相融的API,在视图层调用时会判断目前是编辑还是新建，从而避免调用到不正确或未实现的API
 */
export const MerchantMgntEdit = reaxper(() => {
	const { params , navigate } = toolkits.useRouter();
	const urlMchNo = utils.decodeQueryString().mchNo;
	console.log(params);
	
	/*@ts-ignore*/
	const { closFetchMchCfg , fetchSubmit , cleanMchCfg } = reaxel_mch_COE(params)();
	const { setFields , state$mchCNE , reset , closFetchSellerList, sallers,} = reaxel_ctrl();
	
	useEffect(() => {
		return () => {
			reset();
			cleanMchCfg?.();
		}
	} , []);
	
	if(urlMchNo){
		closFetchMchCfg(() => [urlMchNo])(urlMchNo);
	}
	
	
	const { Form , Input , Select , Space , Col , Button , Switch } = antd;
	const { Option } = Select;
	if(!sallers){
		closFetchSellerList(() => [NaN])();
		/*todo: prefer me! */
		return <span>loading...</span>;
	}
	
	if(urlMchNo && !state$mchCNE.name){
		return <span>loading...</span>;
	}
	
	return (
		<div className = { less.editContainer }>
			<Form
				layout = "vertical"
				// labelCol = { {
				// 	offset : 8 ,
				// } }
				// wrapperCol = { {
				// 	span : 8 ,
				// 	offset : 8 ,
				// } }
				style={{ gridColumn: 2, minWidth: 300}}
			>
				<Form.Item label = "商户名">
					<Input
						placeholder={'最大40个字符'}
						value = { state$mchCNE.name }
						onChange = { (e) => {
							setFields({
								name : e.target.value ,
							});
						} }
						size = "large"
					/>
				</Form.Item>
				<Form.Item label = "登录密码">
					<Input
						size = "large"
						placeholder= { urlMchNo ? "如果不需要修改登录密码则不填写" : "填写商户登录密码" }
						value = { state$mchCNE.password }
						onChange = { (e) => {
							setFields({
								password : e.target.value.replaceAll(' ' , '') ,
							});
						} }
					/>
				</Form.Item>
				<Form.Item>
					<div style = { { display : 'flex', gap: 30 } }>
						<Form.Item
							label = "联系人"
							style = { { marginBottom : '0', width: '100%'} }
						>
							<Input
								value = { state$mchCNE.contactPerson }
								onChange = { (e) => {
									setFields({
										contactPerson : e.target.value ,
									});
								} }
								size = "large"
							/>
						</Form.Item>
						<Form.Item
							label = "Telegram"
							style = { { marginBottom : '0', width: '100%'} }
						>
							<Input
								value = { state$mchCNE.contactPhone }
								size = "large"
								onChange = { (e) => {
									setFields({
										contactPhone : e.target.value ,
									});
								} }
							/>
						</Form.Item>
					</div>
				</Form.Item>
				<Form.Item label = "商务">
					<Select
						placeholder={'选择商务人员'}
						value = { state$mchCNE.sellerID }
						onChange = { (value , option) => {
							setFields({
								sellerID : value ,
							});
						} }
						size = "large"
					>
						{ sallers.map(({ name , id , phone }) => {
							return <Option
								key = { id }
								value = {id}
							>{ name }</Option>;
						}) }
					</Select>
				</Form.Item>
				<MchCharge pattern = "payIn" />
				<MchCharge pattern = "payOut" />
				<Form.Item label = {<div className={less.whitleTitle}>配置IP白名单<SVGMchInfoIcon/></div>}>
					{ state$mchCNE.whiteList.map((ip , index) => {
						
						return <div
							className={less.ipAddress}
							key = { index }
							style = { { display : 'flex'} }
						>
							<Input
								placeholder={'输入IP地址'}
								value = { ip }
								onChange = { (e) => {
									orzAction(() => state$mchCNE.whiteList[index] = e.target.value);
								} }
							/>
							<Button
								onClick = { () => {
									if( state$mchCNE.whiteList.length === 1 ) {
										return;
									}
									setFields({
										whiteList : state$mchCNE.whiteList.filter(($ , i) => {
											return i !== index;
										}) ,
									});
								} }
								style = { { display : 'inline' , marginLeft : '8px' } }
							>
								<MinusOutlined />
							</Button>
						</div>;
					}) }
				</Form.Item>
				<Form.Item>
					<Button
						onClick = { () => {
							setFields({
								whiteList : state$mchCNE.whiteList.concat([ '' ]) ,
							});
						} }
						block
						icon = { <PlusOutlined /> }
						style={{width: 143}}
					>
						添加IP地址
					</Button>
				</Form.Item>
				<Form.Item>
					<div className = { less.mchSwitch }>
						<span>商户状态</span>
						<Switch
							checked = { !!state$mchCNE.status }
							onChange = { () => {
								setFields({ status : state$mchCNE.status^1/*0和1互相取反*/ });
							} }
						/>
					</div>
				</Form.Item>
				<Form.Item>
					<div className = { less.mchSwitch }>
						<span>商户代收状态</span>
						<Switch
							disabled={state$mchCNE.status === 0}
							checked = { !!state$mchCNE.payInStatus }
							onChange = { () => {
								setFields({ payInStatus : state$mchCNE.payInStatus^1/*0和1互相取反*/ });
							} }
						/>
					</div>
				</Form.Item>
				<Form.Item>
					<div className = { less.mchSwitch }>
						<span>商户代付状态</span>
						<Switch
							disabled={state$mchCNE.status === 0}
							checked = { !!state$mchCNE.payOutStatus }
							onChange = { () => {
								setFields({ payOutStatus : state$mchCNE.payOutStatus^1/*0和1互相取反*/ });
							} }
						/>
					</div>
				</Form.Item>
				<Form.Item>
					<Button
						onClick = { (e) => {
							e.preventDefault();
							fetchSubmit(urlMchNo).then(() => {
								antd.message.success('保存成功!');
								navigate('../');
							}).catch((e) => {
								antd.message.error(`保存失败!,${ e.message || e.toString() }`);
							});
						} }
						type = "primary"
						size = "large"
						style = { { width : '100%' } }
					>
						提交
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
});

export const ChargeBaseSet = reaxper(() => {
	const { Input } = antd;
	return (
		<div style = { { display : 'flex' , justifyContent : 'space-between' , gap : '16px' } }>
			<Input placeholder = { '固定手续费R$' } />
			<Input
				placeholder = { '手续费率' }
				suffix = "%"
			/>
		</div>
	);
});

export const ChargeSeniorSet = reaxper(() => {
	const { Input } = antd;
	return (
		<div className = { less.chargeSeniorSet }>
			<div className = { less.setSide }>
				<Input placeholder = { '固定手续费R$' } />
				<Input
					placeholder = { '手续费率' }
					suffix = "%"
				/>
			</div>
			<div>
				<Input
					className = { less.feeInput }
					placeholder = { '金额R$' }
					prefix = "<"
					suffix = "≤"
				/>
			</div>
			<div className = { less.setSide }>
				<Input placeholder = { '固定手续费R$' }/>
				<Input
					placeholder = { '手续费率' }
					suffix = "%"
				/>
			</div>
		</div>
	);
});

const MchCharge = reaxper(({pattern}:{pattern:"payIn"|"payOut"}) => {
	const { state$mchCNE , setFields } = reaxel_ctrl();
	
	/*根据pattern决定是代收还是代付*/
	const commission = reaxel_ctrl().state$mchCNE[pattern];
	
	let ret;
	const { Input , Form , Button } = antd;
	

	if(commission.mode === "basic"){
		ret = <div style = { { display : 'flex' , justifyContent : 'space-between' , gap : '16px' } }>
			<Input
				value = { commission.left.fix }
				onChange = { (e) => {
					orzAction(() => commission.left.fix = e.target.value);
				} }
				placeholder = { '固定手续费R$' }
			/>
			<Input
				value = { commission.left.rate }
				onChange = { (e) => {
					orzAction(() => commission.left.rate = e.target.value);
				} }
				placeholder = { '手续费率' }
				suffix = "%"
			/>
		</div>;
	}else if(commission.mode === "advanced") {
		ret = <div className = { less.chargeSeniorSet }>
			<div className = { less.setSide }>
				<Input
					value = { commission.left.fix }
					onChange = { (e) => {
						orzAction(() => commission.left.fix = e.target.value);
					} }
					placeholder = { '固定手续费R$' }
				/>
				<Input
					value = { commission.left.rate }
					onChange = { (e) => {
						orzAction(() => commission.left.rate = e.target.value);
					} }
					placeholder = { '手续费率' }
					suffix = "%"
				/>
			</div>
			<div>
				<Input
					value = { commission.amount }
					onChange = { (e) => {
						orzAction(() => commission.amount = e.target.value);
					} }
					className = { less.feeInput }
					placeholder = { '金额R$' }
					prefix = "<"
					suffix = "≤"
				/>
			</div>
			<div className = { less.setSide }>
				<Input
					value = { commission.right.fix }
					onChange = { (e) => {
						orzAction(() => commission.right.fix = e.target.value);
					} }
					placeholder = { '固定手续费R$' }
				/>
				<Input
					value = { commission.right.rate }
					onChange = { (e) => {
						orzAction(() => commission.right.rate = e.target.value);
					} }
					placeholder = { '手续费率' }
					suffix = "%"
				/>
			</div>
		</div>;
	}
	
	return <Form.Item
		// labelCol = { { span : 8 , offset : 8 } }
		label = {
			<div className = { less.changeSet }>
				<span>代收手续费设置</span>
				<div className={less.left}>
					<span>{ commission.mode === "basic" ? "基本" : "高级" }设置</span>
					<Button
						onClick = { () => {
							orzAction(() => commission.mode = { basic : "advanced" as const , advanced : "basic" as const }[commission.mode]);
						} }
					> <SVGChargeSetExchange /> </Button>
				</div>
			</div>
		}
	> { ret } </Form.Item>;
});

/*create or edit*/
const reaxel_mch_COE = function(){
	return (param) => {
		param = param['*'].split('/').pop();
		if(param === "open-account"){
			return reaxel_mch_open_account;
		}else if(param === "edit-cfg"){
			return reaxel_edit_mch_cfg;
		}
	}
}();

const orzAction = (cb:Function) => {
	return action(cb)();
};

import { reaxel_ctrl } from './reaxel--mch-ctrl';
import { reaxel_edit_mch_cfg } from './reaxel--edit-mch-cfg';
import { reaxel_mch_open_account } from './reaxel--mch-open-account';
import {action} from 'mobx';
import {
	PlusOutlined ,
	MinusOutlined,
} from '@ant-design/icons';
import {
	SVGChargeSetExchange ,
	SVGChargeSetBack,
	SVGMchInfoIcon,
} from '@@SVGcomponents';
import less from './index.module.less';



