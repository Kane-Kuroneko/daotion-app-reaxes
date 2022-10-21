import path from "path";
import {repoRoot} from '/build/entrance.mjs';

export const webpackConfig = {
	
	
	resolve : {
		alias : {
			"@@pages" : path.resolve(repoRoot , "src/pages"),
			"@@reaxels" : path.resolve(repoRoot , "src/reaxels"),
			"@@tookits" : path.resolve(repoRoot , "src/toolkits"),
			"@@public" : path.resolve(repoRoot , "public"),
			
		} ,
	} ,
};
