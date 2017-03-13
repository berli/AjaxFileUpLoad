 (function() {
 	/**
 	 * $ 函数，返回获取的节点对象
 	 * @param  string ele 节点
 	 * @return object
 	 */
 	function $(ele) {
 		if (ele.charAt(0) == '#') {
 			return document.getElementById(ele.substring(1));
 		} else if (ele.charAt(0) == '.') {
 			var className = ele.substring(1),
 				all = document.getElementsByTagName('*'),
 				temps = [];
 			for (var i = 0; i < all.length; i++) {
 				if ((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(all[i].className)) {
 					temps.push(all[i]);
 				}
 			}
 			return temps;
 		} else {
 			return document.getElementsByTagName(ele);
 		}
 	}

 	$('form')[0].onsubmit = function(e) {
 		var e = e || window.event;
 		window.event ? e.returnValue = false : e.preventDefault();

 		//实例化 FormData对象
 		var fd = new FormData(this);
 		var xhr = new XMLHttpRequest();
 		xhr.onreadystatechange = callback; // 回调
 		xhr.upload.onprogress = progress; //事件监听器，获取上传的情况


 		xhr.open('post', './core/fileUpLoad.php');
 		xhr.send(fd); //发送数据

 		/**
 		 * 上传成功后的回调函数
 		 */
 		function callback() {
 			if (xhr.readyState == 4 && xhr.status == 200) {
 				eval("var info=" + xhr.responseText); //将json信息转化成js对象
 				$('#user').value = info.user;
 				$('#pass').value = info.pass;
 				$('.imgs')[0].setAttribute("src", info.paths[0]);
 				$('.imgs')[1].setAttribute("src", info.paths[1]);
 				$('.imgs')[2].setAttribute("src", info.paths[2]);
 			}
 		}

 		/**
 		 * 事件监听器，获取上传的情况
 		 */
 		function progress(evt) {
 			var loaded = evt.loaded, //已上传的大小
 				total = evt.total, //总大小
 				per = Math.floor((loaded / total) * 100) + '%'; //转换成百分比
 			$("meter")[0].value = loaded / total;
 			$("span")[0].innerHTML = per;
 		}
 	}
 })();