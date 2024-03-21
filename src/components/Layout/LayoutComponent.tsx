import { Layout, Button, theme } from "antd";
import { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import SiderComponent from "./SiderComponent";

const { Header, Content } = Layout

export default function LayoutComponent(props: any) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <SiderComponent collapsed={collapsed} />
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }} />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}
