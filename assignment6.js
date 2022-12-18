var data = document.getElementById("data");
var Latitude;
var Longitude;
var key = "0c5d69dc54cbe394ef6599dca562c43c";
var url = "http://api.openweathermap.org/data/2.5/weather?";


function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		data_of_Lat_Lon.innerHTML =
			"Location could not be retrieved. Please try someother browser.";
	}
}


function showPosition(position) {
	Latitude = position.coords.latitude;
	Longitude = position.coords.longitude;

	getData(Latitude, Longitude);
}

function getData(Lat, Lon) {
	const readyToSent = (url + "lat=" + Lat
		+ "&lon=" + Lon + "&appid=" + key);
	fetch(readyToSent)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			fetchData(data)
		})
}


function fetchData(data) {
	const icon = "http://openweathermap.org/img/wn/"
		+ data.weather[0].icon + "@2x.png"

	document.getElementById("data").innerHTML =
		"<b>Weather At Your Location is: "
		+ "</b><br> <img src=" + icon + "><br>"
		+ "<b>Country :</b>" + data.sys.country
		+ "<br><b>City: </b>"
		+ data.name + "<br><b>Temperature: </b>"
		+ parseFloat((data.main.temp - 273.15))
			.toFixed(1) + "℃" +
		"<br><b>Feels Like:</b>"
		+ parseFloat((data.main.feels_like -
			273.15)).toFixed(1) + "℃"
		+ "<br><b>Minimum Temperatue: </b>"
		+ parseFloat((data.main.temp_min -
			273.15)).toFixed(1) + "℃"
		+ "<br><b>Maximum Temperature: </b>"
		+ parseFloat((data.main.temp_max -
			273.15)).toFixed(1) + "℃"
		+ "<br><b>Pressure: </b>"
		+ data.main.pressure + "hPa"
		+ "<br><b>Humidity: </b>"
		+ data.main.humidity + "%"
		+ "<br><b>Conditions: </b>"
		+ data.weather[0].description + "<br>"
}


getLocation();
showPosition();
getData();
