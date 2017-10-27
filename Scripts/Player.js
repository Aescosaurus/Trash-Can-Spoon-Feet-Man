class Player
{
constructor( gravity )
{
	var Shoot = function()
	{
		++shotTimer;
		if( shotTimer > REFIRE_TIME )
		{
			shotTimer = 0;
			
			// if( kbd.CharDown( 'I' ) )
			// {
			// 	bullets[bullets.length] = new Bullet( pos.x + width / 2,pos.y,0,-1 );
			// }
			// else if( kbd.CharDown( 'K' ) )
			// {
			// 	bullets[bullets.length] = new Bullet( pos.x + width / 2,pos.y + height,0,1 );
			// }
			/*else */if( kbd.CharDown( 'J' ) )
			{
				lastShotDir = -1;
				bullets[bullets.length] = new Bullet( pos.x,pos.y + height / 2,-1,0 );
			}
			else if( kbd.CharDown( 'L' ) )
			{
				lastShotDir = 1;
				bullets[bullets.length] = new Bullet( pos.x + width,pos.y + height / 2,1,0 );
			}
		}
	}
	var Move = function()
	{
		if( kbd.CharDown( 'A' ) && vx > -MAX_SPD )
		{
			// pos.x -= SPD;
			vx -= SPD;
		}
		if( kbd.CharDown( 'D' ) && vx < MAX_SPD )
		{
			// pos.x += SPD;
			vx += SPD;
		}
		pos.x += ( vx *= 0.85 );
	}
	var Gravity = function()
	{
		while( calc.HitTest( pos.x,pos.y,width,height,
		    floor.Pos().x,floor.Pos().y,floor.Pos().w,floor.Pos().h ) )
		{
			pos.y -= 0.1;
			touchingGround = true;
			grav = 0;
		}
		
		if( kbd.CharDown( ' ' ) )
		{
			if( touchingGround )
			{
				jumping = true;
				jumpTimer = 0;
			}
		}
		else
		{
			jumping = false;
		}
		
		++jumpTimer;
		if( jumping && jumpTimer < JUMP_TIME )
		{
			pos.y -= JUMP_POW;
			grav = -JUMP_POW;
		}
		else
		{
			jumping = false;
		}
		grav += GRAV_ACC;
		pos.y += grav;
		
		touchingGround = false;
	}
	// 
	const width = 50;
	const height = 70;
	var pos = { x: 0,y: 0 };
	
	var jumping = false;
	const JUMP_POW = 3.5;
	var touchingGround = false;
	const JUMP_TIME = 20;
	var jumpTimer = JUMP_TIME;
	
	const SPD = 1;
	var vx = 0;
	const MAX_SPD = 10;
	
	var grav = 0;
	const GRAV_ACC = gravity;
	
	var bullets = [];
	const REFIRE_TIME = 4;
	var shotTimer = 0;
	
	const HP_MAX = 5;
	var hp = 0;
	
	const left  = gfx.LoadImage( "Images/PlayerL.png" );
	const right = gfx.LoadImage( "Images/PlayerR.png" );
	var lastShotDir = -2;
	// 
	this.Init = function()
	{
		hp = HP_MAX;
		pos.x = gfx.SCREEN_WIDTH / 2 - width / 2;
		pos.y = gfx.SCREEN_HEIGHT / 2 - height * 2;
	}
	this.Update = function()
	{
		Move();
		Gravity();
		Shoot();
		// 
		for( var i in bullets )
		{
			bullets[i].Update();
		}
		
		if( hp < 1 )
		{
			// location.reload();
			Init();
		}
		
		while( pos.x < 0 )
		{
			++pos.x;
			vx = 0;
		}
		while( pos.x + width > gfx.SCREEN_WIDTH )
		{
			--pos.x;
			vx = 0;
		}
	}
	
	this.Draw = function()
	{
		// gfx.DrawRect( pos.x,pos.y,width,height,"#FA0" );
		var imageToDraw;
		if( lastShotDir > 0 )
		{
			imageToDraw = right;
		}
		else
		{
			imageToDraw = left;
		}
		gfx.DrawImage( imageToDraw,pos.x,pos.y );
		
		for( var i in bullets )
		{
			bullets[i].Draw();
		}
	}
	
	this.Hurt = function( amount = 1 )
	{
		hp -= amount;
	}
	
	this.BulletAt = function( x,y,w,h )
	{
		for( var i in bullets )
		{
			const b = bullets[i];
			if( calc.HitTest( b.Pos().x,b.Pos().y,b.Pos().w,b.Pos().h,
			    x,y,w,h ) )
			{
				bullets.splice( i,1 );
				return true;
			}
		}
	}
	
	this.Pos = function()
	{
		return {
			x: pos.x,
			y: pos.y,
			w: width,
			h: height
		}
	}
}
}
