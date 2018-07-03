var roles={};

roles.background={
	y:0,
	show:function(pen,url){
		drawImageFrame(pen,url,0,0,1080,1920,0,this.y,500,700);
		drawImageFrame(pen,url,0,0,1080,1920,0,this.y-700,500,700);
		this.y+=5;
		if(this.y>700)this.y=0;
	}
}
//开始界面
roles.startInterface={
	y:0,
	show:function(pen){
		drawImageFrame(pen,"img/bg_sky2.jpg",0,0,1080,1920,0,this.y,500,700);
		drawImageFrame(pen,"img/bg_sky2.jpg",0,0,1080,1920,0,this.y-700,500,700);
		this.y+=5;
		if(this.y>700)this.y=0;
	}
}


//创建UserShip构造函数
function UserShip(x,y){
	this.x=x;
	this.y=y;
	this.blood=11;
	this.lock=true;
}
UserShip.prototype.show=function(pen){
	drawImageFrame(pen,"img/user_ship1.png",0,0,1197,1197,this.x,this.y,50,50);
}
UserShip.prototype.move=function(lr,dp){
	this.x+=lr*5;
	this.y+=dp*5;
	if(this.x<=0)this.x=0;
	else if(this.x>=450)this.x=450;
	if(this.y<=0)this.y=0;
	else if(this.y>=650)this.y=650;
	if(this.lock){//传说中的无敌模式
		if(this.x==0&&this.y==0){
			alert("不愧是程序猿\n你无敌了!");
			this.lock=false;
		}
	}else if(!this.lock){
		if(this.blood<11){
			this.blood=11;
		}
	}
	
	//bullet_enemy碰撞检测
	for(var i=0;i<roles.bullet_enemy.length;i++){
		var d=Math.sqrt(Math.pow((this.x+25-roles.bullet_enemy[i].x-10),2) + Math.pow((this.y+25-roles.bullet_enemy[i].y-10),2));
		if(d<=25){
			roles.explode[roles.explode.length] =new Explode(this.x,this.y);
			roles.bullet_enemy.remove(roles.bullet_enemy[i]);
			playBoom("music/boom2.wav");
			this.blood--;
		}
	}
	//enemyShip_small碰撞检测
	for(var i=0;i<roles.enemyShip_small.length;i++){
		var d=Math.sqrt(Math.pow((this.x+25-roles.enemyShip_small[i].x-15),2) + Math.pow((this.y+25-roles.enemyShip_small[i].y-15),2));
		if(d<=40){
			roles.explode[roles.explode.length] =new Explode(this.x,this.y);
			roles.enemyShip_small.remove(roles.enemyShip_small[i]);
			playBoom("music/boom2.wav");
			this.blood--;
		}
	}
	//enemyShip_bigger碰撞检测
	for(var i=0;i<roles.enemyShip_bigger.length;i++){
		var d=Math.sqrt(Math.pow((this.x+25-roles.enemyShip_bigger[i].x-40),2) + Math.pow((this.y+25-roles.enemyShip_bigger[i].y-33),2));
		if(d<=58){
			playBoom("music/boom1.mp3");
			roles.explode[roles.explode.length] =new Explode(this.x,this.y);
			roles.enemyShip_bigger.remove(roles.enemyShip_bigger[i]);
			this.blood-=5;
		}
	}
	//enemy_boss碰撞检测
	if(roles.enemyShip_boss!=null){
		var d=Math.sqrt(Math.pow((this.x+25-roles.enemyShip_boss.x-145),2) + Math.pow((this.y+25-roles.enemyShip_boss.y-71),2));
		if(d<=96){
			playBoom("music/boom2.wav");;
			roles.explode[roles.explode.length] =new Explode(this.x,this.y);
			this.blood==0;
		}
	}
}
UserShip.prototype.fire=function(){
	if(bullet_type==0){
		roles.bullet[roles.bullet.length]=new Bullet(this.x+23,this.y-10,-5*bullet_speed,0);
	}else if(bullet_type==1){
		roles.bullet[roles.bullet.length]=new Bullet(this.x+5,this.y-10,-5*bullet_speed,0);
		roles.bullet[roles.bullet.length]=new Bullet(this.x+23,this.y-10,-5*bullet_speed,0);
		roles.bullet[roles.bullet.length]=new Bullet(this.x+42,this.y-10,-5*bullet_speed,0);
	}	
}
roles.userShip=new UserShip(225,650);
//血条
function UserBlood(){
	
}
UserBlood.prototype.show=function(pen,blood){
	for(var i=0;i<parseInt(blood/2);i++)
		drawImage(pen,"img/blood.png",5+i*42.5,8);
}
roles.userBlood=new UserBlood(roles.userShip.blood);
//创建EnemyShip
function EnemyShip(x,y,ship_type){
	this.x=x;
	this.y=y;
	this.sign=0;
	this.index_small=20;//小飞船飞行路径控制
	this.small_random=1;
	this.blood_bigger=20*bullet_speed;
	this.blood_boss=1000;
//	this.sign_smallShip=0;//控制小飞船类型
//	this.sign_biggerShip=2;//控制大飞船类型
	this.ship_type=ship_type;//飞船类型
	this.stop=false;//判断飞船是否移动
}
EnemyShip.prototype.show=function(pen){
	switch(this.ship_type){
		case "B1":drawImage(pen,"img/bigger_ship1.png",this.x,this.y);break;
		case "B2":drawImage(pen,"img/bigger_ship2.png",this.x,this.y);break;
		case "B3":drawImage(pen,"img/bigger_ship3.png",this.x,this.y);break;
		case "S1":drawImage(pen,"img/small_ship1.png",this.x,this.y);break;
		case "S2":drawImage(pen,"img/small_ship2.png",this.x,this.y);break;
		case "S3":drawImage(pen,"img/small_ship3.png",this.x,this.y);break;
		case "S4":drawImage(pen,"img/small_ship4.png",this.x,this.y);break;
		case "S5":drawImage(pen,"img/small_ship5.png",this.x,this.y);break;
		case "BOSS":drawImage(pen,"img/boss.png",this.x,this.y);break;
	}
}
EnemyShip.prototype.move_boss=function(speed,height){
	if(this.y<=height)
		this.y+=speed;
	else this.stop=true;
	//碰撞检测
	for(var i=0;i<roles.bullet.length;i++){
		var d=Math.sqrt(Math.pow((this.x+150-roles.bullet[i].x-2),2) + Math.pow((this.y+72-roles.bullet[i].y),2));
		if(d<=75){
			roles.explode[roles.explode.length] =new Explode(this.x+130,this.y+95);
//			roles.enemyShip_small.remove(this);
			roles.bullet.remove(roles.bullet[i]);
			this.blood_boss--;
			if(this.blood_boss<=0)
				roles.enemyShip_boss=null;
		}
	}
}
EnemyShip.prototype.move_bigger=function(speed,height){
	if(this.sign<=300){
		if(this.y<=height)
			this.y+=speed;
		else this.stop=true;
//			console.log("debug");
	}else{
		this.y+=3;
	}
	this.sign++;
	for(var i=0;i<roles.bullet.length;i++){
		var d=Math.sqrt(Math.pow((this.x+40-roles.bullet[i].x-2),2) + Math.pow((this.y+33-roles.bullet[i].y),2));
		if(d<=33){
//			console.log("debug");
			this.blood_bigger--;
			roles.explode[roles.explode.length] =new Explode(this.x+40,this.y+15);
//			roles.enemyShip_small.remove(this);
			roles.bullet.remove(roles.bullet[i]);
			if(this.blood_bigger<=0){
				playBoom("music/boom1.mp3");
				roles.enemyShip_bigger.remove(this);
				if(this.ship_type=="B2"){
					var type=Math.floor(Math.random()*2+1);
					var offset=Math.random()*2-1;
					roles.prop[roles.prop.length]=new Prop(this.x,this.y,type,offset);
				}
			}
		}
	}
	//清除biggerShip
	if(this.y>=800)roles.enemyShip_bigger.remove(this);
}
EnemyShip.prototype.move_small=function(speed){
	if(this.index_small>=20){
		this.small_random=5-Math.random()*10;
		this.index_small=0;
	}
	this.index_small++;
	this.x+=speed;
	this.y+=this.small_random;
//	console.log(drawArc(this.x,this.y,0,200,100+this.small_random,speed));
//	this.x+=drawArc(this.x,this.y,0,200,100,speed);
//	this.y+=speed;

	if(this.x>550||this.x<-50){
		roles.enemyShip_small.remove(this);
	}
	//碰撞检测
	for(var i=0;i<roles.bullet.length;i++){
		var d=Math.sqrt(Math.pow((this.x+15-roles.bullet[i].x-2),2) + Math.pow((this.y+15-roles.bullet[i].y),2));
		if(d<=15){
//			console.log("debug");
			playBoom("music/smallShipBoom.wav");
			roles.explode[roles.explode.length] =new Explode(this.x,this.y);
			roles.enemyShip_small.remove(this);
			roles.bullet.remove(roles.bullet[i]);
		}
	}

}
EnemyShip.prototype.fire_bigger=function(fire_type){
	switch(fire_type){
		case 1:
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+35,this.y+50,6,0,"L5");break;
		case 2:
			var e_speed=4;
			roles.bullet_enemy[roles.bullet_enemy.length]=new Bullet_enemy(this.x+35,this.y+50,e_speed,
			distance(roles.userShip.x+25,roles.userShip.y+25,this.x+11,this.y+25,e_speed),"W");break;
		case 3:
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+35,this.y+50,6,-1);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+35,this.y+50,6,0);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+35,this.y+50,6,1);break;
	}



}
EnemyShip.prototype.fire_boss=function(fire_type){
//	var e_speed=4;
//	roles.bullet_enemy[roles.bullet_enemy.length]=new Bullet_enemy(this.x+11,this.y+25,e_speed,
//		distance(roles.userShip.x+25,roles.userShip.y+25,this.x+11,this.y+25,e_speed),"R");
	switch(fire_type){
		case 1:
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+70,this.y+130,2,-1.2);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+100,this.y+130,2,-0.6);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+130,this.y+130,2,0);//中间
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+160,this.y+130,2,0.6);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+190,this.y+130,2,1.2);break;
		case 2:
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+50,this.y+130,2,0,"L2");
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+210,this.y+130,2,0,"L2");
			var e_speed=Math.random()*5+1;
			var e_offset=Math.random()*2+1;
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+70,this.y+130,e_speed-1,e_offset-2);
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+100,this.y+130,e_offset-2,-e_speed+5);
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+130,this.y+130,e_offset+4,e_offset/2);//中间
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+160,this.y+130,e_offset-2,-e_speed+3);
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+190,this.y+130,e_speed+1,e_offset-2);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+70,this.y+130,e_speed+1,e_offset-3);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+100,this.y+130,e_speed-1,-e_speed+2);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+130,this.y+130,e_offset+1.5,e_offset/2);//中间
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+160,this.y+130,e_offset+1,-e_speed-2);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+190,this.y+130,e_speed-2,e_offset+1);break;
		case 3:
			var e_speed=Math.random()*5+1;
			var e_offset=Math.random()*3+1;
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+70,this.y+130,e_speed,e_offset);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+100,this.y+130,e_speed+2,-e_speed-2);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+130,this.y+130,e_offset+1.6,e_offset/2);//中间
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+160,this.y+130,e_offset+1.2,-e_speed+1.5);
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+190,this.y+130,e_speed,e_offset-2);
			if(lock){
				roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+70,this.y+130,2,0,"FA1","true");
				roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+190,this.y+130,2,0,"FA1","true");
				lock=false;
			}
			break;
		case 4:
			var e_speed=Math.random()*5+1;
			var e_offset=Math.random()*3+1;
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+70,this.y+130,e_speed,e_offset);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+100,this.y+130,e_speed+2,-e_speed+2);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+130,this.y+130,e_offset,e_offset/2);//中间
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+160,this.y+130,e_offset+1,-e_speed-2);
			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+190,this.y+130,e_speed+1.4,e_offset+1);
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+45,this.y+130,8,0,"L5");
//			roles.bullet_enemy[roles.bullet_enemy.length] = new Bullet_enemy(this.x+215,this.y+130,8,0,"L5");break;
	}
//	console.log(this.blood_boss);
	
	
}
roles.enemyShip_small=new Array();
roles.enemyShip_bigger=new Array();

//enemy发射子弹构造函数
function Letshoot(){
	this.bullets=1;
}
Letshoot.prototype.S_bigger=function(){
//		alert("debug");
	if(this.bullets%2==0&&this.bullets<=6){
		for(var i=0;i<roles.enemyShip_bigger.length;i++){
			if(roles.enemyShip_bigger[i].stop){
				roles.enemyShip_bigger[i].fire_bigger(1);
			}
		}
	}
	if(this.bullets%2==0&&this.bullets<=28&&this.bullets>=24&&user_score>=500){
		for(var i=0;i<roles.enemyShip_bigger.length;i++){
			if(roles.enemyShip_bigger[i].stop){
				roles.enemyShip_bigger[i].fire_bigger(2);
			}
		}
	}
	if(this.bullets<=17&&this.bullets>=15&&user_score>=1000){
		for(var i=0;i<roles.enemyShip_bigger.length;i++){
			if(roles.enemyShip_bigger[i].stop){
				roles.enemyShip_bigger[i].fire_bigger(3);
			}
		}
	}
	this.bullets++;
	if(this.bullets>=30){
		this.bullets=1;
	}
}
Letshoot.prototype.S_boss=function(){
	if(roles.enemyShip_boss!=null&&roles.enemyShip_boss.stop){
		if(roles.enemyShip_boss.blood_boss>=950){
			if(this.bullets<=10){
				roles.enemyShip_boss.fire_boss(1);
			}
			this.bullets++;
		}else if(roles.enemyShip_boss.blood_boss>=900){
			if(this.bullets%10==0){
				roles.enemyShip_boss.fire_boss(2);
			}
			
//			if(this.bullets>=16)this.bullets=29;
			this.bullets++;
		}else if(roles.enemyShip_boss.blood_boss>=700){
//			alert(this.bullets);
			if(this.bullets<=15){
//				alert("debug");
				roles.enemyShip_boss.fire_boss(3);
			}
			this.bullets++;
		}else if(roles.enemyShip_boss.blood_boss>=500){
			if(this.bullets<=20){
				roles.enemyShip_boss.fire_boss(4);
			}
			this.bullets++;
		}else if(roles.enemyShip_boss.blood_boss>=400){
			if(this.bullets<=10){
				roles.enemyShip_boss.fire_boss(1);
			}
			this.bullets++;
		}else{
			if(this.bullets<=10){
				roles.enemyShip_boss.fire_boss(1);
			}
			if(this.bullets<=15){
				roles.enemyShip_boss.fire_boss(3);
				roles.enemyShip_boss.fire_boss(3);
			}
			this.bullets++;
		}
		if(this.bullets>30){
			this.bullets=1;
			lock=true;
		}
	}
}
roles.letshoot = new Letshoot(); 

//创建放出飞机的构造函数
function Letgo(){
	
}
Letgo.prototype.show_smallShip=function(){
	var type=Math.floor(Math.random()*5+1);
	for(var i=0;i<5;i++){
		var ey=(Math.random()*150)+100;
		roles.enemyShip_small[roles.enemyShip_small.length]=new EnemyShip(0,ey,"S"+type);
	}
//	alert(type);
}
Letgo.prototype.show_biggerShip=function(){
	var type1=Math.floor(Math.random()*3+1);
	var type2=Math.floor(Math.random()*3+1);
	var type3=Math.floor(Math.random()*3+1);
	roles.enemyShip_bigger[roles.enemyShip_bigger.length]=new EnemyShip(50,0,"B"+type1);
	roles.enemyShip_bigger[roles.enemyShip_bigger.length]=new EnemyShip(200,0,"B"+type2);
	roles.enemyShip_bigger[roles.enemyShip_bigger.length]=new EnemyShip(350,0,"B"+type3);
}
Letgo.prototype.show_bossShip=function(){
	roles.enemyShip_boss =new EnemyShip(110,0,"BOSS");
}
roles.letgo=new Letgo();

//创建Bullet构造函数(user使用)
function Bullet(x,y,speed,offset){
	this.x=x;
	this.y=y;
	this.speed=speed;
	this.offset=offset;
}
Bullet.prototype.show=function(pen,url){
	drawImage(pen,url,this.x,this.y);
}
Bullet.prototype.move=function(){
	this.y+=this.speed;
	this.x+=this.offset;
	if(this.y<-100||this.y>800||this.y>roles.userShip.y+25)roles.bullet.remove(this);
}
Bullet.prototype.move_follow=function(offset){//跟踪导弹
	this.y+=this.speed;
	this.x+=offset;
	if(this.y<-100||this.y>800||this.y>roles.userShip.y+25)roles.bullet.remove(this);
}
roles.bullet=new Array();

//创建Bullet_enemy构造函数
function Bullet_enemy(x,y,speed,offset,type,a){
	this.x=x;
	this.y=y;
	this.speed=speed;
	this.offset=offset;
	this.type=type;
	this.a=a;
	this.i=1;
}
Bullet_enemy.prototype.show=function(pen){
	switch(this.type){
		case "W":drawImage(pen,"img/white_bullet.png",this.x,this.y);break;
		case "B1":drawImage(pen,"img/bomb1.png",this.x,this.y);break;
		case "B2":drawImage(pen,"img/bomb2.png",this.x,this.y);break;
		case "L2":drawImage(pen,"img/laser2.png",this.x,this.y);break;
		case "L3":drawImage(pen,"img/laser3.png",this.x,this.y);break;
		case "L4":drawImage(pen,"img/laser4.png",this.x,this.y);break;
		case "L5":drawImage(pen,"img/laser5.png",this.x,this.y);break;
		case "FL1":drawImage(pen,"img/flashBall1.png",this.x,this.y);break;
		case "FL2":drawImage(pen,"img/flashBall2.png",this.x,this.y);break;
		case "FA1":drawImage(pen,"img/fastBall1.png",this.x,this.y);break;
		case "FA2":drawImage(pen,"img/fastBall2.png",this.x,this.y);break;
		default:drawImage(pen,"img/red_bullet.png",this.x,this.y);
	}
}
Bullet_enemy.prototype.move=function(){
	switch(this.a){
		case "true":this.y+=this.speed*this.i/3;
		default:this.y+=this.speed;
	}
	this.x+=this.offset;
	this.i++;
//	if(this.i>=100)this.i=100;
	if(this.y<-10||this.y>710||this.x<-10||this.x>510)roles.bullet_enemy.remove(this);
}
roles.bullet_enemy=new Array();

//创建飞船爆炸构造函数
function Explode(x,y){
	this.x=x;
	this.y=y;
	this.step=0;
}
Explode.prototype.show=function(pen){
		var j=this.step%4; 
		var i=(this.step-j)/4;
		drawImageFrame(pen,"img/explosion2.png",j*40,i*40,40,40,this.x,this.y,40,40);
		if(this.step<7)this.step++;
		else roles.explode.remove(this);
 }
roles.explode=new Array();


//创建道具构造函数
function Prop(x,y,prop_type,offset){
	this.x=x;
	this.y=y;
	this.prop_type=prop_type;
	this.offset=offset;
}
Prop.prototype.show=function(pen){
	switch(this.prop_type){
		case 1:drawImage(pen,"img/powerbig.png",this.x,this.y);break;
		case 2:drawImage(pen,"img/ultbig.png",this.x,this.y);break;
	}
}
Prop.prototype.move=function(){
	this.x+=this.offset;
	this.y+=2;
	if(this.x<=50||this.x>=550||this.y>=750)
		roles.prop.remove(this);
	//碰撞检测
	var d=Math.sqrt(Math.pow((this.x+20-roles.userShip.x-25),2) + Math.pow((this.y+20-roles.userShip.y-25),2));
	if(d<=45){
		roles.prop.remove(this);
		if(this.prop_type==1)
			bullet_type=this.prop_type;
		else{
			if(bullet_speed<3)
				bullet_speed++;
		}
	}
}
roles.prop=new Array();
