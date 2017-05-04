# 播放器 ui

## 初始化

```
let options = {
}

let player = new LCplayer(id, options);
```

## 目前有的组件
1. 播放
2. 暂停
3. 全屏
4. 进度
5. 直播状态
6. 弹幕开关

## 组件的回调
1. 弹幕开关
```

player.on('danmachange', function() {});

```
2. 视频相关回掉
```

video.addEventListener('play', function() {});
video.addEventListener('pause', function() {});
...

```

# 坑
1. ios 的 video.currentTime 抖动
2. ios 下  playing 事件， android 下 waiting 事件 
3. autoplay 事件失效，使用 play() 事件也不可以
4. ios 下 ， 首次设置 currentTime 有误
5. android 下， waiting 事件


# 说明
1. 因为大多数手机不支持 autoplay 暂时不支持设置这个参数
2. 兼容性的话，主要考虑这几个方面
* 移动端浏览器的坑不比 pc 的少，尤其是各个手机厂商会优化自己的浏览器，浏览器厂商会让自己的浏览器更。。。（这样做的结果就是，有的浏览器下，不论视频是否设置 controls，视频都会有控制条，z-index最高...
* ios 和 安卓对video 标签实现也有不少不一样的地方， 比如，duration属性， playing事件...（总结后，会放在 issue 中

