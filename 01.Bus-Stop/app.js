async function getInfo() {

    try {
        const inputText = document.getElementById('stopId').value;
        const url = `http://localhost:3030/jsonstore/bus/businfo/${inputText}/`;
    
        const stopName = document.getElementById('stopName');
        const ulBuses = document.getElementById('buses');
        ulBuses.innerHTML = '';
        stopName.textContent = '';
    
        const response = await fetch(url);
        const data = await response.json();
    
        stopName.textContent = data.name;
        const buses = Object.entries(data.buses);
    
        for (const bus of buses) {
    
            const liElelemt = document.createElement('li');
            liElelemt.textContent = `Bus ${bus[0]} arrives in ${bus[1]}`;
            ulBuses.appendChild(liElelemt);
        }
    } catch (error) {
        document.getElementById('stopName').textContent = 'Invalid bus Number';
    }

}