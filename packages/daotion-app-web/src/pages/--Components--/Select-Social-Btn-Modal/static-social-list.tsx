
export const staticSocialList:SocialItem[] = [
	{
		type : "Mirror" ,
		icon : <SVGMirror /> ,
	} ,
	{
		type : "Telegram" ,
		icon : <SVGTelegram /> ,
	} ,
	{
		type : "Notion" ,
		icon : <SVGNotion /> ,
	} ,
	{
		type : "Youtube" ,
		icon : <SVGYoutube /> ,
	} ,
	{
		type : "Medium" ,
		icon : <SVGMedium /> ,
	} ,
	{
		type : "ClubHouse" ,
		icon : <SVGClubHouse /> ,
	} ,
	{
		type : "Reddit" ,
		icon : <SVGReddit /> ,
	} ,
	{
		type : "Instagram" ,
		icon : <SVGInstagram /> ,
	} ,
	{
		type : "Tik tok" ,
		icon : <SVGTikTok /> ,
	} ,
	{
		type : "Facebook" ,
		icon : <SVGFacebook /> ,
	} ,
];

import {
	SVGClose ,
	SVGClubHouse ,
	SVGFacebook ,
	SVGGrayAdd ,
	SVGInstagram ,
	SVGMedium ,
	SVGMirror ,
	SVGNotion ,
	SVGReddit ,
	SVGTelegram ,
	SVGTikTok ,
	SVGYoutube ,
} from './svg';

type SocialItem = {
	type : string;
	icon :React.ReactElement;
}
