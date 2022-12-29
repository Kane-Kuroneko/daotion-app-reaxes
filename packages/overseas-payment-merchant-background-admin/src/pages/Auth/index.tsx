import { Navigate } from "react-router-dom";

export const Login = reaxper(() => {
	
	const { isLoggedIn,pending } = reaxel_user_auth();
	if(isLoggedIn){	
		return <Navigate to = "/overview" />;
	}
	
	return (
		<div
			className = { less.loginWrapper }
			style = { {
				backgroundImage : `url(${ img_login_background })` ,
			} }
		>
			<div className = { less.loginContent }>
				<div className = { less.loginTitle }>
					<SVGLoginRainpayLogo />
				</div>
				<SignInForm />
			</div>
		</div>
	);
});

export const SignInForm = reaxper(() => {
	const {
		navigate,
	} = toolkits.useRouter();
	const { pending } = reaxel_user_auth();
	const { login , store , setFields } = reaxel_user_login();
	const { input_username , input_password } = store;
	const { Input , Button } = antd;
	return (
		<form onSubmit={(e) => {
			e.preventDefault();
		}}>
			<div className = { less.signInFormWrapper }>
				<h2 className = { less.formTitle }>Login to your acount</h2>
				<div className = { less.inputSection }>
					<div className = { less.accountInput }>
						<p className = { less.accountInputTitle }>账号</p>
						<Input
							name = "username"
							value = { input_username }
							onChange = { (e) => {
								setFields({ input_username : e.target.value });
							} }
						/>
					</div>
					<div className = { less.passwordInput }>
						<p className = { less.passwordInputTitle }>密码</p>
						<Input
							name = "password"
							type = { 'password' }
							value = { input_password }
							onChange = { (e) => {
								setFields({ input_password : e.target.value });
							} }
						/>
					</div>
				</div>
				
				<Button
					type = "primary"
					htmlType="submit"
					loading={pending}
					onClick = { () => {
						login().then(() => {
							navigate('/overview');
							antd.message.success('登陆成功!');
						}).catch((e) => {
							antd.Modal.error({
								title : "用户名或密码错误,请检查" ,
								content : e.message,
							});
						})
					} }
				>
					登录
				</Button>
			</div>
		</form>
	);
});

import less from './index.module.less';
import { SVGLoginRainpayLogo } from '@@SVGcomponents';
import img_login_background from '@@public/statics/login-background.png';
import {
	reaxel_user_login ,
	reaxel_user_auth,
} from '@@reaxels';
