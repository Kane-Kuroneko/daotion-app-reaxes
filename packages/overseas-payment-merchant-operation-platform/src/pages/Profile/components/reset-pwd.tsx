export const ResetPwd = reaxper(() => {
	const { navigate } = toolkits.useRouter();
	const reax_edit_info = reaxel_edit_info();
	const {
		setStatePwd ,
		resetPwdStore ,
		modifyPwd ,
	} = reax_edit_info;
	const submitPwd = () => {
		if( resetPwdStore.oldPassword === '' || resetPwdStore.newPassword === '' || resetPwdStore.checkPassword === '' ) {
			message.error('输入不能为空');
		} else if( resetPwdStore.newPassword !== resetPwdStore.checkPassword ) {
			message.error('确认密码不一致');
		} else {
			modifyPwd().then((res)=>{
				if (res === 'error') {
					message.error(res.message || '旧密码错误');
				} else {
					message.success('修改成功')
				}
			})
		}
	};
	
	
	const { Input , Button,message } = antd;
	return (
		<div className = { less.resetPasswordContainer }>
			<div className = { less.resetTitle }>
				<span className = { less.title }>
					修改密码
				</span>
				<span>
					密码修改成功后需重新登录
				</span>
			</div>
			<div className = { less.formContainer }>
				<span className = { less.formTitle }>
					旧密码
				</span>
				<Input
					value = { resetPwdStore.oldPassword }
					placeholder = { '请输入旧密码' }
					onChange = { (e) => {
						setStatePwd({
							oldPassword : e.target.value,
						});
					} }
					type = "password"
				/>
			</div>
			<div className = { less.formContainer }>
				<span className = { less.formTitle }>
					新密码
				</span>
				<Input
					placeholder = { '请输入新密码' }
					value = { resetPwdStore.newPassword }
					onChange = { (e) => {
						setStatePwd({
							newPassword : e.target.value,
						});
					} }
					type = "password"
				/>
			</div>
			<div className = { less.formContainer }>
				<span className = { less.formTitle }>
					再次输入密码
				</span>
				<Input
					placeholder = { '请再次输入密码' }
					value = { resetPwdStore.checkPassword }
					onChange = { (e) => {
						setStatePwd({
							checkPassword : e.target.value,
						});
					} }
					type = "password"
				/>
			</div>
			<Button
				type = "primary"
				loading = { resetPwdStore.pending }
				onClick = { () => {
					submitPwd();
				} }
			>
				修改密码
			</Button>
		</div>
	);
});

import { reaxel_edit_info } from "@@reaxels";
import less from "../index.module.less";
