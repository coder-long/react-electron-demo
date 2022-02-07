import React, { useEffect } from "react";
import { audioPlay } from './audio'
import './audio.scss'

function MyAudio(props) {



  useEffect(() => {

    console.log(_static.split('static'))

    let setConfig = {

      song: [
        {

          title: '光年之外',
          src: 'http://dl.stream.qqmusic.qq.com/C4000029Lt3K2XVP75.m4a?guid=1100231162&vkey=041338803A9B844C3CEFA2063BE79011A295AE672834D51A85F6E4887AF5C757AEC6F745FD5971A80C9645F6FC242FB09EFC08FAC79CC66C&uin=&fromtag=66',
          cover: _static.split('static') + '//images//logo4.png'
        },
        {

          title: '倒数',
          src: 'http://dl.stream.qqmusic.qq.com/C400001XzzJQ0DcCst.m4a?guid=6817178060&vkey=BB70EE7EB6CB14329D55B117253CEDEC0587C24A4C39E21EC015DFA8EB81628727EE70E3AF0D106C8E2DCAB66F9AF584045D9C39906B1671&uin=&fromtag=66',
          cover: `${_static}//images//logo4.png`
          // cover: _static + '/images/logo3.png'
        }
      ],
      error: function (meg) {

        console.log(meg);
      }
    };
    let audioFn = audioPlay(setConfig);

    if (audioFn) {
      //开始加载音频,true为播放,false不播放
      audioFn.loadFile(1);
    }
  })


  return (

    <div className="audio-box">
      <div className="audio-container">
        <div className="audio-view">
          <div className="audio-cover"></div>
          <div className="audio-body">
            <h3 className="audio-title">未知歌曲</h3>
            <div className="audio-backs">
              <div className="audio-this-time">00:00</div>
              <div className="audio-count-time">00:00</div>
              <div className="audio-setbacks">
                <i className="audio-this-setbacks">
                  <span className="audio-backs-btn"></span>
                </i>
                <span className="audio-cache-setbacks">
                </span>
              </div>
            </div>
          </div>
          <div className="audio-btn">
            <div className="audio-select">
              <div action="prev" className="icon-fast-backward"></div>
              <div action="play" data-on="icon-play" data-off="icon-pause" className="icon-play"></div>
              <div action="next" className="icon-fast-forward"></div>
              {/* <!--<div action="menu" className="icon-list-alt"></div>--> */}
              <div action="volume" className="icon-volume-up">
                <div className="audio-set-volume">
                  <div className="volume-box">
                    <i><span className="audio-backs-btn"></span></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


export default MyAudio;