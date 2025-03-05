import { reaxel_i18n } from '@@reaxels';

export const Test_Reaxel_i18n = reaxper( class extends Reaxlass {
	
	
	render() {
		const {
			loading ,
			changeLang ,
			language ,
			languageList ,
		} = reaxel_i18n();
		return <>
			<div>
				<select
					disabled = { loading }
					placeholder = "select lang"
					value = { language }
					onChange = { ( e ) => {
						const value = e.target.value;
						changeLang( value );
					} }
				>
					{ languageList.map( ( {
						lang ,
						name ,
					} ) => {
						return <option
							value = { lang }
							key = { lang }
						>{ name }</option>;
					} ) }
				</select>
				{ loading ? "loading..." : "completed" }
				<p><I18n>By stakeholders, for stakeholders.</I18n></p>
				<p><I18n>We bring DAOs and Stakeholders together.</I18n></p>
			</div>
		</>;
	}
} );
