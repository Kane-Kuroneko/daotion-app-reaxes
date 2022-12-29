
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

import { render } from 'react-dom';
import { App } from './App';
