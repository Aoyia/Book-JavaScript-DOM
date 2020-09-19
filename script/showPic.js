// 迷之代码
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			oldonload();
			func();
		}
	}
}
// 此下注释的是插入img图片和p文本操作
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
function preparePlaceholder() {
	if (!document.getElementById("imagegallery")) {
		return false;
	}
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/5.jpg");
	placeholder.setAttribute("alt", "这是一个图片");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var desctext = document.createTextNode("这是一张美图");
	description.appendChild(desctext);
	var targetElement = document.getElementById("imagegallery");
	insertAfter(placeholder, targetElement);
	insertAfter(description, placeholder);
}
function showPic(whichpic) {
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if (document.getElementById("description")) {
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : " ";
		var description = document.getElementById("description");
		console.log(text);
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text;
		}
	}
	return false;
}

function prepareGallery() {
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function () {
			return showPic(this);

		}
	}
}

// canvas简单使用，图片灰色
function convertToGs() {
	var img = document.getElementById("placeholder");
	img.color = img.src;
	// 储存原版彩色图像

	img.grayscale = createGSCanvas(img);
	// 创建灰板函数createGSCanvas（），创建灰度蒙版

	img.onmouseover = function () {
		this.src = this.color;
	}
	img.onmouseout = function () {
		this.color = this.grayscale;

	}
	img.onmouseout;

}
// 创建灰度版照片的函数
function createGSCanvas(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);

	//注意getImageData只能操作位于与脚本同一个域的图片
	var c = ctx.getImageData(0, 0, img.width, img.height);
	for (let j = 0; j < c.height; j++) {
		for (let i = 0; i < c.width; i++) {
			var x = (i * 4) * c.width + (j * 4);
			var r = c.data[x];
			var g = c.data[x + 1];
			var b = c.data[x + 2];
			c.data[x] = c.data[x + 1] = c.data[x + 2] = (r + g + b) / 3;

		}
	}
}



addLoadEvent(preparePlaceholder);
// 这是插入img和p标签的函数
addLoadEvent(prepareGallery);
addLoadEvent(convertToGs);

