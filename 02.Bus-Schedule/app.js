function solve() {

    const departBtn = document.querySelector("#depart");
    const arriveBtn = document.querySelector("#arrive");
    const banner = document.querySelector("#info > span");

    let stopId = '';
    let nextStopId = '';
    let allStops = '';

    async function depart() {

        const url = `http://localhost:3030/jsonstore/bus/schedule/`;
        const response = await fetch(url);
        const data = await response.json();
        allStops = data;
        arriveBtn.removeAttribute('disabled');
        departBtn.setAttribute("disabled", true);
        
        if(banner.textContent == 'Not Connected'){
            stopId = 'depot';
            nextStopId = data[stopId].next;
            banner.textContent = `Departed from ${data[stopId].name}`
        } else {
            stopId = nextStopId;
            nextStopId = data[stopId].next;
            banner.textContent = '';
            banner.textContent = `Departed from ${data[stopId].name}`;
        }
    }
    
    function arrive() {
        departBtn.removeAttribute('disabled');
        arriveBtn.setAttribute("disabled", true);
        banner.textContent = `Arrived at ${allStops[stopId].name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();