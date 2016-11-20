include("timers.js");
include("timings.js");
include("util.js");

autowatch = 1;
getTime.immediate = 1;
checkTime.immediate = 1;
phase_1.immediate = 1;
phase_2.immediate = 1;
phase_3.immediate = 1;
phase_4.immediate = 1;
phase_5.immediate = 1;
phase_6.immediate = 1;

var _G = new Global( "global" );
var util = Util.getInstance(); 
var p = this.patcher;
var input1 = p.getnamed("input1").subpatcher();

function bang() {
	if (_G.timerOffset == null) {
		_G.timerOffset = 0;
	}
	_G.timer = new Timers();
	_G.timings = new Timings();
	_G.timer.start();	
}

function getTime() {
	outlet(0, _G.timer.getTime() );
}

function updateTimer( time ) {
	_G.timerOffset = time;
}

function checkTime() {
	var timings = _G.timings.timings;
	for ( var k in timings ) {
		if ( timings.hasOwnProperty(k) ) {
			if ( timings[k][0] ) 
				continue;
			if ( _G.timer.getTime() > timings[k][1] ) {
				post( util.getTime() + timings[k][1] + "ms timer reached.\n" );	
				timings[k][0] = true;			

				if ( k == "phase_1") {
					phase_1();
				} else if ( k == "phase_2" ) {
					phase_2();
				} else if ( k == "phase_3" ) {
					phase_3();
				} else if ( k == "phase_4" ) {
					phase_4();
				} else if ( k == "phase_5" ) {
					phase_5();
				} else if ( k == "phase_6" ) {
					phase_6();
				}
			}
		}
	}
}

function phase_1() {
	// Turning on metros
	p.getnamed("p1_xfade").message( "bang" );
	p.getnamed("p1_env_t").message(1);
	input1.getnamed("p1_t").message(1);
	input1.getnamed("p1_mat_g").message(1);
	input1.getnamed("p2_amp").message(0);
	input1.getnamed("p2_quant").message(0.01);
	input1.getnamed("p1_phase_b").message( "bang" );
	input1.getnamed("p1_center_t").message(1);
	input1.getnamed("p1-3_col_gate").message( 1 );

	
}

function phase_2() {
	//Turn on amp metro
	input1.getnamed("p2_amp_g").message(1);
	input1.getnamed("p2_amp_t").message(1);
	input1.getnamed("p2_amp_mult").message( "bang" );
	input1.getnamed("p2_quant_mult").message( "bang" );
}

function phase_3() {
	p.getnamed("p4_counter").message( new Array( "set", 1) );
	p.getnamed("p3_xfade").message( "bang" );
	p.getnamed("p3_div").message( "bang" );
	input1.getnamed("p1-3_col_gate").message( 2 );
	p.getnamed("p3_size1").message( "bang" );
	p.getnamed("p3_multX_1").message( "bang" );	
}

function phase_4() {
	p.getnamed("p4_size_t").message( 1 );	
}

function phase_5() {
	p.getnamed("p4_size_t").message( 0 );
	p.getnamed("p4_counter").message( new Array( "set", 1) );
	p.getnamed("p3_size1").message( "bang" );
	p.getnamed("p5_counter").message( new Array( "set", 1) );
	p.getnamed("p3_size1").message( "bang" );
	p.getnamed("p5_rand_t").message( 1 );
	p.getnamed("p5_div_t").message( 1 );
}

function phase_6() {
	p.getnamed("p5_div_t").message( 0 );
	p.getnamed("p5_rand_t").message( 0 );
	p.getnamed("p6_multX").message( "bang" );
	p.getnamed("p6_div").message( "bang" );
	p.getnamed("p4_size_t").message( 1 );
}