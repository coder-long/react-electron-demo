



export const routes = [
  {
    path: '/',
    component: '',
    name: 'home',
    children: []
  },
  {
    path: '/aaa',
    component: '',
    name: "aaa",
    children: [
      {
        path: '/a1',
        component: '',
        name: "a1",
        children: []
      },
      {
        path: '/a2',
        component: '',
        name: "a2",
        children: []
      },
    ]
  },
  {
    path: '/bbb',
    component: '',
    name: "bbb",
    children: []
  },
  {
    path: '/ccc',
    component: '',
    name: "ccc",
    children: []
  },
];

export const link = [
  {
    to: "",
    component: ''
  },
]