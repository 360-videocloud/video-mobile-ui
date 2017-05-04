import base from './base.js';
import _ from '../lib/util.js';
import Hammer from '../lib/hammer.js'; 

export default class MobileVideo extends base{
	constructor(player) {
		super(player);
		this._LCplayer.orientation = window.orientation;
	}
	addAllEvent() {
		this.baseEvent.push([window, 'orientationchange', 'orientationChange']);
		this.addEvent(this.baseEvent);
		this.createHammer();
	}
	removeAllEvent() {
		Object.keys(this.uiMap).forEach(item => {
			this[item].destroy();
		})
	}
	createHammer() {
		this.uiMap = {
			playerUI_h: this._playerUI,
			play_h: this._ui.middlePlay,
			pause_h: this._ui.middlePause,
			bottom_h: this._ui.uiLayoutBottom,
			danma_h: this._ui.danma,
			screen_h: this._ui.screen,
			// progressBar_h: this._ui.progressBar,
			progressBarTrack_h: this._ui.progressBarTrack,
		}
		Object.keys(this.uiMap).forEach(item => {
			this[item] = new Hammer(this.uiMap[item])
		})
		this.addMobiEvent();
	}
	addMobiEvent() {
		this.playerUI_h.on('tap', this.trans('mobiTap'));
		// 直播情况下无需加载的事件
		if(!this._LCplayer.live) {
			this.playerUI_h.on('swipe', this.trans('swipeProcess'));
			this.progressBarTrack_h.on('pan', this.trans('panProcess'));
			this.progressBarTrack_h.on('panstart', this.trans('tapProcess'));
			this.progressBarTrack_h.on('tap', this.trans('tapProcess'));
			this.bottom_h.on('swipe', this.trans('bottomSwipe'));
		}
		this.play_h.on('tap', this.trans('playOrPause'));
		this.pause_h.on('tap', this.trans('playOrPause'));
		this.danma_h.on('tap', this.trans('mobiDanmaChange'));
		this.screen_h.on('tap', this.trans('mobiScreenChange'));
	}

	mobiTap(e) {
		if(e.target === this._playerUI) {
			this.initialUI();
			!this._video.paused && this.addUITimer();	
		}else if(e.target === this._ui.uiLayoutMiddle) {
			this.hideInitialUI();
		}
		
	}
	bottomSwipe(e) {
		e.srcEvent.stopPropagation();
	}
	// 拖动屏幕最多 1 min
	swipeProcess(e) {
		if(!this._LCplayer.start) {
			return;
		}
		let changeTime = e.deltaX / this._LCplayer.offsetWidth * 60;

		let time = this._video.currentTime + changeTime;
		if(time > this._video.duration) {
			changeTime = this._video.duration - this._video.currentTime;
			this._video.currentTime = this._video.duration;
		}else if(time < 0) {
			changeTime = -this._video.currentTime;
			this._video.currentTime = 0;
		}else{
			this._video.currentTime = time;
		}
		changeTime = Math.floor(changeTime);
		this._ui.middleTip.textContent = changeTime >= 0? `+${changeTime}s`: `${changeTime}s`;
		this.play();
		this.showTip();
		this._showTipTimer && clearTimeout(this._showTipTimer);
		this._showTipTimer = setTimeout(() => {
			this.hideTip();
		}, 300);
		this._LCplayer.currentTime = this._video.currentTime;
		this.progressCss();
	}
	panProcess(e) {
		if(!this._LCplayer.start) {
			return;
		}
		this.clearUITimer();
		if(!this._LCplayer.startTime) {
			this._LCplayer.startTime = this._video.currentTime;
		}
		let progressWidth = this._LCplayer.offsetWidth - 9.5 * this._LCplayer.fontSize;
		let dragX = e.deltaX / progressWidth * this._video.duration;
		let time = (this._LCplayer.startTime + dragX).toFixed(2);

		this._video.currentTime = time < 0? 0: time > this._video.duration? 
			this._video.duration: time;
		this._LCplayer.currentTime = this._video.currentTime;
		if(e.isFinal) {
			this._LCplayer.startTime = null;
			this.play();
			this.addUITimer();
		}

		this.progressCss();
	}
	tapProcess(e) {
		if(!this._LCplayer.start) {
			return;
		}
		let progressWidth = this._LCplayer.offsetWidth - 9.5 * this._LCplayer.fontSize;
		this._video.currentTime = (e.changedPointers[0].clientX - 6 * this._LCplayer.fontSize)/ progressWidth * this._video.duration;
		this._LCplayer.currentTime = this._video.currentTime;
		this.play();
		this.progressCss();
	}
	mobiDanmaChange() {
		 this._LCplayer.danmaOn = !this._LCplayer.danmaOn;
	   this.trigger('danmachange', this._LCplayer.danmaOn);
	   if(this._LCplayer.danmaOn) {
	       _.show([this._ui.danmaOn]);
	       _.hide([this._ui.danmaOff]);
	   }else{
	       _.hide([this._ui.danmaOn]);
	       _.show([this._ui.danmaOff]);
	   }
	}
	mobiScreenChange() {
		if(!this._LCplayer.fullscreen) {
			this.mobiEnlargeScreen();
		}else{
			this.mobiNarrowScreen();
		}
		this.progressCss();
	}
	mobiEnlargeScreen() {
		if(!this._LCplayer.start) return;
		_.show([this._ui.screenShrink]);
		_.hide([this._ui.screenEnlarge]);
		
		// this._LCplayer.fontSize *= 1.5;
		// _.css(this._LCplayer, {
		// 	fontSize: this._LCplayer.fontSize + 'px'
		// }); 

		this._LCplayer.fullscreen = true;
		this.fullscreenCss({width: '100%', height: '100%', position: 'fixed'});
	}
	mobiNarrowScreen() {
		_.hide([this._ui.screenShrink]);
		_.show([this._ui.screenEnlarge]);
		// this._LCplayer.fontSize /= 1.5;
		this._LCplayer.fullscreen = false;
		this.fullscreenCss({width: this._options.width, height: this._options.height, position: 'relative'});
	}
	orientationChange(e) {
		let angle = Math.abs(this._LCplayer.orientation - window.orientation);
		if(angle === 180 || angle === 0) {return;}
		this._LCplayer.orientation = window.orientation;
		// if(window.orientation == 0 || window.orientation == 180) {
		// 	this._LCplayer.fontSize *= 1.5;
		// }else{
		// 	this._LCplayer.fontSize /= 1.5;
		// }
		if(this._LCplayer.fullscreen) {
			this.fullscreenCss({width: '100%', height: '100%', position: 'fixed'})
		}else{
			this.fullscreenCss({width: this._options.width, height: this._options.height, position: 'relative'});
		}
	}
}