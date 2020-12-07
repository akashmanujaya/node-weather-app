console.log('Serverside JavaScript Loaded') 

const wheatherFrom =  document.querySelector('form')
const search = document.querySelector('input')

const errorMessage = document.getElementById('errorMessage')
const place = document.getElementById('location')
const latitude = document.getElementById('latitude')
const lognitude = document.getElementById('lognitude')
const tempreture = document.getElementById('tempreture')
const humidity = document.getElementById('humidity')


wheatherFrom.addEventListener('submit', (e) => {

    e.preventDefault() 
    
    errorMessage.textContent = 'Loading Data,,,,,,,,,'
    place.textContent = ''
    latitude.textContent = ''
    lognitude.textContent = ''
    tempreture.textContent = ''
    humidity.textContent = ''

    fetch('http://localhost/weather?address=' + search.value).then((response) =>{ 
        response.json().then((data) =>{
            if(data.error){
                errorMessage.textContent = data.error
            } else{
                errorMessage.textContent = ''
                place.textContent = "Location: " + data.location
                latitude.textContent = "Latitude: " + data.forecast.latitude
                lognitude.textContent = "Lognitude: " + data.forecast.lognitude
                tempreture.textContent = "Tempreture: " + data.forecast.tempreture
                humidity.textContent = "Humidity: " + data.forecast.humidity + "%"
            }
        
        })
    })
})
