//Fahrenheit an Celsius
celsius = false;

//reload button function
function reloadFunction() {
  //Wunderground API/Geo call
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.wunderground.com/api/116eccc0f09f4b42/conditions/q/autoip.json", false);
  xhttp.send(null);
  response = JSON.parse(xhttp.responseText);
  console.log(response);

  //assigning API values
  weatherCity = response.current_observation.display_location.city;
  weatherMainNoLevel = response.current_observation.weather;
  var iconLink = "http://icons.wxug.com/i/c/f/" + response.current_observation.icon + ".gif";
  var weatherBackground;
  var weatherQuote;

  //saving tempature settings
  if (celsius === false) {
    temperatur = response.current_observation.temp_f + " F°";
  } else {
    temperatur = response.current_observation.temp_c + " C°";
  }

  //filtering levels of weather light/heavy
  function level(str) {
    var arrWeather = str.split(" ");
    var weatherMain = str;

    if (arrWeather[0] == "Heavy" || arrWeather[0] == "Light") {
      arrWeather.shift();
      weatherMain = arrWeather.join(" ");
    }
    return weatherMain;
  }

  weatherMain = level(weatherMainNoLevel);

  //assigning elements
  if (weatherMain == "Thunderstorm" || weatherMain == "Thunderstorms and Rain" || weatherMain == "Thunderstorms and Snow" || weatherMain == "Thunderstorms and Ice Pellets" || weatherMain == "Thunderstorms with Hail" || weatherMain == "Thunderstorms with Small Hail" || weatherMain == "Squalls") {
    weatherMain = "storming";
    weatherBackground = "http://www.publicdomainpictures.net/pictures/160000/velka/eclairs-foudre-et-nuages-sombres.jpg";
    weatherQuote = "'Disappointments are to the soul what a thunderstorm is to the air.'";
  } else if (weatherMain == "Overcast" || weatherMain == "Partly Cloudy" || weatherMain == "Mostly Cloudy" || weatherMain == "Scattered Clouds" || weatherMain == "Funnel Cloud") {
    weatherMain = "cloudy";
    weatherBackground = "https://static.pexels.com/photos/94562/pexels-photo-94562.jpeg";
    weatherQuote = "'There are no rules of architecture for a castle in the clouds.'";
  } else if (weatherMain == "Drizzle" || weatherMain == "Freezing Drizzle") {
    weatherMain = "drizzling";
    weatherBackground = "https://upload.wikimedia.org/wikipedia/commons/c/c5/FogParticlesHighSpeed.jpg";
    weatherQuote = "'If people were rain, I was drizzle and she was a hurricane.'";
  } else if (weatherMain == "Rain" || weatherMain == "Rain Mist" || weatherMain == "Rain Showers" || weatherMain == "Freezing Rain") {
    weatherMain = "raining";
    weatherBackground = "https://upload.wikimedia.org/wikipedia/commons/8/8d/Here_comes_rain_again.jpg";
    weatherQuote = "'The drops of rain make a hole in the stone, not by violence, but by oft falling.'";
  } else if (weatherMain == "Snow" || weatherMain == "Snow Grains" || weatherMain == "Ice Crystals" || weatherMain == "Blowing Snow" || weatherMain == "Low Drifting Snow" || weatherMain == "Snow Showers" || weatherMain == "Snow Blowing Snow Mist") {
    weatherMain = "snowing";
    weatherBackground = "https://c2.staticflickr.com/4/3270/3070801493_0980b74915_b.jpg";
    weatherQuote = "'I used to be Snow White, but I drifted.'";
  } else if (weatherMain == "Clear") {
    weatherMain = "clear";
    weatherBackground = "https://static.pexels.com/photos/14676/pexels-photo-14676.png";
    weatherQuote = "'No one is free, even the birds are chained to the sky.'";
  } else if (weatherMain == "Smoke" || weatherMain == "Volcanic Ash") {
    weatherMain = "smoky";
    weatherBackground = "http://img08.deviantart.net/6ff8/i/2016/169/d/a/black_smoke_by_followintheblackbird-da6s7n9.jpg";
    weatherQuote = "'Love is a smoke made with the fume of sighs.'";
  } else if (weatherMain == "Sandstorm" || weatherMain == "Sand" || weatherMain == "Low Drifting Sand" || weatherMain == "Blowing Sand") {
    weatherMain = "sandy";
    weatherBackground = "https://upload.wikimedia.org/wikipedia/commons/8/8b/Libya_4608_Idehan_Ubari_Dunes_Luca_Galuzzi_2007.jpg";
    weatherQuote = "'Even Castles made of sand, fall into the sea, eventually.'";
  } else if (weatherMain == "Dust Whirls" || weatherMain == "Widespread Dust" || weatherMain == "Low Drifting Widespread Dust" || weatherMain == "Blowing Widespread Dust" || weatherMain == "Haze") {
    weatherMain = "dusty";
    weatherBackground = "https://static.pexels.com/photos/2625/man-person-dust-sport.jpg";
    weatherQuote = "'We have first raised a dust and then complain we cannot see.'";
  } else if (weatherMain == "Freezing Fog" || weatherMain == "Patches of Fog" || weatherMain == "Shallow Fog" || weatherMain == "Partial Fog" || weatherMain == "Fog" || weatherMain == "Fog Patches" || weatherMain == "Mist") {
    weatherMain = "foggy";
    weatherBackground = "https://static.pexels.com/photos/3176/mountains-forest-fog-mist.jpeg";
    weatherQuote = "'Truth is the torch that gleams through the fog without dispelling it.'";
  } else if (weatherMain == "Ice Pellets" || weatherMain == "Hail" || weatherMain == "Ice Pellet Showers" || weatherMain == "Hail Showers" || weatherMain == "Small Hail Showers" || weatherMain == "Small Hail") {
    weatherMain = "hailing";
    weatherBackground = "http://i.vimeocdn.com/video/500863442_1280x720.jpg";
    weatherQuote = "'Insults are pouring down on me as thick as hail.'";
  } else {
    weatherMain = "unknown";
    weatherBackground = "https://c2.staticflickr.com/8/7378/16227211829_fc998c19c4_b.jpg";
    weatherQuote = "The window has been block...I can't find anything to show you (weahtherQuote)";
  }
  
  //setting HTMLtext and attributes

  $("#weather-city").text("Hello, citizen of " + weatherCity + ".");
  $("#api-loader").text("");
  $("#weather-main").text("It´s " + temperatur + " and " + weatherMain + " outside.");
  $("#weather-quote").text(weatherQuote);
  $("#full-background").attr("src", weatherBackground);
  $("#wunderground").attr("src", iconLink);

}

//onload API and set HTML values
$(document).ready(function() {
  reloadFunction();
});

//toggle settinbutton
$(".icon-button").hide();

function settingFunction() {
$(".icon-button").toggle();
}


//tempchange button

function tempFunction() {
  if (celsius === true) {
    temperatur = response.current_observation.temp_f + " F°";
    $("#weather-main").text("It´s " + temperatur + " and " + weatherMain + " outside.");
    celsius = false;
  } else {
    temperatur = response.current_observation.temp_c + " C°";
    $("#weather-main").text("It´s " + temperatur + " and " + weatherMain + " outside.");
    celsius = true;
  }
}
