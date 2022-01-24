/* 初始静态数据，初始请求过来的数据 */

//静态数据
export let initialState = {
  hel: {
    id: 'hl001',
    name: '何龙',
    age: '24',
    height: '170',
    address: '四川绵阳',
    girlFriendId: 'ccm001'
  },
  ccm: {
    id: 'ccm001',
    name: '陈',
    age: '23',
    height: '158',
    address: '四川泸州',
    frendId: 'hl001',
  },
  demo: [],
  socketData: {
    socketConnectedState: false,
  },
  complete: false,
};

//请求到的数据
export let initFetchState = {
  httpHel: {
    isFetching: false,
    data: {
      msg: 'flkhjsklhflks首付即可舒服了康师傅'
    }
  },
  token: '',
};