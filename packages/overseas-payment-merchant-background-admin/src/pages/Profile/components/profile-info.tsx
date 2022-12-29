export const ProfileInfo = reaxper(() => {
	const reax_user_info = reaxel_user_info();
	const {
		mchNo = '' ,
		name = '' ,
		contactPerson = '' ,
		contactPhone = '' ,
		payInFeeRate = 0 ,
		payInFeeFix = 0 ,
		payOutFeeRate = 0 ,
		payOutFeeFix = 0 ,
	} = reax_user_info.userInfo || {};
	const { Space , Col , Row } = antd;
	return (
		<div className = { less.baseInfo }>
			<div className = { less.baseInfoTitle }>
				基本信息
			</div>
			<div
				className = { less.infoItem }
				style = { { marginTop : 0 } }
			>
				<Col span = { 5 }>商户ID：</Col>
				<Col>{ mchNo }</Col>
			</div>
			<div className = { less.infoItem }>
				<Col span = { 5 }>商户名称：</Col>
				<Col>{ name }</Col>
			</div>
			<div className = { less.infoItem }>
				<Col span = { 5 }>联系人：</Col>
				<Col>{ contactPerson || '无' }</Col>
			</div>
			<div className = { less.infoItem }>
				<Col span = { 5 }>Telegram：</Col>
				<Col>{ contactPhone || '无' }</Col>
			</div>
			<div className = { less.infoItem }>
				<Col span = { 5 }>代收手续费率：</Col>
				<Col>{ payInFeeRate }</Col>
			</div>
			<div className = { less.infoItem }>
				<Col span = { 5 }>代收单笔固定手续费：</Col>
				<Col>{ payInFeeFix }</Col>
			</div>
			<div className = { less.infoItem }>
				<Col span = { 5 }>代付手续费率：</Col>
				<Col>{ payOutFeeRate }</Col>
			</div>
			<div className = { less.infoItem }>
				<Col span = { 5 }>代付单笔固定手续费：</Col>
				<Col>{ payOutFeeFix }</Col>
			</div>
		</div>
	);
});

import { reaxel_user_info } from "@@reaxels";
import less from "../index.module.less";