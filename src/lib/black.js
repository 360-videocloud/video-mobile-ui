const black = ['eva-al00','1505-a01', 'mt7-cl00', 'qhbrowser', 'ucbrowser'];
export default black;


// 记录兼容性
// 魅族 mz-m570c （pro6) 自带浏览器下， ui层被接管，chrome与微信无问题
// 奇酷 8692-m02, 微信中， 无法小屏播放， chrome 与 自带浏览器无问题
// 奇酷 8681-m02, 微信中， 无法小屏播放， 360浏览器被接管，通过 qhbrowser 来判别
// 乐视 letv x500, 微信中，无法小屏播放，自带浏览器，ui层被接管 可以标识是否是安卓自带浏览器
// 锤子 sm901, 微信中， 无法小屏播放， 自带浏览器ui被接管 无法标识是否是安卓自带浏览器

// 360 浏览器普遍兼容性不太好， ua 中判别字段是 qhbrowser, 
// uc 浏览器接管 ucbrowser
// 搜狗浏览器无问题
// opera mini 有问题
// 百度浏览器 有问题
// 猎豹浏览器 有
// 搜狗浏览器 无
// 火狐浏览器 有
// qq浏览器 有

// 可以参考 iqiyi 进行一波优化
// * 隐藏 video 的所有组件（如果隐藏不掉，背景条， 可以试试， 将背景设置为 opacity:0
// * video z-index 问题 -webkit-transform: translateZ(0) 

// 后期解决思路， 
// 先判断浏览器， 针对不同浏览器， 查找解决方式， 没有的话， 就拉黑，微信浏览器
// 判断手机机型，且是自带浏览器，然后 pass 掉