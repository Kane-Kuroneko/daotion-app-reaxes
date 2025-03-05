import { Button } from "@@Xcomponents/Button";
import { SelectTags , Option } from "@@Xcomponents";
import { BtnCreateSpaceSvgComponent } from "@@SVGcomponents/Btn-Create-Space.svg-component";
import { HeaderToggleThemeIconSvgComponent } from "@@SVGcomponents";
import { Select } from "@@Xcomponents/Select";
import Switch from '@@Xcomponents/Switch';

const InputTest = () => {
  const [checked, setChecked] = useState(false); // 按钮checked状态

  const toggleSwitch = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <div
      style={{
        padding: 32,
        backgroundColor: "#676767",
      }}
    >
      <Switch isOn={checked} handleToggle={toggleSwitch} colorOne="#33383F" colorTwo="#204c2f" />

      <Select defaultOpen={true} placeholder="Select a person">
        <Option value="china" label="China">
          <span>
            <span>🇨🇳</span>
            China (中国)
          </span>
        </Option>
        <Option value="usa" label="USA">
          <span>
            <span>🇺🇸</span>
            USA (美国)
          </span>
        </Option>
      </Select>
      <SelectTags
        defaultOpen={true}
        placeholder="Enter tags to describe your item"
        defaultValue={["aaa", "bbb", "ccc", "ddd", "eee"]}
      >
        <Option value="china" label="China">
          <span>
            <span>🇨🇳</span>
            China (中国)
          </span>
        </Option>
        <Option value="usa" label="USA">
          <span>
            <span>🇺🇸</span>
            USA (美国)
          </span>
        </Option>
      </SelectTags>
      <Button type="primary">hello</Button>
      <hr />
      <Button>
        <HeaderToggleThemeIconSvgComponent />
      </Button>
      <hr />
      <Button
        type="primary"
        size="large"
        icon={HeaderToggleThemeIconSvgComponent}
      >
        hello
      </Button>
      <hr />
      <Button type="primary" size="large" icon={BtnCreateSpaceSvgComponent}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, magnam?
      </Button>
      <div>
        <Button type="ghost">hello</Button>
        <hr />
        <Button size="large" icon={<HeaderToggleThemeIconSvgComponent />} />
        <hr />
        <Button
          type="ghost"
          size="large"
          icon={HeaderToggleThemeIconSvgComponent}
        >
          hello
        </Button>
        <hr />
        <Button danger size="large" icon={BtnCreateSpaceSvgComponent}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
          magnam?
        </Button>
        <Button
          danger
          size="large"
          icon={<HeaderToggleThemeIconSvgComponent />}
        />
        <Button danger size="middle" icon={BtnCreateSpaceSvgComponent}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
          magnam?
        </Button>
      </div>
    </div>
  );
};

export default React.memo(InputTest);
