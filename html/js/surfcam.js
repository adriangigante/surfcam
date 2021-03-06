function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

function loadSwellnetReport(swellnetURL){
	var jsonpText = "";
	jsonpText = $.getJSON(
		'http://cors-proxy-surf-cam.7e14.starter-us-west-2.openshiftapps.com/' + swellnetURL, 
		function(data){
		    var str = null;
		    str = data.contents.split('Surf:');
		    if ((str.length) > 1) {
		    	if (str[1].includes('Lorem ipsum')){
		    		$("#report-swellnet" ).html("Daily surf reports are exclusive to Swellnet Pro subscribers until 9am");
		    	} else {
			        str = str[1].split('</span>');
			        str = str[1].split('>');
			        var surf =  str[1];
			        //alert(surf);

			        var str = null;
			        str = data.contents.split('Winds:');
			        str = str[1].split('</span>');
			        str = str[1].split('>');
			        var winds = str[1];
			        //alert(winds);
			        
			        var str = null;
			        str = data.contents.split('Weather:');
			        str = str[1].split('</span>');
			        str = str[1].split('>');
			        var weather = str[1];
			        //alert(weather);

			        var str = null;
			        str = data.contents.split('Rating:');
			        str = str[1].split('</span>');
			        str = str[1].split('>');
			        var rating = str[1];
			        //alert(rating);

			        var str = null;
			        str = data.contents.split('views-field views-field-body');
			        str = str[1].split('<p>');
			        str = str[1].split('</p>');
			        var report = str[0];
			        //alert(report);

			        var fullReport = 
			            "Surf: " + surf + "<br>" +
			            "Winds: " + winds + "<br>" +
			            "Weather: " + weather + "<br>" +
			            "Rating: " + rating + "<br>" +
			            report;
			        //alert(fullReport);
			        $("#report-swellnet" ).html(fullReport);
			    }
		    } else {
		        $("#report-swellnet" ).html("Too early! Nothing to report yet.");
		    }

		}
	)
}

function loadCoastalwatchReport(coastalwatchURL){
	var jsonpText = "";
	jsonpText = $.getJSON(
		'http://cors-proxy-surf-cam.7e14.starter-us-west-2.openshiftapps.com/' + coastalwatchURL, 
		function(data){
		    var str = null;
		    str = data.contents.split('s rating - <strong> ');
		    if ((str.length) > 1) {

		        str = str[1].split(' </');
		        var rating = str[0];
		        //alert('Rating: ' + rating);

		        str = str[1].split('Bottom">');
		        var report = str[1].split('<')[0].trim();
		        //alert('Report: ' + report);

		        str = data.contents.split('<strong class="val">');
		        var surf = str[1].split('</strong>')[0] + ' ' + str[1].split('<span class="dir">')[1].split('</span>')[0] + str[1].split('<span>')[1].split('</span>')[0];
		        //alert(surf);

		        str = data.contents.split('<strong class="val">');
		        var winds = str[2].split('</strong>')[0] + ' ' + str[2].split('<span class="dir">')[1].split('</span>')[0];
		        //alert(winds);

		        str = data.contents.split('<div class="floatLeft report water">');
		        var water = str[1].split('>')[1].split('<')[0];
		        //alert(water);
		        		        

		        var fullReport =
		        	"Surf: " + surf + "<br>" +
		        	"Winds: " + winds + "<br>" +
		        	"Water: " + water + "<br>" + 
		            "Rating: " + rating + "<br>" +
		            report;		        

		        $("#report-coastalwatch" ).html(fullReport);

		    } else {

		        $("#report-coastalwatch" ).html("Too early! Nothing to report yet.");

		    }

		}
	)
}
