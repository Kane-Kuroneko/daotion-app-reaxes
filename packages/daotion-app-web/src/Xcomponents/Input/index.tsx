import type {TextAreaProps} from 'antd/lib/input';

import {Input as AntdInput, InputProps} from 'antd';

import less from './index.module.less';

export const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={less.daotionInput}>
      <AntdInput {...props} />
    </div>
  )
}

export const InputTextarea: React.FC<TextAreaProps> = (props) => {
  return (
    <div className={less.daotionInput}>
      <AntdInput.TextArea {...props} />
    </div>
  )
}
