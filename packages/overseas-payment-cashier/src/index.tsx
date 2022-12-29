
module?.hot?.accept?.(
	"./index.tsx" ,
	( ...args ) => {
		
		return render(
			<App /> ,
			document.getElementById( 'react-app-root' ) ,
		);
	} ,
	( ...args ) => {
		console.error( ...args );
		debugger;
	} ,
);

render(
	<App /> ,
	document.getElementById( 'react-app-root' ) ,
);


import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import { render } from 'react-dom';
import { App } from './App';
