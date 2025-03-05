export const ProfileApi = reaxper(() => {
	const badge = useRef(Math.random())
	const { Space, Col, Row, Button, message } = antd;
	const {closuredFetchApiConfig,apiConfig} = reaxel_user_info();
	closuredFetchApiConfig(badge.current);
	const reax_edit_info = reaxel_edit_info();
	const {
		mchKey = '' ,
		platformIPS = '' ,
		payInCallback = '' ,
		payOutCallback = '' ,
		payOutWhitelist = [] ,
		address = '' ,
	} = apiConfig;
	const colSet = {
		xs : { span : 2 } ,
		sm : { span : 4 } ,
		md:  { span :6 } ,
		lg : {span : 8 } ,
		xl : {span: 8 } ,
	};
	return (
		<>
			<div className = { less.baseInfo }>
				<div className={less.baseInfoTitle}>
					API对接
				</div>
				<div
					className = { less.infoItem }
					style = { { marginTop : 0 } }
				>
					<Col {...colSet}>商户Key：</Col>
					<Col {...colSet}>{ mchKey }</Col>
					<Col
						{...colSet}
						onClick={() => {clipboard(mchKey, {
							onCopy: () => {message.success('已复制到粘贴板')}
						})}}
					><SVGCopyBtn/></Col>
				</div>
				<div className = { less.infoItem }>
					<Col {...colSet}>平台IP</Col>
					<Col {...colSet}>{ platformIPS || '无' }</Col>
				</div>
				<div className = { less.infoItem }>
					<Col {...colSet}>代收回调url</Col>
					<Col {...colSet}>{ payInCallback }</Col>
					<Col>
						<Button type="link" onClick={() => {reax_edit_info.showModal('payInCallback')}}>设置</Button>
					</Col>
				</div>
				<div className = { less.infoItem }>
					<Col {...colSet}>代付回调url</Col>
					<Col {...colSet}>{ payOutCallback }</Col>
					<Col {...colSet}>
						<Button type="link" onClick={() => {reax_edit_info.showModal('payOutCallback')}}>设置</Button>
					</Col>
				</div>
				<div className = { less.infoItem }>
					<Col {...colSet}>
						<p>代付白名单IP</p>
						<p className={less.declare}>如果有设置，平台只接收来自白名单ip地址的代付请求。</p>
					</Col>
					<Col {...colSet}>
						{payOutWhitelist.length > 0 && payOutWhitelist.map((i) => <span key = { i }>{ i};</span>) }
					</Col>
					<Col {...colSet}>
						<Button type="link" onClick={() => {reax_edit_info.showModal('payOutWhitelist')}}>设置</Button>
					</Col>
				</div>
				<div className = { less.infoItem }>
					<Col {...colSet}>提现地址(TRC-20)</Col>
					<Col {...colSet}>{ address }</Col>
					<Col {...colSet}>
						<Button type="link" onClick={() => {reax_edit_info.showModal('address')}}>设置</Button>
					</Col>
				</div>
			</div>
			<SetApiModal/>
		</>
	);
});

const SetApiModal = reaxper(() => {
	const { Modal , Input , Button } = antd;
	const reax_edit_info = reaxel_edit_info();
	const { setApiStore } = reax_edit_info;
	const {
		apiSetModalKey = '' ,
	} = setApiStore;
	const modalContent = {
		'payInCallback' : {
			title : '设置代收回调url' ,
			subTitle : '代收回调 url' ,
			value : setApiStore.payInCallback ,
			
		} ,
		'payOutCallback' : {
			title : '设置代付回调url' ,
			subTitle : '代付回调url' ,
			value : setApiStore.payOutCallback ,
		} ,
		'payOutWhitelist' : {
			title : '设置代付白名单 ' ,
			subTitle : '代付白名单IP ' ,
			memo : '如多个IP,每个IP之间用英文;隔开。如果有设置，平台只接收来自白名单中的IP地址的代付请求。' ,
			value : setApiStore.payOutWhitelist ,
		} ,
		'address' : {
			title : '设置提现地址' ,
			subTitle : 'TRC-20地址' ,
			memo : '请确保输入正确的地址' ,
			value : setApiStore.address ,
		} ,
		
	};
	return (
		<Modal
			className = { less.setApiModal }
			visible = { setApiStore.apiSetModalShow }
			title = { modalContent[apiSetModalKey].title }
			footer = { null }
			closable = { false }
			width = { 380 }
		>
			<div className = { less.setApiModalContainer }>
				<div className = { less.inputForm }>
					<span>{ modalContent[apiSetModalKey].subTitle }</span>
					<Input
						value = { modalContent[apiSetModalKey].value }
						onChange = { (e) => {
							reax_edit_info.setStateApi({
								[apiSetModalKey] : e.target.value,
							});
						} }
					/>
					<span className = { less.desc }>
						{ modalContent[apiSetModalKey].memo }
					</span>
				</div>
				<div className = { less.btnSection }>
					<Button
						type = "primary"
						onClick = { () => {
							reax_edit_info.setApiConfig();
						} }
					>提交</Button>
					<Button
						onClick = { () => {
							reax_edit_info.setStateApi({
								apiSetModalShow : false,
							});
						} }
					>取消</Button>
				</div>
			</div>
		</Modal>
	);
});
import {
	reaxel_edit_info ,
	reaxel_user_info,
} from "@@reaxels";
import less from "../index.module.less";
import clipboard from "copy-to-clipboard";
import { SVGCopyBtn } from "@@SVGcomponents";
