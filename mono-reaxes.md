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




代码中的绝对路径别名(#开头为根目录全局资源,@@开头为当前repo内的资源):

| pathName        | absolute path         | meaning                                            |
|-----------------|-----------------------|----------------------------------------------------|
| `#project-root` | `/`                   | 工程根目录                                              |
| `#reaxes`       | `/packages/reaxes`    | reaxes核心库                                          |
| `#requester`    | `/packages/requester` | 为所有业务工程提供统一的请求方法,但根据每个业务模块特色自定义钩子                  |
| `#reaxels`      | `/packages/reaxels`   | 全局统一的reaxel工厂,如I18n,暗夜模式等                          |
| `#toolkits`     | `/packages/toolkits`  | 某些工程可通用的业务方法(如daotion系工程,都会判断两个address相等性),与具体业务相关 |
| `#utils`        | `/packages/utils`     | 与具体业务无关的通用方法和react hooks                           |
|                 |                       |                                                    |
|                 |                       |                                                    |
