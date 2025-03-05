import { Button as AntdBtn, ButtonProps } from "antd";

import less from "./index.module.less";

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className={less.main}>
      <AntdBtn type="primary" {...props} />
    </div>
  );
};
