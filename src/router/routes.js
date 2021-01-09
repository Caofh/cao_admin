


// 公用子路由侧边栏
const EmptyLayout = () => import(/* webpackChunkName: "EmptyLayout" */ '@/components/EmptyLayout.vue') // webpack的魔法注释，将拆分出的js命名为EmptyLayout

// elementUi
const Table = () => import(/* webpackChunkName: "Table" */ '@/views/elementUi/table/Table.vue') // webpack的魔法注释，将拆分出的js命名为Table
const Role = () => import(/* webpackChunkName: "Role" */ '@/views/elementUi/table/role/Role.vue') // webpack的魔法注释，将拆分出的js命名为Role
const LineEdit = () => import(/* webpackChunkName: "LineEdit" */ '@/views/elementUi/table/LineEdit.vue') // webpack的魔法注释，将拆分出的js命名为LineEdit
const Map = () => import(/* webpackChunkName: "Map" */ '@/views/elementUi/map/Map.vue') // webpack的魔法注释，将拆分出的js命名为Map
const Form = () => import(/* webpackChunkName: "Form" */ '@/views/elementUi/form/Form.vue') // webpack的魔法注释，将拆分出的js命名为Form
const Loading = () => import(/* webpackChunkName: "Loading" */ '@/views/elementUi/loading/Loading.vue') // webpack的魔法注释，将拆分出的js命名为Loading
const Element = () => import(/* webpackChunkName: "Element" */ '@/views/elementUi/element/Element.vue') // webpack的魔法注释，将拆分出的js命名为Element
const BetterScroll = () => import(/* webpackChunkName: "BetterScroll" */ '@/views/elementUi/betterScroll/BetterScroll.vue') // webpack的魔法注释，将拆分出的js命名为BetterScrpll
const Verify = () => import(/* webpackChunkName: "Verify" */ '@/views/elementUi/verify/Verify.vue') // webpack的魔法注释，将拆分出的js命名为Verify
const Edit = () => import(/* webpackChunkName: "Edit" */ '@/views/elementUi/editor/Index.vue') // webpack的魔法注释，将拆分出的js命名为Edit
const WordCloud = () => import(/* webpackChunkName: "WordCloud" */ '@/views/elementUi/WordCloud.vue') // webpack的魔法注释，将拆分出的js命名为WordCloud

// 项目常用方案
const Dialog = () => import(/* webpackChunkName: "Dialog" */ '@/views/self/Dialog.vue') // webpack的魔法注释，将拆分出的js命名为Dialog


const routes = [

    {
        path: "/",
        redirect: '/elementUi',
    },

    {
        path: '/elementUi',
        name: 'elementUi',
        redirect: '/elementUi/table',
        component: EmptyLayout,
        meta: {
            title: '项目',
        },
        children: [
            {
                path: 'table',
                name: 'table',
                redirect: '/elementUi/table/base',
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
                path: 'wordCloud',
                name: 'wordCloud',
                component: WordCloud,
                meta: {
                    title: "词云",
                },
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
            {
                path: 'element',
                name: 'element',
                component: Element,
                meta: {
                    title: "element组件",
                }
            },
            {
                path: 'betterScrpll',
                name: 'betterScrpll',
                component: BetterScroll,
                meta: {
                    title: "滚动",
                }
            },
            {
                path: 'Verify',
                name: 'Verify',
                component: Verify,
                meta: {
                    title: "验证码",
                }
            },
            {
                path: 'edit',
                name: 'edit',
                component: Edit,
                meta: {
                    title: "富文本",
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
            title: '作者开发',
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
        ]
    },

]

export default routes