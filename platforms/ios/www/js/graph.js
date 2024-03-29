$( ".nav_back" ).click(function() {
    window.history.back();
});

$( ".nav_listen" ).click(function() {
	read(["If you haven't watered your plant today, remember that it needs 3/4 cups of water!"], $(this));
});

$( "#button_graph_continue" ).click(function() {
	$( "#dialog_water" ).fadeIn( "slow" );
	$( ".nav_listen" ).css("opacity", 1.0);
});

$( "#button_water_continue" ).click(function() {
	window.open("stats.html","_self");
});

var lineChartData = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			fillColor : "rgba(44,201,144,0.5)",
			strokeColor : "rgba(44,201,144,1)",
			pointColor : "rgba(44,201,144,1)",
			pointStrokeColor : "#fff",
			data : [.4,.4,.5,.6,.8,1.2,2.3,2.4]
		}
	]
}

var options = {
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : true,
	
	//** Required if scaleOverride is true **
	//Number - The number of steps in a hard coded scale
	scaleSteps : 20,
	//Number - The value jump in the hard coded scale
	scaleStepWidth : .25,
	//Number - The scale starting value
	scaleStartValue : 0,

	scaleFontColor : "#000"
}

var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData, options);

function read(blurbs, button) {
	if (button.css("opacity") != 0.5) {
		button.css("opacity", 0.5 );
		var time = 0;
		var inc = 2500;
		$.each(blurbs, function(index, value){
			time = inc * index;
			var msg = new SpeechSynthesisUtterance(value);
			setTimeout(function(){window.speechSynthesis.speak(msg);},time);
		});
		setTimeout(function(){button.css("opacity", 1.0);},time + inc);
	}
}