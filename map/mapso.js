
$.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/0AlodOQ6KsieFdDNBX0tVMGV2VTRzSmhFUnJJRVRjdEE/od6/public/values?alt=json", function(data) {

//for (var i in data.feed)
//{
// data.feed.entry[i]['gsx$elicker']['$t']
//output
  //console.log(data.feed.entry[0]['gsx$elicker']['$t']);
//}

  for (i=0; i<30; i++)
  {
  
  

		var wardNum = i+1;
		var wardID = "#map-ward" + wardNum;
		if (wardNum > 0 && data.feed.entry[i]['gsx$active']['$t'] == "yes") {
			//var offset = $("#mapclick").offset();
			var relX = parseInt(data.feed.entry[i]['gsx$xcord']['$t']);
			var relY = parseInt(data.feed.entry[i]['gsx$ycord']['$t']);
			if ($(wardID).length == 0) {
				$("#mapclick").append(
					"<div class='clicked ui-widget ui-widget-content' id='map-ward" + wardNum + "' style='left: " + relX + "px; top: " + relY + "px;'>"
						+ wardNum
						+ "</div><div class='poll' id='map-poll" + wardNum + "' style='left: " + (relX - 64) + "px; top: " + (relY - 64) + "px;'></div>"
				);

			} else {
				$(wardID).css('left', relX).css('top', relY);
				$("#map-poll" + wardNum).css("left", relX - 64).css("top", relY - 64);
			}
			// Make Poll Display
			var wardPer1 = data.feed.entry[i]['gsx$elicker']['$t'];
			var wardPer2 = 100 - parseInt(wardPer1);
			var datagr = [parseInt(wardPer1), parseInt(wardPer2)];
			console.log(parseInt(data.feed.entry[i]['gsx$ycord']['$t']));
			$.jqplot("map-poll" + wardNum, [datagr], 
			    { 
			      	seriesDefaults: {
				        renderer: jQuery.jqplot.PieRenderer, 
				        rendererOptions: {
				          	showDataLabels: true,
				          	seriesColors: ["#279C1A", "#1B407A"],
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

		
	}
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