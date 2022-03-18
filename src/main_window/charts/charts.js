import * as echarts from 'echarts';


export default {
  init(element) {
    return echarts.init(element)
  },
  setOption(charts, option) {
    option && charts.setOption(option);
  }
}
