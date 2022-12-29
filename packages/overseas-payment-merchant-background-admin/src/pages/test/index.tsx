export const TestRender = reaxper(() => {
	const { current : badge } = useRef(Math.random());
	const { fetchInfo, setCount, store } = reaxel_test();
	const { message } = antd;
	const res =  fetchInfo(badge)
	useLayoutEffect(() => {
		res.then(() => {
			message.success('success')
		}).catch((e) => {
			message.error(e.msg)
		})
	}, [res])
	return (
		<div
			onClick={() => {
				setCount()
			}}
		>overviewInfo{store.count}</div>
	)
})

import { reaxel_test } from './reaxel-test'