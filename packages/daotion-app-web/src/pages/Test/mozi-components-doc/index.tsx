
export const ComponentsDoc = reaxper(class extends Reaxlass {
    state = {
        activeKey: 'XModal'
    }
    render () {
        const reax_theme = reaxel_theme();
        const theme = reax_theme.theme;
        const {Switch, Space, Layout, Menu } = antd;
        const { Header, Content, Sider } = Layout;
	    const menuItem = [
		    {
			    key : 'XButton' ,
			    label : 'XButton' ,
		    } ,
		    {
			    key : 'XInput' ,
			    label : 'XInput & XTextArea' ,
		    } ,
		    {
			    key : 'XSelect' ,
			    label : 'XSelect' ,
		    } ,
		    {
			    key : 'XModal' ,
			    label : 'XModal' ,
		    } ,
	    ];
    
        return (
            <Layout >
                    <Header
                         style={{
                            backgroundColor: '#fff'
                        }}
                    >
                        <div>
                            <span>主题切换</span>
                            <Switch
                                checked={reax_theme.theme === "dark"}
                                onChange={() => reax_theme.switch()}
                            />
                        </div>
                    </Header>
                <Layout>
                    <Sider theme={theme}>
                        <Menu
                            theme={theme}
                            mode="inline"
                            defaultSelectedKeys={['XModal']}
                            items={menuItem}
                            onClick={(e) => {
                                this.setState({
                                    activeKey: e.key
                                })
                                
                            }}
                        />
                    </Sider>
                    <Content
                        style={{
                           backgroundColor: theme === 'dark' ? '#333' : 'rgba(250, 250, 250, 1)',
									padding: '20px',
	                        boxSizing : 'border-box',
	                        
                        }}
                        
                    >
	                    {this.state.activeKey === 'XButton' && <XButtonShow/>}
	                    {this.state.activeKey === 'XInput' && <XInputShow/>}
	                    {this.state.activeKey === 'XSelect' && <XSelectShow/>}
	                    {this.state.activeKey === 'XModal' && <XModalShow/>}
                    </Content>
                </Layout>
            </Layout>
        )

    }
})

import { XButtonShow } from '../mozi-xbutton-show';
import { XInputShow } from '../mozi-xinput-show';
import { XSelectShow } from '../mozi-xselect-show';
import  { XModalShow } from '../mozi-xmodal-show';
import { reaxel_theme } from '@@reaxels';
