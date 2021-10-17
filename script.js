const url1 = "https://ipinfo.io/json";
getapi(url1);
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    let city = data.city;
    let region = data.region;
    getapi1(city, region, data);
}
async function getapi1(city, region, data) {
    const url2 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + region + "&appid=aadbc37c25511db19062a5d143defe01";
    const response = await fetch(url2);
    var weather_data = await response.json();
    console.log(weather_data);
    document.getElementById("city").innerText = weather_data.name + ", " + region + ", " + weather_data.sys.country;
    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    let temperature = document.getElementById('temp');
    temperature.innerHTML = displayTemp(weather_data.main.temp);

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = displayTemp(weather_data.main.temp_min)+"(min)/"+displayTemp(weather_data.main.temp_max)+"(max)";

    let weatherType = document.getElementById('weather');
    let weather_type=weather_data.weather[0].main
    weatherType.innerText = weather_type;


    if( weather_type== 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
        
    } else if(weather_type == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    } else if(weather_type == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    }     else if(weather_type == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if(weather_type == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weather_type == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } else{
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }

}
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return date+" "+month+" "+day+" "+year;
}
function displayTemp(fTemp){
     return Math.round((fTemp - 32) * (5/9)) + "&#8451";
  }