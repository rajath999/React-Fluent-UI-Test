import { Layout, Menu } from "antd";
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const paths = {
    '1': {
        path: '/',
        name: "dropdown"
    },
    '2': {
        path: 'day-picker',
        name: 'day-picker'
    },
    '3': {
        path: 'ant-tree',
        name: 'ant-tree'
    },
    '4': {
        path: 'fabric',
        name: 'fabric',
    },
    '5': {
        path: 'multi-dnd',
        name: 'multi-dnd',
    },
    '6': {
        path: 'tree-view',
        name: 'tree-view',
    },
    '7': {
        path: 'worker-tree',
        name: 'antd-tree',
    },
}

export default function SiderComponent({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onSelect={(info) => {
            navigate(paths[info.key as keyof typeof paths].path)
        }}
        items={Object.keys(paths).map(k => ({ key: k, label: (paths as any)[k].name}))}
      />
    </Sider>
  );
}
