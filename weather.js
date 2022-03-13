const input = document.getElementsByTagName("input")[0];
const submit = document.getElementsByTagName("button")[0];
const message = document.getElementsByClassName("msg")[0];
const cities = document.getElementsByClassName("cities")[0];
const myKey = '091aa3985d82e56827ee47765e6e3897';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const citiesArr = [];

submit.addEventListener("click", (e)=>{
    let city = input.value;
    showWeather(city)
    input.value = ""
    e.preventDefault()
})

async function showWeather(city){
    const url = `${baseURL}${city}&appid=${myKey}&units=metric&lang=tr`
    const response = await fetch(url)
    const data = await response.json()
    try {
        if(!citiesArr.includes(city)){
            cities.innerHTML += `<ul class="city">
            <li class="city-name"> ${data.name}<sup> ${data.sys.country}</sup></li>
            <li class="city-temp"> ${Math.round(data.main.temp)}<sup>${"°C"}</sup></li> 
            <li><img class="city-icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="icon"></li>
            <li><figcaption> ${data.weather[0].main} <figcaption></li>
            </ul>`
            citiesArr.push(city)
        }
        else {
            message.innerText = `You already know the weather for ${data.name},Please search for another city`
            setTimeout(() => {
                message.innerText=""
            }, 3000);
        }
    } catch (error) {
        message.innerText = `No city with this name found`
            setTimeout(() => {
                message.innerText=""
            }, 3000);
    }
}

