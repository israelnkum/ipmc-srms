import {Button, Layout} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleGetCommonData} from "../../actions/commons/CommonAction";
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import MobileMenu from "./mobile-menu";
import {Outlet} from "react-router";

const AppLayout = (props) => {
    const [loading, setLoading] = useState(true)

    const {getCommonData} = props
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        getCommonData().then(() => setLoading(false))
    }, [])
    return (
        <Layout className={'max-w-screen-2xl mx-auto'}>
            <div className={'hidden md:block'}>
                <AppSidebar collapsed={collapsed}/>
            </div>
            <Layout>
                <AppHeader
                    mobileMenu={<MobileMenu collapsed={collapsed}/>}
                    collapseButton={
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    }/>
                <Layout.Content
                    style={{margin: '5px', minHeight: '100vh'}}>
                    <Outlet/>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

AppLayout.propTypes = {
    children: PropTypes.any,
    getCommonData: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
    getCommonData: () => dispatch(handleGetCommonData()),
})

export default connect(null, mapDispatchToProps)(AppLayout)
