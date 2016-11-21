include("timers.js");
include("timings.js");
include("util.js");

autowatch = 1;
var paused = false; // Is it paused?

getTime.immediate = 1;
checkTime.immediate = 1;
phase_1.immediate = 1;
phase_2.immediate = 1;
phase_3.immediate = 1;
phase_4.immediate = 1;
phase_5.immediate = 1;
phase_5_5.immediate = 1;
phase_5_75.immediate = 1;
phase_6.immediate = 1;
phase_6_5.immediate = 1;
phase_7.immediate = 1;
phase_8.immediate = 1;
phase_9.immediate = 1;
phase_10.immediate = 1;
phase_11.immediate = 1;
phase_12.immediate = 1;
phase_13.immediate = 1;
phase_14.immediate = 1;
phase_15.immediate = 1;
phase_16.immediate = 1;
phase_17.immediate = 1;
phase_18.immediate = 1;
phase_19.immediate = 1;

var _G = new Global( "global" );
var util = Util.getInstance(); 
var p = this.patcher;
var input1 = p.getnamed("input1").subpatcher();
var input2 = p.getnamed("input2").subpatcher();

function bang() {
	if (_G.timerOffset == null) {
		_G.timerOffset = 0;
	}
	_G.timer = new Timers();
	_G.timings = new Timings();
	_G.timer.start();	
}

function getTime() {
	if (!paused) {
		outlet(0, _G.timer.getTime() );
	} 
}

function updateTimer( time ) {
	_G.timerOffset = time;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pause() {
	if (paused == true) 
		return;
	paused = true;
	_G.timer.pause();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resume() {
	if (paused == false) 
		return;
	paused = false;
	_G.timer.resume();
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
				} else if ( k == "phase_5_5" ) {
					phase_5_5();
				} else if ( k == "phase_5_75" ) {
					phase_5_75();
				} else if ( k == "phase_6" ) {
					phase_6();
				} else if ( k == "phase_6.5" ) {
					phase_6_5();
				} else if ( k == "phase_7" ) {
					phase_7();
				} else if ( k == "phase_8" ) {
					phase_8();
				} else if ( k == "phase_9" ) {
					phase_9();
				} else if ( k == "phase_10" ) {
					phase_10();
				} else if ( k == "phase_11" ) {
					phase_11();
				} else if ( k == "phase_12" ) {
					phase_12();
				} else if ( k == "phase_13" ) {
					phase_13();
				} else if ( k == "phase_14" ) {
					phase_14();
				} else if ( k == "phase_15" ) {
					phase_15();
				} else if ( k == "phase_16" ) {
					phase_16();
				} else if ( k == "phase_17" ) {
					phase_17();
				} else if ( k == "phase_18" ) {
					phase_18();
				} else if ( k == "phase_19" ) {
					phase_19();
				}
			}
		}
	}
}

function phase_1() {

	p.getnamed("webcam_open").message( "bang" );
	p.getnamed("p1_xfade").message( "bang" );
	p.getnamed("p1_env_t").message(1);
	input1.getnamed("p1_t").message(1);
	input1.getnamed("p1_mat_g").message(1);
	input1.getnamed("p2_amp").message(0);
	input1.getnamed("p2_quant").message(0.01);
	input1.getnamed("p1_phase_b").message( "bang" );
	input1.getnamed("p1_center_t").message(1);
	input1.getnamed("p1-3_col_gate").message( 1 );	
	input1.getnamed("input1_G").message( 0 );	
	input1.getnamed("input1_g_init").message( "bang" );	
	p.getnamed("input3_switch").message( 1 );

	
}

function phase_2() {
	//Turn on amp metro
	input1.getnamed("p2_amp_g").message(1);
	input1.getnamed("p2_amp_t").message(1);
	input1.getnamed("p2_amp_mult").message( "bang" );
	input1.getnamed("p2_quant_mult").message( "bang" );
}

function phase_3() {
	input2.getnamed("input2_gate").message( 1 );	
	input2.getnamed("p4_counter").message( new Array( "set", 1) );
	p.getnamed("p3_xfade").message( "bang" );
	input2.getnamed("p3_div").message( "bang" );
	input1.getnamed("p1-3_col_gate").message( 2 );
	input2.getnamed("p3_size1").message( "bang" );
	input2.getnamed("p3_multX_1").message( "bang" );	
}

function phase_4() {
	input2.getnamed("p4_size_t").message( 1 );	
}

function phase_5() {
	input2.getnamed("p4_size_t").message( 0 );
	input2.getnamed("p4_counter").message( new Array( "set", 1) );
	input2.getnamed("p3_size1").message( "bang" );
	input2.getnamed("p5_counter").message( new Array( "set", 1) );
	input2.getnamed("p3_size1").message( "bang" );
	input2.getnamed("p5_rand_t").message( 1 );
	input2.getnamed("p5_div_t").message( 1 );
}

function phase_5_5() {
	input2.getnamed("p5_rand_t").message( 0 );
	input2.getnamed("p5_div_t").message( 0 );	
}

function phase_5_5() {
	input2.getnamed("p5_rand_t").message( 0 );
	input2.getnamed("p5_div_t").message( 0 );	
}

function phase_5_75() {
	input2.getnamed("p5_rand_t").message( 1 );
	input2.getnamed("p5_div_t").message( 1 );	
}

function phase_6() {
	input2.getnamed("p5_div_t").message( 0 );
	input2.getnamed("p5_rand_t").message( 0 );
	input2.getnamed("p6_multX").message( "bang" );
	input2.getnamed("p6_div").message( "bang" );
	input2.getnamed("p4_size_t").message( 1 );
}

function phase_6_5() {
	input2.getnamed("p6_div").message( "bang" );
}

function phase_7() {
	input2.getnamed("p4_size_t").message( 0 );
	input2.getnamed("p3_size1").message( "bang" );
	p.getnamed("input3_switch").message( 2 );
	input1.getnamed("input1_G").message( 1 );	
	p.getnamed("p7_start").message( "bang" );	
	p.getnamed("p7_xfade").message( "bang" );	
	p.getnamed("p7_rubix").message( new Array( "rows", 2) );
	p.getnamed("p7_rubix").message( new Array( "cols", 2) );
	p.getnamed("p7_rubix").message( new Array( "probmono", 1) );
}

function phase_8() {
	p.getnamed("p8_rubix_t").message( 1 );
	p.getnamed("p8_ran_t").message( 1 );
	p.getnamed("p8_xfade").message( "bang" );
	p.getnamed("p8_amp").message( "bang" );
	p.getnamed("p1_env_t").message(0);
	p.getnamed("p8_env_t").message(1);	
}

function phase_9() {
	p.getnamed("p9_amp").message( "bang" );
}

function phase_10() {
	p.getnamed("p10_amp").message( "bang" );
}

function phase_11() {
	p.getnamed("p11_amp").message( "bang" );
}

function phase_12() {
	p.getnamed("p12_amp").message( "bang" );
}

function phase_13() {
	p.getnamed("p13_amp").message( "bang" );
}

function phase_14() {
	p.getnamed("ferous").message( 1 );
	p.getnamed("p14_xfade").message( "bang" );
	p.getnamed("last_xfade_gate").message( 1 );
	p.getnamed("webcam_gate").message( 1 );
	p.getnamed("webcam_open").message( "bang" );
	p.getnamed("p14_go_go").message( "bang" );
	p.getnamed("p14_fade").message( "bang" );
	input2.getnamed("p15_multiX").message( "bang" );
	input2.getnamed("p3_size1").message( "bang" );
}

function phase_15() {
	input2.getnamed("p3_div").message( "bang" );
}

function phase_16() {
	input2.getnamed("p4_size_t").message( "bang" );
	input2.getnamed("p5_div_t").message( "bang" );
	input2.getnamed("p5_rand_t").message( "bang" );
	p.getnamed("checker_t").message( 1 );
}

function phase_17() {
	input1.getnamed("p1-3_col_gate").message( 1 );
	p.getnamed("p17_lol").message( "bang" );
	p.getnamed("p17_t").message( 1 );
	input1.getnamed("p17_amp_mult").message(1);
	input1.getnamed("p17_quant_mult").message(1);
}

function phase_18() {
	p.getnamed("END").message( "bang" );
}

function phase_19() {
	p.getnamed("FINISH").message( 0 );
}