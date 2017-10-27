// Strings!
const version = "v2.1.6";

// Numbers!
const GRAV_ACC = 0.3;

// Booleans!
const funny = false;

// Arrays!
var enemies = [];

// Objects!
var calc = new Calc();
var gfx  = new Graphics();
var kbd  = new Keyboard();
var ms   = new Mouse();
var ajax = new AJAX();
var sfx = new Audio();

var pl = new Player( GRAV_ACC );
var floor = new Ground();

const bg = gfx.LoadImage( "Images/BG.png" );

window.onload = function()
{
	Init();
	
	const FPS = 30;
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / FPS );
	console.log( "JSJ Framework " + version + " has loaded successfully!" );
};

function Init()
{
	gfx.Init();
	kbd.Init();
	ms.Init( gfx.canvas );
	
	gfx.SetSmoothing( false ); // Set false for pixel perfect.
	// \/ Initialize things! \/
	pl.Init();
	floor.Init();
	for( var i = 0; i < 6; ++i )
	{
		enemies[i] = new Enemy();
		enemies[i].Init();
	}
}

function Update()
{
	// \/ Update things here. \/
	pl.Update();
	for( var i in enemies )
	{
		enemies[i].Update();
		
		const en = enemies[i];
		
		if( calc.HitTest( pl.Pos().x,pl.Pos().y,pl.Pos().w,pl.Pos().h,
		    en.Pos().x,en.Pos().y,en.Pos().w,en.Pos().h ) )
		{
			enemies.splice( i,1 )
			pl.Hurt();
		}
		else if( pl.BulletAt( en.Pos().x,en.Pos().y,en.Pos().w,en.Pos().h ) )
		{
			if( enemies[i].Hurt() )
			{
				// enemies.splice( i,1 );
				enemies[i].Init();
			}
		}
	}
}

function Draw()
{
	gfx.DrawRect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// \/ Draw things here. \/
	gfx.DrawImage( bg,0,0 );
	for( var i in enemies )
	{
		enemies[i].Draw();
	}
	pl.Draw();
	floor.Draw();
}
