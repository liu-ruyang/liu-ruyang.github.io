/*
	面向过程的思维：
	1 鼠标点击document文档 生成子弹
	2 子弹往上面移动，移动到鼠标点击位置
	3 当子弹移动到点击位置的时候，生成烟花碎片
	4 让烟花碎片分散开 形成烟花效果
*/

document.onclick = function(ee) {
	let e = ee || window.event; //为了提高兼容性
	/* 
		获取鼠标点击位置的横、纵坐标（x，y),且是全局变量
	 */
	let x = e.clientX;
	let y = e.clientY;
	//console.log(x, y);
	//console.log(this);  //this作用域 指代事件
	//console.log(e);  //实参列表

	// 获取body的高度,且是全局变量
	let h = document.body.clientHeight;
	//console.log(h);

	/* 1 鼠标点击，生成子弹 */
	//创建一个div元素
	let oDiv = document.createElement("div");
	oDiv.className = "firework";
	oDiv.style.background = color1();
	//把div添加到body中
	document.body.appendChild(oDiv);

	// oDiv.setAttribute("style","width: 100px");
	// oDiv.setAttribute("id","odiv");
	/*
		烟花的实时位置
	*/
	oDiv.style.left = x + "px";
	oDiv.style.top = h + "px";

	/* 2 子弹往上移动，移动到鼠标点击的位置 */
	// 子弹往上移动的速度值
	let speed = 10;

	// console.log(oDiv.offsetParent);
	//console.log(oDiv.offsetTop);

	/* 定时器编号 */
	let timer;

	timer = setInterval(function() {
		// 子弹的新位置等于原来的位置减去速度值
		oDiv.style.top = (oDiv.offsetTop - speed) + 'px'; //oDiv.style.top是一个字符串，oDiv.offsetTop是一个数字值
		// console.log(oDiv.style.top);
		if (oDiv.offsetTop <= y) {
			oDiv.style.top = y + "px";
			
			//清除定时器
			clearInterval(timer);
			//清除烟花,依靠父元素清除自身
			document.body.removeChild(oDiv);
			/* let a = oDiv.parentNode;
			console.log(a); 
			//a.innerHTML = '';
			console.log(a); */
			
			//生成烟花,自定义函数createFires（）
			createFires(x, y, h);
		}
		console.log(timer);
	}, 1000/60);
}

//生成烟花函数
function createFires(x, y, h) {
	let n = Math.random()*10 + 10;  //每一炮烟花粒数
	let fires = [];
	for(let i = 0; i < n; i++){
		fires[i] = document.createElement("div");
		fires[i].className = 'fire';
		fires[i].style.background = color1();
		fires[i].style.left = x + 'px';
		fires[i].style.top = y + "px";
		//给每个烟花添加速度值(自定义的属性)
		fires[i].speedX = Math.random() * 15 - 7.5;  //负值则向左移动，正值则向右移动
		fires[i].speedY = Math.random() * 15 - 7.5;  //负值则向上移动，正值则向下移动
		document.body.appendChild(fires[i]);
	}
	let timer;
	timer = setInterval(function(){
		for(let i = 0; i < n; i++){
			fires[i].style.left = fires[i].offsetLeft + fires[i].speedX + "px";
			fires[i].style.top = fires[i].offsetTop + fires[i].speedY + "px";
			fires[i].speedY += 0.3;  //重心引力
			
			//清除超过边框的烟花
			if(fires[i].offsetTop>h || fires[i].offsetLeft<0 || fires[i].offsetLeft>document.body.clientWidth){
				document.body.removeChild(fires[i]);
			}
			
		}
	},1000/60)
}

//生成随机颜色
function color1(){
	let r = Math.floor(Math.random()*256);
	let g = Math.floor(Math.random()*256);
	let b = Math.floor(Math.random()*256);
	return "rgb("+r+","+g+","+b+ ")";
}

//十六进制颜色
function color2(){
	return "#"+function(color){
		return color
	}();  //匿名函数要想实现自执行，只需要在结尾加一个括号
}