


// 公用子路由侧边栏
const EmptyLayout = () => import(/* webpackChunkName: "EmptyLayout" */ '@/components/EmptyLayout.vue') // webpack的魔法注释，将拆分出的js命名为EmptyLayout

// elementUi
const Button = () => import(/* webpackChunkName: "Layout" */ '@/views/elementUi/button/Button.vue') // webpack的魔法注释，将拆分出的js命名为Layout
const Table = () => import(/* webpackChunkName: "Table" */ '@/views/elementUi/table/Table.vue') // webpack的魔法注释，将拆分出的js命名为Table
const Role = () => import(/* webpackChunkName: "Role" */ '@/views/elementUi/table/role/Role.vue') // webpack的魔法注释，将拆分出的js命名为Role
const LineEdit = () => import(/* webpackChunkName: "LineEdit" */ '@/views/elementUi/table/LineEdit.vue') // webpack的魔法注释，将拆分出的js命名为LineEdit
const Map = () => import(/* webpackChunkName: "Map" */ '@/views/elementUi/map/Map.vue') // webpack的魔法注释，将拆分出的js命名为Map
const Form = () => import(/* webpackChunkName: "Form" */ '@/views/elementUi/form/Form.vue') // webpack的魔法注释，将拆分出的js命名为Form
const Loading = () => import(/* webpackChunkName: "Loading" */ '@/views/elementUi/loading/Loading.vue') // webpack的魔法注释，将拆分出的js命名为Loading

// 项目常用方案
const Dialog = () => import(/* webpackChunkName: "Dialog" */ '@/views/self/Dialog.vue') // webpack的魔法注释，将拆分出的js命名为Dialog
const WordCloud = () => import(/* webpackChunkName: "WordCloud" */ '@/views/self/WordCloud.vue') // webpack的魔法注释，将拆分出的js命名为WordCloud

const routes = [

    {
        path: "/",
        redirect: '/elementUi',
    },

    {
        path: '/elementUi',
        name: 'elementUi',
        redirect: '/elementUi/button',
        component: EmptyLayout,
        meta: {
            title: 'ElementUi',
        },
        children: [
            {
                path: 'button',
                name: 'button',
                component: Button,
                meta: {
                    title: "button及icon",
                }
            },
            {
                path: 'table',
                name: 'table',
                redirect: '/elementUi/layout/table/base',
                component: EmptyLayout,
                meta: {
                    title: "表格",
                },
                children: [
                    {
                        path: 'base',
                        name: 'base',
                        component: Table,
                        meta: {
                            title: "基础表格",
                        }
                    },
                    {
                        path: 'role',
                        name: 'role',
                        component: Role,
                        meta: {
                            title: "角色管理",
                        },
                    },
                    {
                        path: 'lineEdit',
                        name: 'lineEdit',
                        component: LineEdit,
                        meta: {
                            title: "行内编辑",
                        },
                    },
                ]
            },
            {
                path: 'map',
                name: 'map',
                component: Map,
                meta: {
                    title: "地图",
                }
            },
            {
                path: 'form',
                name: 'form',
                component: Form,
                meta: {
                    title: "表单",
                }
            },
            {
                path: 'loading',
                name: 'loading',
                component: Loading,
                meta: {
                    title: "loading",
                }
            },

        ]
    },
    {
        path: '/self',
        name: 'self',
        redirect: '/self/dialog',
        component: EmptyLayout,
        meta: {
            title: '项目常用方案',
        },
        children: [
            {
                path: 'dialog',
                name: 'dialog',
                component: Dialog,
                meta: {
                    title: "弹窗",
                },
            },
            {
                path: 'wordCloud',
                name: 'wordCloud',
                component: WordCloud,
                meta: {
                    title: "词云",
                },
            },
        ]
    },

]

export default routes