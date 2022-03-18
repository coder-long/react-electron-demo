//函数名
let fnName = 'audioPlay',
	control = new Audio(),
	elem = new Object(),//外层容器下所有元素的集合
	audioBtn,
	audioBtnFind,
	operation,//播放的开关
	songSelect = 0,
	//默认的属性
	_default = {
		controller: '.audio-view',//外层盒子
		elem: {
			cover: '.audio-cover',//封面
			songTitle: '.audio-title',//歌曲标题
			thisTime: '.audio-this-time',//当前时间
			countTime: '.audio-count-time',//总时长
			setbacks: '.audio-setbacks',//总进度
			thisSetbacks: '.audio-this-setbacks',//当前进度
			cacheSetbacks: '.audio-cache-setbacks',//已加载进度
			audioBtn: '.audio-select',//按钮组
			volume: '.audio-set-volume'//音量
		},
		song: null,//歌单
		error: null
	},
	scheduleTimer,//歌曲进度的计时器

	//错误类型
	errorMeg = [
		{
			tyep: 1,
			meg: '音频路径不存在或者加载失败'
		},
		{
			type: 2,
			meg: '获取不到选择容器！！！'
		},
		{
			type: 3,
			meg: '当前歌单没有歌曲!!!'
		},
		{
			type: 4,
			meg: '浏览器不支持该音频格式'
		},
		{
			type: 5,
			meg: '对象缺省src属性'
		}
	]


function errors() {
	if (typeof _default.error == 'function') {
		_default.error(meg);
	}
};

//加载
function loadFile(playStatus) {
	if (!_default.song) {
		return fn.errors(errorMeg[2]);
	}

	//先停止播放
	play(false);
	let song = _default.song[songSelect];
	if (song['src']) {

		//音频格式,如果路径不是 xxx/xxx.mp3 而是一个url路由这时候如果判断? 例如 xxxx.php?sid=1
		// let audioType = song['src'].substr( song['src'].lastIndexOf('.') + 1 );

		control.src = song['src'];
		//判断是否支持当前音频格式
		// if(control.canPlayType( 'audio/'+ audioType)){

		// 	//这里需要判断路径是否真实存在呢?
		// }else{

		// 	return fn.errors(errorMeg[3]);
		// }
	} else {
		return errors(errorMeg[4]);
	}

	//歌曲信息
	elem.cover.style.backgroundImage = 'url("' + song.cover + '")';
	elem.songTitle.innerText = song.title;
	//总时长
	(function getDuration() {
		if (isNaN(control.duration)) {
			setTimeout(getDuration, 80);
		} else {

			elem.countTime.innerText = conversion(control.duration);
		}
	})();
	//是否播放
	play(playStatus);
}


function schedule(status) {
	//是否刷新
	if (status) {
		scheduleTimer = setInterval(function () {
			//已加载完成进度
			if (control.buffered.length > 0)
				elem.cacheSetbacks.style.width = percentage(control.buffered.end(0) / control.duration);
			//当前进度
			elem.thisSetbacks.style.width = percentage(control.currentTime / control.duration);
			elem.thisTime.innerText = conversion(control.currentTime);
		}, 1000);
	} else {
		//停止定时器
		clearInterval(scheduleTimer);
	}
}

//音量控制
function volume(n) {
	control.volume = n || control.volume;
	elem.volume.querySelector('.volume-box i').style.width = percentage(control.volume);
}

//播放开关
const play = function (action) {
	//当前音频是否存在
	if (control.src) {
		//防止快速暂停播放时,浏览器会报错!
		operation = setTimeout(function () {
			if (action) {
				control.play();
				audioBtn.play.className = audioBtn.play.getAttribute('data-off');
			} else {
				control.pause();
				audioBtn.play.className = audioBtn.play.getAttribute('data-on');
			}
			//刷新进度
			schedule(action);
			audioBtn.play.playStatus = !action;
		}, 100);
	}
}

//曲目切换
function switch1(action) {
	(action) ? songSelect++ : songSelect--;
	songSelect = (songSelect >= _default.song.length) ? 0 : (songSelect < 0) ? _default.song.length - 1 : songSelect;
	//立即播放
	loadFile(true);
}

//下一曲
const next = function () {
	switch1(true);
}

//上一曲
const prev = function () {
	switch1(false);
}


//获取元素距离页面边缘的距离
function getOffset(box, direction) {
	let setDirection = (direction == 'top') ? 'offsetTop' : 'offsetLeft';
	let offset = box[setDirection];
	let parentBox = box.offsetParent;
	while (parentBox) {
		offset += parentBox[setDirection];
		parentBox = parentBox.offsetParent;
	}
	parentBox = null;

	return parseInt(offset);
}

//拖动的函数
function moveObj(obj, fn, ready) {
	let X, even, EndX = parseInt(getComputedStyle(obj).width);
	obj.addEventListener('mousedown', function () {
		(ready && ready.before) && ready.before();
		document.onmousemove = function (e) {
			move(e);
		};
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
			(ready && ready.after) && ready.after({
				even: even,
				x: X,
				maxX: EndX
			});
		};
	}, false);

	obj.addEventListener('click', function (e) {
		(ready && ready.before) && ready.before();

		move(e);
		(ready && ready.after) && ready.after({
			even: even,
			x: X,
			maxX: EndX
		});
	}, false);

	function move(e) {
		even = e || window.event;
		X = (e.clientX - getOffset(obj, 'left'));
		X = (X > 0) ? (X > EndX) ? EndX : X : 0;

		(fn) && fn({
			even: even,
			x: X,
			maxX: EndX
		});
	}
}

function percentage(n) {
	n *= 100;
	return ((n > 100) ? 100 : (n < 0) ? 0 : n) + "%";
}

function twoNum(n) {
	return (n > 9) ? n : '0' + n;
}

function conversion(n) {
	return twoNum(~~(n / 60)) + ':' + twoNum(~~(n % 60));
}





export const audioPlay = (setConfig) => {

	//属性替换
	if (typeof (setConfig) == "object") {
		for (let n in setConfig) {
			_default[n] = setConfig[n];
		}
	}

	//不支持audio时
	if (!control) {
		errors(errorMeg[4]);
		return;
	} else {
		//音频加载失败时
		control.onerror = function () {
			errors(errorMeg[0]);
		}
	}

	//获取元素
	let controller = document.querySelector(_default.controller) //最外层容器


	//控制器是否存在
	if (!controller) {
		return errors(errorMeg[1]);
	}

	//获取到元素
	for (let e in _default.elem) {
		elem[e] = controller.querySelector(_default.elem[e]);
	}

	//音频准备就绪时
	control.oncanplay = function () {
		//初始音量
		volume(control.volume);
	}

	//音频结束时
	control.onended = function () {
		switch1(true);
	}

	//进度条拖拽
	let setbacksPer;
	moveObj(elem.setbacks, function (info) {
		//百分比
		setbacksPer = (info.x / info.maxX * 100).toFixed(2);
		//预计拖动的所到达时间
		elem.thisTime.innerText = conversion(~~(control.duration * setbacksPer / 100));
		//百分比的进度条
		elem.thisSetbacks.style.width = setbacksPer + '%';
	}, {
		before: function () {
			//停止定时器
			schedule(false);
		},
		after: function (info) {
			let loadTime = ~~(control.duration * setbacksPer / 100);

			//拖拽时间大于缓存时长,返回已缓存时长-10s
			if (control.buffered.length > 0) {
				control.currentTime = (loadTime > (control.buffered.end(0) - 10)) ? (control.buffered.end(0) - 10) : loadTime;
			}
			//开启定时器
			schedule(true);
		}
	});

	//音量拖拽
	moveObj(elem.volume, function (info) {
		volume((info.x / info.maxX).toFixed(2));
	});

	//按钮组
	audioBtn = {}
	audioBtnFind = elem.audioBtn.querySelectorAll('*');
	for (let b = 0, bL = audioBtnFind.length; b < bL; b++) {
		let btn = audioBtnFind[b],
			btnType = btn.getAttribute('action');

		if (btnType) {
			audioBtn[btnType] = audioBtnFind[b];
		}
	}

	//按钮动作
	elem.audioBtn.addEventListener('click', function (e) {
		let obj = e.target;
		if (obj.getAttribute('action')) {
			switch (obj.getAttribute('action')) {
				//上一曲
				case 'prev':
					prev();
					break;
				//播放按钮
				case 'play':
					play(audioBtn.play.playStatus);
					break;
				//下一曲
				case 'next':
					next()
					break;
				//歌曲菜单
				case 'menu':
					console.log('menu');
					break;
				//音量控制
				case 'volume':
					if (elem.volume.className.match('action')) {
						controller.style = '';
						elem.audioBtn.style = '';
						elem.volume.className = elem.volume.className.replace('action', '');
					} else {
						let width = parseInt(getComputedStyle(elem.volume).width);
						elem.audioBtn.style.marginRight = width + 'px';
						controller.style.paddingRight = parseInt(getComputedStyle(controller).paddingRight) + width + 'px';
						elem.volume.className += ' action';
					}
					break;
				//未定义按钮组
				default:
					console.log('default');
					break;
			}
		}
	}, false);

}
