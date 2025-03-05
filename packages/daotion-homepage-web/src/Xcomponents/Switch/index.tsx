export const XSwitch: React.FC<ISwitch> = ({ isOn, handleToggle, colorOne, colorTwo }) => {
  const memoLabelStyle = useMemo(() => {
    return { background: isOn ? colorOne : colorTwo };
  }, [colorOne, colorTwo, isOn]);

  const handleChange = useCallback(() => {
    handleToggle();
  }, []);

  return (
    <>
      <input checked={isOn} onChange={handleChange} className={less.checkbox} type="checkbox" />
      <label style={memoLabelStyle} onClick={handleChange} className={less.label} htmlFor="switch">
        <span className={less.button} />
      </label>
    </>
  );
};


import less from './index.module.less';

interface ISwitch {
	isOn: boolean;
	handleToggle: () => void;
	colorOne: string;
	colorTwo: string;
}
