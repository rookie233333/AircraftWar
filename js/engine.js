
//主函数
var pen;
var lr=0,dp=0;
var bullet_index=0;//控制子弹频率
var index_smallShip=0;
var index_control=true;
var user_score=0;
var bullet_type=0;//道具指数
var bullet_speed=1;//子弹发射速度
var lock=true;//子弹锁
var endPlay;
var bg_url="img/bg_sky1.jpg";
var engineLock=true;//进程锁
window.onload=function(){
	var canvas=document.getElementById("canvas");
	canvas.width=500;
	canvas.height=700;
	pen=canvas.getContext("2d");
	document.onkeydown=function(e){
		var currKey=0,e=e||event;
		keyCode=e.keyCode||e.which||e.charCode;
		keyDown(keyCode);
//		alert(keyCode);
	};
	document.onkeyup=function(e){
		var currKey=0,e=e||event;
		keyCode=e.keyCode||e.which||e.charCode;
		keyUp(keyCode);
	};

	//启动游戏
	playGame();
}
function playGame(){
	var pause=document.getElementsByClassName("pause")[0];
	var play=document.getElementsByClassName("play")[0];
	playBgm();
	if(engineLock){
		var start=document.getElementsByClassName("start")[0];
		var my_form=document.getElementsByClassName("bg_select")[0];
		var my_select=document.getElementsByClassName("select")[0];
		Sinterface();
		start.onclick=function(){
			bg_url=my_select.value;
			start.style.display="none";
			my_form.style.display="none";
			engineLock=false;
		}
	}else if(!engineLock){
		//展示角色
		showRoles();
		pause.style.display="block";
	}
	//开始暂停
	pause.onclick=function(){
		clearTimeout(endPlay);
		pause.style.display="none";
		play.style.display="block";
		pauseBgm();
	}
	play.onclick=function(){
		playGame();
		pause.style.display="block";
		play.style.display="none";
		playBgm();
	}
	//游戏结束判定
	if(roles.userShip.blood<=1){
		alert("GAME OVER!\n你的得分："+Math.floor(user_score/10));
		clearTimeout(endPlay);
		playBoom("music/endgame.mp3");
		var r=confirm("TRY AGAIN?");
		if(r){
			window.location.href="";//网页重载
		}else window.close();
	}else if(roles.enemyShip_boss!=null && roles.enemyShip_boss.blood_boss<=1){
		playBoom("music/gameover.mp3");
		alert("CONGRATULAION!\n你的得分："+Math.floor(user_score/10));
		clearTimeout(endPlay);
		var r=confirm("TRY AGAIN?");
		if(r){
			window.location.href="";
		}else window.close();
	}
	endPlay=setTimeout("playGame()",40);
}
