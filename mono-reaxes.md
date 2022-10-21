use:

`yarn start daotion-app-web`

or

`yarn start daotion-demo-web`

| name         | type                                                               | desc                                                                                       |
|--------------|--------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| repo         | `string<packages/*>`                                               | 子包包名,用于构建流程获取路径                                                                            |
| method       | `string<"server"&#124;"build">`                                    | server启动本地开发服务器 build打包为构建文件到dist目录                                                        |
| env          | `string<"server_yang"&#124;"server_dev"&#124;"server_production">` | 请求服务器环境,杨旭晓本地环境,测试环境,生产环境                                                                  |                                     |
| node_env     | `string<"development"&#124;"production">`                          | 打包模式,主要是webpack.mode,如果不指定env,则development自动使用server_dev , production自动使用server_production |
| experimental | `boolean`                                                          | 是否开启实验特性 , 一般在运行时使用                                                                        |
| mock         | `boolean`                                                          | 是否启用mock                                                                                   |  
| analyze      | `boolean`                                                          | 是否启用webpack打包分析器                                                                           |



