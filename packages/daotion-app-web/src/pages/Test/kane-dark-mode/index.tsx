

export const KaneDarkMode = reaxper(() => {
	
	const reax_theme  = reaxel_theme();
	const {Switch} = antd;
	return <div
		className = { less.bg }
	>
		<input
			className = { less.input }
			defaultValue = "ddddddddddd"
		/>
		
		<footer>
			<p className = { less.p }>current theme : { reax_theme.theme } </p>
			<Switch
				checked={reax_theme.theme === "dark"}
				onChange={() => reax_theme.switch()}
			/>
		</footer>
	</div>;
})
import { reaxel_theme } from '@@reaxels';
import less from './index.module.less';
