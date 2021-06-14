async function attachEvents() {

    const weaterIcons = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    };

    const codeUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    const getWeatherBtn = document.getElementById('submit');
    getWeatherBtn.addEventListener('click', getWeather);

    const inputField = document.getElementById('location');
    const response = await fetch(codeUrl);
    const data = await response.json();
    let code = '';
    

    async function getWeather() {

        document.getElementById('submit').disabled = 'true';

        document.getElementById('forecast').style.display = 'block';

        for (const line of data) {
            if (line.name == inputField.value) {
                code = line.code;
            }
        }

        let todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
        let upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

        const [todayUrlResp, upcomingUrlResp] = await Promise.all([
            fetch(todayUrl),
            fetch(upcomingUrl)
        ]);

        const todayData = await todayUrlResp.json();
        const upcomingData = await upcomingUrlResp.json();


        todayWeather(todayData);
        upcomingWeather(upcomingData);
    }

    function todayWeather(data) {

        let parentTodayDiv = document.getElementById("current");
        let conditionSymbol = createEl('span', weaterIcons[data.forecast.condition], 'condition symbol');
        parentTodayDiv.appendChild(conditionSymbol);
        let spanCondition = createEl('span', '', 'condition');
        parentTodayDiv.appendChild(spanCondition);
        spanCondition.appendChild(createEl('span', data.name, 'forecast-data'));
        spanCondition.appendChild(createEl('span', (`${data.forecast.low}${weaterIcons.Degrees}/${data.forecast.high}${weaterIcons.Degrees}`), 'forecast-data'));
        spanCondition.appendChild(createEl('span', data.forecast.condition, 'forecast-data'));

    }

    function upcomingWeather(data) {
        let parentDivUpcoming = document.getElementById('upcoming');
        let parentDivForecast = createEl('div', '', 'forecast-info');

        for (const line of data.forecast) {
            parentDivUpcoming.appendChild(parentDivForecast);
            let parentSpanUpcoming = createEl('span', '', 'upcoming');
            parentDivForecast.appendChild(parentSpanUpcoming);
            parentSpanUpcoming.appendChild(createEl('span', weaterIcons[line.condition], 'symbol'));
            parentSpanUpcoming.appendChild(createEl('span', (`${line.low}${weaterIcons.Degrees}/${line.high}${weaterIcons.Degrees}`), 'forecast-data'));
            parentSpanUpcoming.appendChild(createEl('span', line.condition, 'forecast-data'));
        }


    }

    function createEl(type, text, className) {
        let element = document.createElement(type);
        if (text) {
            element.innerHTML = text;
        }
        if (className) {
            element.classList = className;
        }
        return element;
    }

}

attachEvents();