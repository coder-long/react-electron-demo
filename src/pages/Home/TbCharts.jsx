
import React, { useState, useEffect, Fragment, useRef } from "react";
import $charts from '../../utils/charts'
import { tbChartsOption, option1, option2 } from './tbChartsOption'


/**
 * 主页 图表模块
*/
function TbCharts(props) {

  const TbChartsRef = useRef(null);
  const TbChartsRef1 = useRef(null);


  useEffect(() => {
    let myCharts = $charts.init(TbChartsRef.current),
      myCharts1 = $charts.init(TbChartsRef1.current)

    // $charts.setOption(myCharts, tbChartsOption) ;
    // $charts.setOption(myCharts1, option1);
    $charts.setOption(myCharts1, option2);
  })

  return (
    <div className="Tbcharts" >
      <div id='tabCharts' style={{ width: 0, height: 0 }} ref={TbChartsRef}></div>
      <div id='tabCharts' style={{ width: 600, height: 500 }} ref={TbChartsRef1}></div>
    </div>
  )

}

export default TbCharts;


