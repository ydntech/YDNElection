var wardXY = {};

$(document).ready(function() {
    $("#mapclick").click(function(e) {
		var wardNum = window.prompt("Ward #: ", "");
		var wardID = "#map-ward" + wardNum;
		if (wardNum > 0) {
			var offset = $(this).offset();
			var relX = e.pageX - offset.left;
			var relY = e.pageY - offset.top;
			if ($(wardID).length == 0) {
				$(this).append(
					"<div class='clicked ui-widget ui-widget-content' id='map-ward" + wardNum + "' style='left: " + relX + "px; top: " + relY + "px;'>"
						+ wardNum
						+ "</div><div class='poll' id='map-poll" + wardNum + "' style='left: " + (relX - 64) + "px; top: " + (relY - 64) + "px;'></div>"
				);
				console.log(wardPer1 + "|"+wardPer2);
				$(wardID).draggable({
					stop: function(e, ui) {
						var newX = ui.offset.left;
						var newY = ui.offset.top;
						var wardNum = $(this).attr('id').substring(8);
						wardXY[wardNum] = {x: newX, y: newY};
						console.log(JSON.stringify(wardXY));
					},
					drag: function(e, ui) {
						var newX = ui.offset.left;
						var newY = ui.offset.top;
						var wardNum = $(this).attr('id').substring(8);
						$("#map-poll" + wardNum).css("left", newX - 64).css("top", newY - 64);
					}

				})
			} else {
				$(wardID).css('left', relX).css('top', relY);
				$("#map-poll" + wardNum).css("left", relX - 64).css("top", relY - 64);
			}
			wardXY[wardNum] = {x: relX / $(this).width(), y: relY / $(this).height()};
			console.log(JSON.stringify(wardXY));
			// Make Poll Display
			var wardPer1 = window.prompt("Candidate 1 %: ", "");
			var wardPer2 = 100 - parseInt(wardPer1);
			var data = [parseInt(wardPer1), parseInt(wardPer2)];
			$.jqplot("map-poll" + wardNum, [data], 
			    { 
			      	seriesDefaults: {
				        renderer: jQuery.jqplot.PieRenderer, 
				        rendererOptions: {
				          	showDataLabels: true,
				          	seriesColors: ["#ff0000", "#0000ff"],
				          	diameter: 60,
				          	padding: 10,
				          	startAngle: 90,
				          	shadowOffset: 1.25,
				          	shadowDepth: 3,
				          	shadowAlpha: 0.1,
				        }
					},
					grid: {
				        background: "transparent",
				        borderWidth: 0,
				        shadow: false
				    },
			    }
		  	);
		}
	});
});


JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};