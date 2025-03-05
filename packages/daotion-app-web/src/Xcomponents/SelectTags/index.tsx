import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import {Select, SelectProps} from "antd";

import Tags from '@@Xcomponents/Tags';

import less from './index.module.less';

const { Option: AntdOption } = Select;

const Option = AntdOption;

const tagRender = (params: CustomTagProps) => {
  const {label, closable, onClose} = params;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tags
      color="#2A85FF"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
    >
      {label}
    </Tags>
  );
};

export const SelectTags: React.FC<SelectProps> = (props) => {
  return (
    <div className={less.daotionSelectTags}>
      <Select
        mode="tags"
        allowClear
        showArrow
        tagRender={tagRender}
        notFoundContent="Not Found"
        dropdownClassName="daotion-dropdown"
        dropdownStyle={{
          padding: 4,
          border: '2px solid #E6E8EC',
          borderRadius: 12,
        }}
        {...props}
      >
        {props.children}
      </Select>
    </div>
  )
}
