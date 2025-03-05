const hook = new SyncHook(["name"]);

hook.tap(`sync-hook`,(name) => {
	console.log(name);
});

hook.call('sdsd');

console.log(hook);




console.log(hook.taps);


import {
	SyncHook,
	
} from 'tapable';
