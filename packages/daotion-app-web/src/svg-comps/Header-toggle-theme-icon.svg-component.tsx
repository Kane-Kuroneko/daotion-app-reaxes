type props = {
	theme?: globalStoreType["theme"]
};
export const HeaderToggleThemeIconSvgComponent = reaxper( ( props?: props ) => {
	const { theme } = reaxel_theme();
	const scheme = {
		"light" : "#6f767e" ,
		"dark" : "#ffffff" ,
	}[ theme ] || "#6f767e";
	return <svg
		width = "24"
		height = "24"
		viewBox = "0 0 24 24"
		fill = "none"
		xmlns = "http://www.w3.org/2000/svg"
	>
		<path
			fillRule = "evenodd"
			clipRule = "evenodd"
			d = "M18.199 17.241C11.709 16.986 6.494 11.771 6.24 5.28102C4.79626 6.84265 3.99613 8.89227 4 11.019C4 13.2633 4.89153 15.4156 6.47846 17.0026C8.06539 18.5895 10.2177 19.481 12.462 19.481C14.5884 19.4846 16.6376 18.6845 18.199 17.241ZM20.204 15.141C21.047 15.02 21.796 15.826 21.346 16.548C20.4069 18.0579 19.0982 19.3033 17.5436 20.1665C15.9891 21.0296 14.2401 21.4821 12.462 21.481C6.684 21.481 2 16.797 2 11.019C2 7.27102 3.97 3.98302 6.933 2.13502C7.655 1.68502 8.461 2.43502 8.339 3.27702C8.26689 3.77712 8.23079 4.28175 8.231 4.78702C8.231 10.566 12.915 15.25 18.694 15.25C19.207 15.25 19.711 15.213 20.204 15.142V15.141Z"
			fill = { scheme }
		/>
	</svg>;
	
} );
import {reaxel_theme} from '@@reaxels';
