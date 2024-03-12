const changeLocation = document.getElementById('change-location')
const card = document.getElementById('card')
const details = document.getElementById('details')
const weatherIcon = document.getElementById('weather-icon')
const overlay = document.getElementById('overlay')
const btn = document.getElementsByTagName('button')
changeLocation.city.focus()



const KEY = 'e7704bc895b4a8d2dfd4a29d404285b6'

// request get data

const getData = async(city) => {
    const base = 'https://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&units=metric&appid=${KEY}`
    loader(true)
    const req =  await fetch(base + query)
    const data = await req.json()
    loader(false)
    return data

}




function loader(state){
    if(state){
        overlay.classList.remove('d-none')
    }else{
        overlay.classList.add('d-none')
    }
}


// get weather
const getweather = async(city) => {
    const data = await getData(city)
    return data 
}

const updateui = (weather) => {
    details.innerHTML = `
    <h5 class="mb-3">${weather.name} ${weather.sys.country}</h5>
    <p class="mb-3">${weather.weather[0].main}</p>
    <div class="display-4 mb-3">
      <span>${Math.round(weather.main.temp)}</span>
      <span>&deg;C</span>
    </div>
 
    `
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }

    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
}




changeLocation.addEventListener('submit', (e) =>{
    e.preventDefault()
    const cityname = changeLocation.city.value.trim()
    changeLocation.reset()
    getweather(cityname).then((data) => updateui(data))
})