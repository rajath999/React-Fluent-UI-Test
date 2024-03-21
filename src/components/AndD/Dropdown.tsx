import { Dropdown, Space } from "antd";
import type { MenuProps } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

const items_1: MenuProps["items"] = [
    { label: "Item 1", key: "item1" },
    { label: "Item 2", key: "item2" },
    { label: "Item 3", key: "item3" },
]
//onClick: (info) => { console.log("clicked : ", info)} 


const items: MenuProps['items'] = [
    {
      key: 'item1',
      label: (
        <div>
          1st menu item
        </div>
      ),

    },
    {
      key: 'item2',
      label: (
        <div>
          2nd menu item (disabled)
        </div>
      ),
      icon: <SmileOutlined />,
      onClick: (info) => { console.log("clicked : ", info)} 
    },
    {
      key: 'item3',
      label: (
        <div >
          3rd menu item (disabled)
        </div>
      ),
      onClick: (info) => { console.log("clicked : ", info)} 
    },
    {
      key: 'item4',
      danger: true,
      label: 'a danger item',
      onClick: (info) => { console.log("clicked : ", info)} 
    },
  ];

function DropDownAntD() {
    
    return (
        <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    );
}

export default DropDownAntD