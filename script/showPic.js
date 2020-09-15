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
			console.log(description.firstChild.nodeValue);
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
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

