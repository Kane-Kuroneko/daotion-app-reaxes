import less from './index.module.less';

const DarkThemeTest = () => {
  const [dark, setDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setDark((prev) => !prev);
  }, []);

  return (
    <div>
      <button onClick={toggleTheme}>toggle</button>
      <div id="dark-test" className={`${less.main} ${dark ? less.dark : less.light}`}>
        {dark ? "dark now" : "light now"}
      </div>
    </div>
  )
}

export default React.memo(DarkThemeTest);
