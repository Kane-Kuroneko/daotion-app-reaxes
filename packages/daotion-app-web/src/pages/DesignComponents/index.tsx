export const DesignComponents = reaxper(() => {
	
	const { Button , Card , Space , Layout , Row , Col } = antd;
	
	
	const { navigate } = toolkits.useRouter();
	return <>
		<Layout
			style = { { height : "100%" , padding : "48px" } }
		>
			<Row
				gutter = { [ 20 , 0 ] }
			>
				<Col span = {4}>
					
					<Card
						onClick = { () => navigate('reaxes-template') }
						title = "reaxes-template"
						hoverable
						size = "small"
					>
						基于reaxes架构的工程模板
					</Card>
				</Col>
				<Col span = {4}>
					<Card
						onClick = { () => navigate('svg-overview') }
						title = "SVG Overview"
						hoverable
						size = "small"
					>
						展示所有工程中存在的SVG以便复用
					</Card>
				</Col>
			</Row>
		</Layout>
	</>;
});
export * from './Button-GoBack';
export * from './SvgOverview';
import "./index.less";
