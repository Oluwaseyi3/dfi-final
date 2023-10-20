import { Col, Image, Row, Menu, Layout } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import React from 'react';
import Account from '../Account';

import { useRouter } from 'next/router';
import SubMenu from 'antd/lib/menu/SubMenu';
import { MenuOutlined } from '@ant-design/icons';
// import OutlineButton from '../Button/Outline';

const Nav = ({ children }: any) => (
    <Layout.Header
        style={{
            width: '100vw',
            height: '66px',
            background: '#ffffff',
            boxShadow: '0px 3px 29px #00000012',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
        }}
    >
        {children}
    </Layout.Header>
);

const NavContainer = ({ children }: any) => (
    <Row
        style={{
            maxWidth: '1500px', // Replace 'your-max-width' with your actual max-width
            width: '100%',
            height: '66px',
        }}
    >
        {children}
    </Row>
);

const MenuCol = ({ children }: any) => (
    <Row>
        <Col
            xs={{ span: 0 }}
            sm={{ span: 24 }}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            {children}
        </Col>
        <Col
            xs={{ span: 24 }}
            sm={{ span: 0 }}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            {children}
        </Col>
    </Row>
);

const NavMenuItem = ({ children }: any) => (
    <Menu.Item
        style={{
            height: '100%',
            width: 'auto',
            padding: '3px 0px 1px 0px',
            margin: '0px 20px 0px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff', // Replace 'your-primary-color' with your actual primary color
            fontSize: '16px',
            flexGrow: 0,
        }}
    >
        <a
            style={{
                color: '#0000FF', // Replace 'your-primary-color' with your actual primary color
            }}
        >
            {children}
        </a>
    </Menu.Item>
);

const NavMenuCol = ({ children }: any) => (
    <>
        {/* For screens smaller than 768px */}
        <Col xs={{ span: 24 }} sm={{ span: 0 }}>
            {children}
        </Col>

        {/* For screens equal to or larger than 768px */}
        <Col xs={{ span: 0 }} sm={{ span: 24 }}>
            {children}
        </Col>
    </>
);

const Navbar: React.FC = (): React.ReactElement => {
    const router = useRouter();
    console.log(router.pathname);

    const activeStyle = {
        borderBottom: '2px solid #E7694C',
        padding: '5px 0px 1px 0px',
    };

    return (
        <Nav>
            <NavContainer justify="center" align="middle">
                <Col xs={10} sm={10} md={4} style={{ height: '100%' }}>
                    <Link href="/">
                        {/* <Logo height="55px" width="55px" src="../assets/derpfi.png" alt="" preview={false} /> */}
                        <div style={{ marginTop: '10px', marginLeft: '55px' }}>
                            <Image
                                src="../assets/derpfi.png"
                                alt="Logo"
                                width={100} // Adjust the width as needed
                                height={100} // Adjust the height as needed
                            />
                        </div>
                    </Link>
                </Col>
                <MenuCol xs={0} sm={0} md={20} style={{ height: '100%' }}>
                    <NavMenuItem style={'/funds' == router.pathname ? activeStyle : {}}>
                        <Link href="/funds">Funds</Link>
                    </NavMenuItem>
                    <NavMenuItem style={'/staking' == router.pathname ? activeStyle : {}}>
                        <Link href="/staking">Staking</Link>
                    </NavMenuItem>
                    <NavMenuItem>
                        <Account />
                    </NavMenuItem>
                </MenuCol>
                <NavMenuCol xs={14} sm={14} md={0} style={{ height: '100%' }}>
                    <Menu mode="horizontal" triggerSubMenuAction="click">
                        <SubMenu key="SubMenu" icon={<MenuOutlined />} title="Menu">
                            <Menu.ItemGroup title="Bundle">
                                <Menu.Item key="bdl">
                                    <Link href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x7ff78e1cab9a2710eb6486ecbf3d94d125039364">
                                        Buy Derphi
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="Navigation">
                                <Menu.Item key="/funds">
                                    <Link href="/funds">Funds</Link>
                                </Menu.Item>
                                <Menu.Item key="/staking" style={'/staking' == router.pathname ? activeStyle : {}}>
                                    <Link href="/staking">Staking</Link>
                                </Menu.Item>
                                <Menu.Item
                                    key="/staking"
                                    style={'/staking' == router.pathname ? activeStyle : {}}
                                ></Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="Wallet">
                                <Menu.Item key="wallet">
                                    <Account />
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                </NavMenuCol>
            </NavContainer>
        </Nav>
    );
};

export default Navbar;
