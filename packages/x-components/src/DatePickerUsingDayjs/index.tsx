import {
	Dayjs ,
	extend,
} from 'dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import Timezone from 'dayjs/plugin/timezone';
import Utc from 'dayjs/plugin/utc';

extend(Timezone);
extend(Utc);

import type { GenerateConfig } from 'rc-picker/es/generate';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
declare type dayjsGenerateConfig = GenerateConfig<Dayjs>;



export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig as dayjsGenerateConfig);

