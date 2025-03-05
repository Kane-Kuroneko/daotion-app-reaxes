

export const XButton: React.FC<IButton> = ({ children, onClick, style }) => {
  return (
    <div className={less.main} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

import less from './index.module.less';

interface IButton {
	onClick?: () => void;
	children: React.ReactNode;
	style?: React.CSSProperties;
}
