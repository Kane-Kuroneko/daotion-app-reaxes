import less from './index.module.less';
import { reaxel_i18n } from '@@reaxels';


export const DxzLangCurrency = reaxper( () => {
	const { Tabs  } = antd;
	const { TabPane  } = Tabs;
	const {
		languageList ,
		changeLang ,
		language ,
	} = reaxel_i18n();
	return <>
		<div
			className = { less.container }
		>
			<Tabs>
				<TabPane
					tab = {i18n("Language")}
					key = "1"
				>
					<li className = { less.list }>
						{ languageList.map( ( {
								lang ,
								name ,
							} ) =>
								<span
									key = { lang }
									onClick = { () => {
										changeLang( lang );
									} }
									className = { `${ less.item } ${ lang === language ? less.selected : '' }` }
								>
									{ name }
								</span> ,
						) }
					</li>
				</TabPane>
				
				<TabPane
					tab = {i18n("Currency")}
					key = "2"
				>
					<li className = { less.list }>
						{ new Array( 9 ).fill( '' ).
						map( ( v , i ) =>
							<span
								className = { less.item }
								key = { v }
							>
								{ v }
							</span> ,
						) }
					</li>
				</TabPane>
			</Tabs>
			<div
				className = { less.divider }
			>
			</div>
		</div>
	</>;
} );



