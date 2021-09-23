const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.display');
const time = document.querySelector('.time');
const icon = document.querySelector('.iconImg');

const updateUI = (data) => {

    const {cityDet,weatherDet} = data;

    details.innerHTML = `
        <h3>${cityDet.EnglishName}</h3>
        <div class="t2">
            ${weatherDet.WeatherText}
        </div>
        <div class="t3">
            <span>${weatherDet.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    let iconSrc = `img/icons/${weatherDet.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    let timeSrc = weatherDet.IsDayTime?'img/dayfinal.jpg':'img/nightfinal.jpg';
    time.setAttribute('src',timeSrc);

    if(card.classList.contains('hide')){
        card.classList.remove('hide');
    }

}
const updateCity = async(cityName) => {

    const cityDet = await getCityDet(cityName);
    const weatherDet = await getWeatherDet(cityDet.Key);

    return {cityDet,weatherDet};
}



cityForm.addEventListener('submit',e=>{
    e.preventDefault();

    const cityName = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(cityName)
        .then((data)=>{
            updateUI(data);
        })
        .catch((err)=>{
            console.log(err);
        });
    localStorage.setItem('city',cityName);
});

if(localStorage.getItem('city')){
 updateCity(localStorage.getItem('city'))
    .then((data)=>{
        updateUI(data);
    })
    .catch(()=>{
        console.log(err);
    })
}

