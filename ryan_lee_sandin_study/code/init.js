autowatch = 1;
outlets = 2;

var width = 480;
var height = 360;

function bang() {
	size();
	dim();
}

function size() {
	outlet( 0, new Array( "size", width, height ) );	
}

function dim() {
	outlet( 1, new Array( "dim", width, height ) );
}