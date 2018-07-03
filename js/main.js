//创建角色展示函数
function showRoles(){
	//展示背景
	roles.background.show(pen,bg_url);
	//用户飞船
	roles.userShip.show(pen);
	roles.userShip.move(lr,dp);
	//创建血条
	roles.userBlood.show(pen,roles.userShip.blood);
	//创建子弹
	bullet_index++;
	if(bullet_index%parseInt(6/bullet_speed)==0){
		roles.userShip.fire();
	}
	if(bullet_index==18){
//		roles.enemyShip_boss.fire();
		bullet_index=0;
	}
	//userShip子弹
	for(var i=0;i<roles.bullet.length;i++){
		roles.bullet[i].show(pen,"img/laser1.png");
		roles.bullet[i].move();
	}
	if(user_score<200){
		//小飞船
		if(user_score%25==0){
			roles.letgo.show_smallShip();
			this.sign_smallShip++;
			if(this.sign_smallShip>5)
				this.sign_smallShip=1;
		}
		if(user_score==100&&roles.enemyShip_bigger.length==0){
			roles.letgo.show_biggerShip();
//			this.sign_biggerShip=Math.floor(Math.random()*3+1);
		}
	}else{
		//小飞船
		if(user_score%50==0){
			roles.letgo.show_smallShip();
			this.sign_smallShip++;
			if(this.sign_smallShip>5)
				this.sign_smallShip=1;
		}
		//bigger	
		if(user_score%300==0&&roles.enemyShip_bigger.length==0){
			roles.letgo.show_biggerShip();
//			this.sign_biggerShip=Math.floor(Math.random()*3+1);
		}
		//boss
		if(user_score==3000)
			roles.letgo.show_bossShip();
	}
//		if(user_score==10)
//			roles.letgo.show_bossShip();
	//小飞船
	for(var i=0;i<roles.enemyShip_small.length;i++){
			roles.enemyShip_small[i].show(pen);
			roles.enemyShip_small[i].move_small(2+index_smallShip);
			index_smallShip++;
			if(index_smallShip>=5){
				index_smallShip=0;
			}
		}
	//大飞船
	for(var i=0;i<roles.enemyShip_bigger.length;i++){
		roles.enemyShip_bigger[i].show(pen);
		roles.enemyShip_bigger[i].move_bigger(5,200);
	}

	//大boss
	if(roles.enemyShip_boss!=null){
		roles.enemyShip_boss.show(pen);
		roles.enemyShip_boss.move_boss(5,50);
//		roles.enemyShip_boss.fire_boss();
	}
	if(bullet_index%6==0){
		roles.letshoot.S_boss();
		roles.letshoot.S_bigger();
	}
		
	
	//enemy子弹绘制
	for(var i=0;i<roles.bullet_enemy.length;i++){
		
		roles.bullet_enemy[i].show(pen);
		roles.bullet_enemy[i].move();
	}
	//爆炸显示
	for(var i=0;i<roles.explode.length;i++){
		roles.explode[i].show(pen);
	}
	//道具绘制
	for(var i=0;i<roles.prop.length;i++){
		roles.prop[i].show(pen);
		roles.prop[i].move();
	}
	user_score++;
	
	console.log(user_score);
	if(roles.enemyShip_boss!=null&&roles.enemyShip_boss.stop){
		console.log(roles.enemyShip_boss.blood_boss);
	}
}

function Sinterface(){
	roles.startInterface.show(pen);
}

function keyDown(keyCode){
	switch(keyCode){
		case 37:lr=-1;break;
		case 39:lr=1;break;
		case 38:dp=-1;break;
		case 40:dp=1;break;
	}
}

function keyUp(keyCode){
		switch(keyCode){
		case 37:lr=0;break;
		case 39:lr=0;break;
		case 38:dp=0;break;
		case 40:dp=0;break;
	}
}

