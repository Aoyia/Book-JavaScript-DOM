function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if (placeholder.nodeName != "IMG") return false;
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
	return true;
}

function prepareGallery() {
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (let i = 0; i < links.length; i++) {
		links[i].onclick = function () {
			return !showPic(this);
		}
	}
}
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

addLoadEvent(prepareGallery);
