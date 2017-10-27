class Bullet
{
constructor( x,y,vx,vy )
{
	var pos = { x: x,y: y - 17 };
	var vel = { x: vx,y: vy };
	const size = 5;
	const SPD = 15;
	
	const image = gfx.LoadImage( "Images/Bullet.png" );
	// 
	this.Update = function()
	{
		pos.x += vel.x * SPD;
		pos.y += vel.y * SPD;
	}
	
	this.Draw = function()
	{
		// gfx.DrawCircle( pos.x,pos.y,size,"#12F" );
		gfx.DrawImage( image,pos.x,pos.y );
	}
	
	this.Pos = function()
	{
		return {
			x: pos.x,
			y: pos.y,
			w: size,
			h: size
		}
	}
}
}