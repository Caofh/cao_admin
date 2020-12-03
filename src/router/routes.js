


// 公用子路由侧边栏
const EmptyLayout = () => import(/* webpackChunkName: "EmptyLayout" */ '@/components/EmptyLayout.vue') // webpack的魔法注释，将拆分出的js命名为EmptyLayout

// elementUi
const Button = () => import(/* webpackChunkName: "Layout" */ '@/views/elementUi/Button.vue') // webpack的魔法注释，将拆分出的js命名为Layout
const Table = () => import(/* webpackChunkName: "Table" */ '@/views/elementUi/Table.vue') // webpack的魔法注释，将拆分出的js命名为Table

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
        redirect: '/elementUi/layout',
        component: EmptyLayout,
        meta: {
            title: 'ElementUi',
        },
        children: [
            {
                path: 'layout',
                name: 'layout',
                redirect: '/elementUi/layout/button',
                component: EmptyLayout,
                meta: {
                    title: "常用组件",
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
                        component: Table,
                        meta: {
                            title: "表格",
                        }
                    },
                ]
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