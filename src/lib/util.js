import black from './black.js';

let _ = {
	formatTime(num) {
		num = num / 100;
		let integer = Math.floor(num);
		if(integer < 10) {
			integer = '0' + integer;
		}
		let decimal = (num - integer).toFixed(2).slice(2, 4);
		return integer + ':' + decimal;
	},
	attr(node, attr, value) {
		if(value !== undefined) {
			return node.setAttribute(attr, value);
		}else{
			return node.getAttribute(attr) || '';
		}
	},
	removeAttr(node, attrs) {
		attrs = Array.isArray(attrs) ? attrs: [attrs];
		attrs.forEach(item => {
			node.removeAttribute(item);
		})
	},
	hide(nodes) {
		nodes.forEach((item, i) => {
			item.style.display = 'none';
		})
	},
	show(nodes) {
		nodes.forEach((item, i) => {
			item.style.display = 'inline-block';
		})
	},
	css(node, obj) {
		for(let i in obj) {
			node.style[i] = obj[i];
		}
	},
	addClass(node, className) {
		let oldClass = _.attr(node, 'class');
		let newClass = oldClass? oldClass + '  ' + className: className;
		_.attr(node, 'class', newClass);
	},
	removeClass(node, className) {
		let oldClass = _.attr(node, 'class');
		let newClass = oldClass.replace(className, '').replace('  ', ' ');
		_.attr(node, 'class', newClass);
	},
	whichDevice(ver) {
		let result = ver.match(/(iphone|ipod|ipad|android)/i)? 1: 0;
	  return result;
	},
	isBlack(ua) {
		let result = false;
		let len = black.length;
		for(let i = 0; i < len; i++) {
			let reg = new RegExp(black[i], 'i');
			if(reg.test(ua)) {
				result = true;
				break;
			}
		}
		return result;
	}
}
export default _;
