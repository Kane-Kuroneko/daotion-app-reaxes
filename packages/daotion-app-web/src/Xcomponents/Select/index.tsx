import { Select as AntdSelect, SelectProps } from "antd";

import less from "./index.module.less";

const { Option: AntdOption } = AntdSelect;

export const Option = AntdOption;

export const Select: React.FC<SelectProps> = (props) => {
  return (
    <div className={less.main}>
      <AntdSelect
        notFoundContent="Not Found"
        dropdownClassName="daotion-dropdown"
        dropdownStyle={{
          padding: 4,
          border: '2px solid #E6E8EC',
          borderRadius: 12,
        }}
        showArrow={true}
        {...props}
      >
        {props.children}
      </AntdSelect>
    </div>
  );
};
