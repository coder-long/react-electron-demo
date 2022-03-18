import React, { useState, useRef } from "react";
import { HashRouter as Router, Switch, Route, Redirect, Link, NavLink } from "react-router-dom"
import { KeepaliveRouterSwitch, KeepaliveRoute } from "react-keepalive-router/lib";
import { Menu, Modal, Row, Col, Button, Card, Avatar } from "antd";
import history from "./config";
import { StarOutlined, StarFilled, HeartOutlined, LogoutOutlined, ExclamationCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Jiujia from "../components/JiuJia/Jiujia";
import TbCharts from "../pages/Home/TbCharts";
import Login from "../pages/Login/Login";
import Music from "../pages/Music/Music";
import Setting from "../components/Setting/Setting";
import UserManager from "../components/UserManager/UserManager";
import { UploadCom } from "../components/funCom";
import { useTranslation } from 'react-i18next';


function Implementation() {
  return <span>implementation</span>
}


const route = [
  // {
  //     component: Home,
  //     routes: [
  //         {
  //             path: '/',
  //             component: kjsjahjd,
  //             exact: true,
  //         },
  //         {
  //             path: "/child/:id",
  //             component: Child,
  //             routes: [
  //                 {
  //                     path: "/child/:id/grand-child",
  //                     component: GrandChild
  //                 }
  //             ]
  //         }
  //     ]
  // },
  {
    path: '/home/index',
    component: TbCharts,
    name: 'homeIndex',
    children: []
  },
  {
    path: '/home/implementation',
    component: Jiujia,
    name: Implementation,
    children: [
      {
        path: '/a1',
        component: '',
        name: "a1",
        children: []
      },
    ]
  },
  {
    path: '/home/implementation-child',
    component: Implementation,
    name: "implementation-child",
    children: []
  },
  {
    path: '/home/LOL',
    component: UploadCom,
    name: "LOL",
    children: []
  },
  {
    path: '/home/music',
    component: Music,
    name: "music",
    children: []
  },
  {
    path: '/home/quit',
    component: Music,
    name: "quit",
    children: []
  },
  {
    path: '/home/setting',
    component: Setting,
    name: "setting",
    children: []
  },
  {
    path: '/home/user-management',
    component: UserManager,
    name: "userManagement",
    children: []
  },
];

export const menu = [
  {
    path: '/home/index',
    icon: <span className="iconfont">&#xe63a;</span>,
    name: '主页'
  },
  {
    icon: <StarOutlined />,
    name: '实现方式',
    children: [
      {
        path: '/home/implementation',
        icon: <StarFilled />,
        name: '实现方式-child',
        children: [],
      }
    ],
  },
  {
    path: '/home/LOL',
    icon: <span className="iconfont">&#xe622;</span>,
    name: '英雄联盟'
  },
  {
    path: '/home/music',
    icon: <span className="iconfont">&#xe602;</span>,
    name: '音乐'
  },
  {
    path: '/home/user-management',
    icon: <UserOutlined />,
    name: '用户管理'
  },
  {
    path: '/home/setting',
    icon: <SettingOutlined />,
    name: '设置'
  },
]


//路由
export function MyRouter() {
  return (
    <KeepaliveRouterSwitch>
      {
        route.map(item => {
          if (item.path === '/' || item.path === '/home/index') {
            return <Route key={item.path} exact={item.exact} path={item.path} component={item.component} />
          } else {
            return <KeepaliveRoute key={item.path} exact={item.exact} path={item.path} component={item.component} />
          }
        })
      }
      {/* <Route path='/404' component={Notfound} /> */}
      <Redirect from='/home' to="/home/index" />
    </KeepaliveRouterSwitch>
  )
}



//导航
export function HeaderMenu() {
  const [t] = useTranslation()
  return (
    <Menu
      defaultSelectedKeys={['主页']}
      defaultOpenKeys={['sub1']}
      style={{ maxHeight: 'calc(100% - 150px)', overflowY: 'auto', overflowX: 'hidden', height: 'calc(100% - 150px)', WebkitAppRegion: "no-drag", }}
      mode="inline"
      theme="light">
      {
        menu.map(item => {

          return item.children && item.children.length ?
            <Menu.SubMenu key={item.name} icon={item.icon} title={t(`menu.${item.name}`)}>
              {
                item.children.map(subItem => {
                  return <Menu.Item key={subItem.name} icon={subItem.icon}>
                    <NavLink to={subItem.path}>{t(`menu.${subItem.name}`)}</NavLink>
                  </Menu.Item>
                })
              }
            </Menu.SubMenu>
            :
            <Menu.Item key={item.name} icon={item.icon}>
              <NavLink to={item.path}>{t(`menu.${item.name}`)}</NavLink>
            </Menu.Item>
        })
      }
    </Menu>
  )
}