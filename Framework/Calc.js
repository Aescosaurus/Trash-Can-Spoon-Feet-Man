class Calc
{
	constructor()
	{
		this.FindAngle = function( x0,y0,x1,y1 )
		{
			const delta_x = x1 - x0;
			const delta_y = y1 - y0;
			
			const theta = Math.atan2( delta_y,delta_x );
			
			return theta * ( 180 / Math.PI );
		}
		this.FindDist = function( x0,y0,x1,y1 )
		{
			const delta_x = x1 - x0;
			const delta_y = y1 - y0;
			
			return Math.sqrt( ( delta_x * delta_x ) + ( delta_y * delta_y ) );
		}
		this.HitTest = function( x0,y0,w0,h0,x1,y1,w1,h1 )
		{
			return ( x0 < x1 + w1 && x0 + w0 > x1 &&
				     y0 < y1 + h1 && y0 + h0 > y1 );
		}
		this.Random = function( min,max )
		{
			if( min > max )
			{
				const temp = max;
				max = min;
				min = temp;
			}
			
			return( Math.floor( Math.random() * ( 1 + max - min ) ) + min );
		}
	}
}
