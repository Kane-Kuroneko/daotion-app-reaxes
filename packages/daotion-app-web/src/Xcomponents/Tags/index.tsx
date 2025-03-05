import { Tag as AntdTags } from 'antd';

import less from './index.module.less';

const Tags = (props) => {
  return (
    <div className={less.daotionTag}>
      <AntdTags {...props} />
    </div>
  )
}

export default Tags;
