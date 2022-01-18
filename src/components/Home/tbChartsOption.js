let tbChartsOption = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'scatter'
    }
  ]
};


let option1 = {
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
};

const option2 = {
  title: {
    text: 'Bar Chart with Negative Value'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 80,
    bottom: 30
  },
  xAxis: {
    type: 'value',
    position: 'top',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  yAxis: {
    type: 'category',
    axisLine: { show: false },
    axisLabel: {
      show: true,
      color: 'red',
      formatter: function (value, index) {
        console.log(value, index)
        if (value.split() === 'ten') {
          return `{a|${value}}`
        } else {
          return `{b|${value}{}}`
        }
      },
      rich: {
        a: {
          color: 'red',
        },
        b: {
          color: 'blue'
        }
      }
    },
    axisTick: { show: false },
    splitLine: { show: false },
    data: [
      'ten',
      'nine',
      'eight',
      'seven',
      {
        value: 'six',
        textStyle: {
          color: 'red'
        }
      },
      // 'five',
      // 'four',
      // 'three',
      // 'two',
      // {
      //   value: 'one',
      //   textColor: 'red'
      // }
    ]
  },
  series: [
    {
      name: 'Cost',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        formatter: '{b}%'
      },
      data: [
        { value: 0.07, label: { color: 'yellow', align: 'right' }, itemStyle: { textStyle: { color: 'yellow' } } },
        { value: 0.09, label: 'right' },
        { value: 0.23, label: 'right' },
        { value: 0.17, label: 'right' },
        { value: 0.36, label: 'right' },
      ]
    }
  ]
};

export {
  tbChartsOption,
  option1,
  option2
}