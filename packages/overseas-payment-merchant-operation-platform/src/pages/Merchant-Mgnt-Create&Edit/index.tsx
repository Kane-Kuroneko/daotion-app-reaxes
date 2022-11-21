/**
 * todo 拆分成小组件
 */
export const MerchantMgntEdit = reaxper(() => {
	const { params , navigate } = toolkits.useRouter();
	const urlMchNo = utils.decodeQueryString().mchNo;
	console.log(params);
	
	/*@ts-ignore*/
	const { closFetchMchCfg,fetchSubmit } = reaxel_mch_COE(params)();
	const { setFields , state$mchCNE , reset , closFetchSellerList, sallers,} = reaxel_ctrl();
	
	useEffect(() => reset , []);
	
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
	return (
		<div className = { less.editContainer }>
			<Form
				layout = "vertical"
				labelCol = { {
					offset : 8 ,
				} }
				wrapperCol = { {
					span : 8 ,
					offset : 8 ,
				} }
			>
				<Form.Item label = "商户名">
					<Input
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
						value = { state$mchCNE.password }
						onChange = { (e) => {
							setFields({
								password : e.target.value ,
							});
						} }
					/>
				</Form.Item>
				<Form.Item>
					<div style = { { display : 'flex' , justifyContent : 'space-between' } }>
						<Form.Item
							label = "联系人"
							style = { { marginBottom : '0' } }
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
							style = { { marginBottom : '0' } }
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
							>{ name }</Option>;
						}) }
					</Select>
				</Form.Item>
				<MchCharge pattern = "payIn" />
				<MchCharge pattern = "payOut" />
				<Form.Item label = "配置IP白名单">
					{ state$mchCNE.whiteList.map((ip , index) => {
						
						return <div
							key = { index }
							style = { { display : 'flex' } }
						>
							<Input
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
						type = "dashed"
						onClick = { () => {
							setFields({
								whiteList : state$mchCNE.whiteList.concat([ '' ]) ,
							});
						} }
						block
						icon = { <PlusOutlined /> }
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
				<Input placeholder = { '固定手续费R$' } />
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
		labelCol = { { span : 8 , offset : 8 } }
		label = {
			<div className = { less.changeSet }>
				<span>代收手续费设置</span>
				<div>
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
} from '@@SVGcomponents';
import less from './index.module.less';
