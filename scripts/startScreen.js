function startScreen(descr){
	for (var property in descr) {
	this[property] = descr[property];
}
}

var g_startScreen = new startScreen({
	animationInterval: 100,
	n: 0,
	animationSequence:0,
	opacityLincreasing: true,
	opacityRincreasing:true,
	opacityTRONincreasing:true,
	opacityL:0.6,
	opacityR:0.6,
	opacityTRON:0.6
});

var g_staticSound1 = new Audio("https://notendur.hi.is/tap4/tronImages/static1.wav");
var g_staticSound2 = new Audio("https://notendur.hi.is/tap4/tronImages/static2.wav");
var g_staticSound3 = new Audio("https://notendur.hi.is/tap4/tronImages/static3.wav");
var g_playSound = true;

startScreen.prototype.render = function(ctx)
{
	g_sprites.grid.drawAt(ctx,0,0);
	if (this.animationSequence<0.7)
	{
		ctx.globalAlpha=this.opacityTRON;
	g_sprites.titleReg.drawAt(ctx,50,50);
	}
	if (this.animationSequence>=0.7 && this.animationSequence<0.75)
	{
		if (g_playSound===true)
		{
		g_staticSound1.play();
		g_playSound = false;
		}
		ctx.globalAlpha=this.opacityTRON;
		g_sprites.titleNoInnerO.drawAt(ctx,50,50);
	}
	if (this.animationSequence>=0.75 && this.animationSequence<0.80)
	{
		if (g_playSound===true)
		{
		g_staticSound3.play();
		g_playSound = false;
		}
		ctx.globalAlpha=this.opacityTRON;
		g_sprites.titleNoOuterO.drawAt(ctx,50,50);
	}
	if (this.animationSequence>=0.8 && this.animationSequence<0.9)
	{
		if (g_playSound === true)
		{
		g_staticSound3.play();
		g_playSound = false;
		}
		g_sprites.titleN.drawAt(ctx,50,50);
	}
	if(this.animationSequence>=0.9)
	{
		if (g_playSound === true)
		{
		g_staticSound2.play();
		g_playSound = false;
		}
		ctx.globalAlpha=this.opacityTRON;
		g_sprites.titleNoT.drawAt(ctx,50,50);
	}
	ctx.globalAlpha =this.opacityL;
	ctx.fillStyle="cyan";
	util.roundedRect(ctx,50,200,225,150,35);
	ctx.stroke();
	ctx.globalAlpha=this.opacityR;
	util.roundedRect(ctx,325,200,225,150,35);
	ctx.stroke();
	util.roundedRect(ctx,50,400,500,40,20);
	ctx.stroke();
	ctx.fillStyle="white";
	util.roundedRect(ctx,50,350,225,25,10);
	util.roundedRect(ctx,325,350,225,25,10);
	ctx.stroke();
	ctx.globalAlpha=1;
	ctx.fillStyle="black";
	ctx.font="50px Andale Mono";
	ctx.fillStyle = "white";
	ctx.fillText ("GRID", 100,250);
	ctx.fillText("ENEMIES",340,250);
	ctx.stroke();
	ctx.font="35px Andale Mono";
	//ctx.fillStyle = "black";
	ctx.fillText ("Press Z to Begin",125,433);
	ctx.stroke();
	ctx.font= "100px Andale Mono";
	ctx.fillText(g_game.gridChoice,130,335);
	ctx.fillText(g_game.numbOfEnemies,400,335);
	ctx.font="20px Andale Mono";
	ctx.fillStyle="black";
	ctx.fillText("Press G to change",65, 372);
	ctx.fillText("Press E to change",340, 372);


}

startScreen.prototype.update = function(du)
{
	if (keys.eatKey(KEY_CHOOSEGRID))
	{
		if (g_game.gridChoice ==="A") {g_game.gridChoice = "B"; return;}
		if (g_game.gridChoice ==="B") {g_game.gridChoice = "C"; return;}
		if (g_game.gridChoice ==="C") {g_game.gridChoice = "A"; return;}
	}
	if (keys.eatKey(KEY_ENEMYNUMBER))
	{
		g_game.numbOfEnemies = g_game.numbOfEnemies+1;
		if (g_game.numbOfEnemies>3) {g_game.numbOfEnemies=1;}
	}
	if (keys.eatKey(KEY_STARTGAME)) {g_gameState = g_gameState+1;}
	if (this.n < this.animationInterval)  {this.n=this.n+1;}
	else
	{
		this.n=0;
		this.animationInterval = Math.random()*50;
		this.animationSequence=Math.random();
		if (this.animationSequence<0.7)
		{
			this.animationInterval = this.animationInterval + 50;
		}
		g_playSound = true;


	}
	if (this.opacityLincreasing)
	{
		this.opacityL = this.opacityL+0.0015;
		if (this.opacityL>0.95) {this.opacityLincreasing = false;}
	}
	else
	{
		this.opacityL=this.opacityL-0.0015;
		if (this.opacityL<0.3){this.opacityLincreasing=true;}
	}
	if (this.opacityRincreasing)
	{
		this.opacityR = this.opacityR+0.002;
		if (this.opacityR>0.95) {this.opacityRincreasing=false;}
	}
	else
	{
		this.opacityR=this.opacityR-0.002;
		if (this.opacityR<0.275) {this.opacityRincreasing=true;}
	}
	if (this.opacityTRONincreasing)
	{
		this.opacityTRON= this.opacityTRON+0.001
		if(this.opacityTRON>0.975) {this.opacityTRONincreasing=false;}

	}
	else
	{
		this.opacityTRON = this.opacityTRON-0.001;
		if (this.opacityTRON<0.65) {this.opacityTRONincreasing=true;}
	}
}
