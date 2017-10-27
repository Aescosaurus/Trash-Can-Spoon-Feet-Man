class Enemy
{
constructor()
{
	const width = 55;
	const height = 55;
	var pos = { x: 0,y: 0 };
	
	var SPD = calc.Random( 3,5 );
	
	const RETARGET_TIME = 70;
	var targetTimer = 0;
	
	const HP_MAX = 7;
	var hp = 0;
	
	const left  = gfx.LoadImage( "Images/EnemyL.png" );
	const right = gfx.LoadImage( "Images/EnemyR.png" );
	
	var tookDamage = false;
	// 
	this.Init = function()
	{
		hp = HP_MAX;
		if( !calc.Random( 0,1 ) )
		{
			pos.x = gfx.SCREEN_WIDTH + 200;
		}
		else
		{
			pos.x = -200;
		}
		pos.y = gfx.SCREEN_HEIGHT - floor.Pos().h - height;
	}
	
	this.Update = function()
	{
		++targetTimer;
		if( targetTimer > RETARGET_TIME )
		{
			targetTimer = 0;
			if( pl.Pos().x < pos.x )
			{
				SPD = -Math.abs( SPD );
			}
			else
			{
				SPD = Math.abs( SPD );
			}
		}
		pos.x += SPD;
		
		tookDamage = false;
	}
	
	this.Draw = function()
	{
		// gfx.DrawRect( pos.x,pos.y,width,height,"#F00" );
		var imageToDraw;
		if( SPD < 1 )
		{
			imageToDraw = left;
		}
		else
		{
			imageToDraw = right;
		}
		
		var offset = 0;
		if( tookDamage )
		{
			offset = 5;
		}
		
		gfx.DrawImage( imageToDraw,pos.x - offset / 2,pos.y - offset / 2,width + offset / 2,height + offset / 2 );
	}
	
	this.Hurt = function( amount = 1 )
	{
		tookDamage = true;
		hp -= amount;
		
		if( hp < 1 )
		{
			return true;
		}
		
		return false;
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