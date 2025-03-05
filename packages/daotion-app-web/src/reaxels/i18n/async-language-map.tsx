export const asyncLangMap = {
	"zh-CN" : () => import('@@public/lang/lang_zh-CN.json'),
	/*模拟测试: 当异步加载一个语言包很慢时,实现了先渲染上一次语言的缓存(防止空白),待加载lang-json成功后再渲染*/
	"zh-TC": () => {
		/*todo 产品经理认为如果切换慢时禁用切换功能即可.*/
		return orzPromise((resolve) => {
			setTimeout( () => {
				import('@@public/lang/lang_zh-TC.json').then( ( module ) => {
					resolve( module );
				} );
			} , 2500 );
		})
	},
};
