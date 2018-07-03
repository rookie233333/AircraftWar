//通用函数定义
Array.prototype.remove = function(obj) {    
    for (var i = 0; i < this.length; i++) {    
        if (this[i] === obj) {    
            this.splice(i, 1);    
            break;    
        }    
    }    
} 

function drawImage(pen,url,x,y){
	var img=new Image();
	img.src=url;
	img.onload=function(){
		pen.drawImage(img,x,y);
	}
}

function drawFlipImage(pen,url,x,y){//旋转
		var img=new Image();
		img.src=url;
		img.onload=function(){
			pen.save();
			pen.rotate(90*Math.PI/180);//180*Math.PI/180
			pen.drawImage(img,-x-img.width, -y-img.height);
			pen.restore();
		}	
}

function drawImageFrame(pen,url,sx,sy,sw,sh,dx,dy,dw,dh){
		var img=new Image();
		img.src=url;
		img.onload=function(){
			pen.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
		}	
}
//爆炸音效
function playBoom(url){
	var boomMusic=document.getElementById("boomMusic");
	boomMusic.src=url;
	boomMusic.play();
}
//BGM
function playBgm(){
	var bgm=document.getElementById("bgm");
	bgm.play();
}
function pauseBgm(){
	var bgm=document.getElementById("bgm");
	bgm.pause();
}

//计算ship之间距离，返回水平速度
function distance(ux,uy,ex,ey,speed){
	if(ux<ex)
		return -Math.abs(ux-ex)/(Math.abs(uy-ey)/speed);
	else if(ux>ex)
		return Math.abs(ux-ex)/(Math.abs(uy-ey)/speed);
	else return 0;
}
//画半圆
function drawArc(mx,my,ox,oy,r,speed){
	if(my<oy){
		return Math.sqrt(Math.abs(r*r-Math.pow((Math.abs(my-oy)-speed),2)))-Math.abs(mx-ox);
	}
	else return Math.sqrt(Math.abs(r*r-Math.pow((Math.abs(my-oy)+speed),2)))-Math.abs(mx-ox);
}