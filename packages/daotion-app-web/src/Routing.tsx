import {
	BrowserRouter ,
	Navigate ,
	Route ,
	Routes ,
} from 'react-router-dom';
import { reaxel__SBT_available } from '@@reaxels';
import { Test } from '@@pages/Test';
import {
	DesignComponents ,
	SvgOverview ,
} from '@@pages/DesignComponents';
import { ReactTemplate } from '@@public/react-template';
import { PluginSBTInfo } from '@@pages/Plugin-SBT-Info';
import { All_Spaces_List_Container } from '@@pages/Home';
import { Sider_Space_Plugin_List } from '@@pages/Sider-Space-Plugin_List';
import { SpaceInfo } from '@@pages/Space-Info';
import { SpaceSettings } from '@@pages/Space-Settings';
import { Profile } from '@@pages/Profile';
import { NewSBT } from '@@pages/Plugin-SBT-Pad--New';
import { EditProfile } from "@@pages/Edit-Profile";
import { PluginSBTPadList } from '@@pages/Plugin-SBT-Pad-List';
import { PluginSBTSettings } from '@@pages/Plugin-SBT-Settings';

import { Layout } from '@@root/src/Layout';

export const Routing = (props) => {
	return <BrowserRouter>
		<Routes>
			<Route
				path = "*"
				element = { toolkits.withOutlet(<Layout />) }
			/>
			<Route
				path = "design/*"
				element = { toolkits.withOutlet(<DesignComponentsRouting />) }
			/>
			
			{ __NODE_ENV__ === 'development' && <Route
				path = "test/*"
				element = { toolkits.withOutlet(<Test />) }
			/> }
			
			<Route
				path = "react-template"
				element = { toolkits.withOutlet(<ReactTemplate />) }
			/>
		</Routes>
	</BrowserRouter>;
};

export const SiderPluginListRouting = () => <Routes>
	<Route
		path = "/space:spaceID/*"
		element = { toolkits.withOutlet(<Sider_Space_Plugin_List />) }
	/>
</Routes>;


export const MainContentRouting = reaxper(() => {
	
	
	
	
	return <Routes>
		<Route path = "*">
			<Route
				index
				element = { <Navigate
					to = "home"
					replace
				/> }
			/>
			<Route
				path = "home"
				element = { toolkits.withOutlet(<All_Spaces_List_Container />) }
			/>
			<Route
				path = "profile"
			>
				<Route
					index
					element = { toolkits.withOutlet(<Profile />) }
				/>
				<Route
					path = "edit"
					element = { toolkits.withOutlet(<EditProfile />) }
				/>
				<Route
					path = ":address"
					element = { toolkits.withOutlet(<Profile />) }
				/>
			</Route>
			<Route
				path = "space:spaceID/*"
			>
				<Route
					index
					element = { <Navigate
						to = { 'info' }
						replace
					/> }
				/>
				<Route
					path = "info"
					element = { <SpaceInfo /> }
				/>
				
				
				<Route
					path = "sbt-pad"
					caseSensitive
				>
					<Route
						index
						element = { <>
							<PluginSBTPadList />
						</> }
					/>
					<Route
						path = "new"
						element = { <NewSBT /> }
					/>
				</Route>
				<Route
					path = "sbt-fusion"
					caseSensitive
					element = { <span>SBT Fusion</span> }
				/>
				
				<Route
					path = "SBT:SBTID"
					caseSensitive
					element={toolkits.withOutlet(React.createElement(reaxper(() => {
						const { spaceID , SBTID } = toolkits.useSpaceSBTID();
						const { FetchSBTAvailable , SBT_existed , reset } = reaxel__SBT_available();
						FetchSBTAvailable(spaceID , SBTID);
						useEffect(() => () => reset() , []);
						crayon.green('SBTID existed : ',SBT_existed,spaceID,SBTID);
						return null;
					})))}
				>
					<Route
						index
						element = {WithSBTAvailable(<Navigate
							to = "info"
							replace
						/>)}
					/>
					<Route
						path = "info"
						element = { WithSBTAvailable(<PluginSBTInfo />) }
					/>
					<Route
						path = "settings"
						element = { WithSBTAvailable(<PluginSBTSettings />) }
					/>
				</Route>
				<Route
					path = "settings"
					element = { <SpaceSettings /> }
				/>
			</Route>
		</Route>
	</Routes>
});

export const DesignComponentsRouting = () => <Routes>
	<Route
		index
		element = { <DesignComponents /> }
	/>
	<Route
		path = "svg-overview"
		element = { <SvgOverview /> }
	/>
	<Route
		path = "reaxes-template"
		element = { <ReactTemplate /> }
	/>
</Routes>;






const WithSBTAvailable = ((ReactElement) => {
	const reax_SBT_available = reaxel__SBT_available();
	const { Result } = antd;
	return reax_SBT_available.SBT_existed ? ReactElement : <Result status = { 404 } />;
});
