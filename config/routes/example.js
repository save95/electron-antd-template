export default [
  {
    path: '/admin',
    name: '管理中心',
    icon: 'crown',
    component: './Admin',
    authority: ['admin'],
    routes: [
      {
        path: '/admin/sub-page',
        name: '子页面',
        icon: 'smile',
        component: './Welcome',
        authority: ['admin'],
      },
    ],
  },
  {
    path: '/list',
    name: '列表页',
    icon: 'table',
    component: './example',
  },
];
