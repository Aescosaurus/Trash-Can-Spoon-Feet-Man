class Audio
{
constructor()
{
	var sounds = [];
	var curSound = 0;
	// 
	this.LoadSound = function( source )
	{
		const nowSound = curSound;
		++curSound;
		
		sounds[nowSound] = new Audio( source );
		
		return nowSound;
	}
	
	this.PlaySound = function( id )
	{
		sounds[id].currentTime = 0;
		sounds[id].play();
	}
	
	this.StopAll = function()
	{
		for( var i in sounds )
		{
			sounds[i].stop();
			sounds[i].currentTime = 0;
		}
	}
}
}