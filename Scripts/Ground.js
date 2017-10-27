class Ground
{
constructor()
{
	var width = 0;
	var height = 60;
	var pos = { x: 0,y: 0 };
	
	var image = gfx.LoadImage( "Images/Ground.png" );
	// 
	this.Init = function()
	{
		width = gfx.SCREEN_WIDTH;
		
		pos.y = gfx.SCREEN_HEIGHT - height;
	}
	
	this.Draw = function()
	{
		// gfx.DrawRect( pos.x,pos.y,width,height,"#2F2" );
		gfx.DrawImage( image,pos.x,pos.y - 30 );
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