async function lockedProfile() {

    const divWrapper = document.getElementById('main');
    divWrapper.innerHTML = '';
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const response = await fetch(url);
    const data = await response.json();

    const entries = Object.entries(data);



    for (const line of entries) {

        let userId = line[0];
        let userName = line[1].username;
        let userAge = line[1].age;
        let userEmail = line[1].email;

        let cardHolder = document.createElement('div');
        cardHolder.className = 'profile';
        cardHolder.innerHTML = `
        <img src="./iconProfile2.png" class="userIcon">
        
        <label>Lock</label>
        
        <input type="radio" name="${userId}" value="lock" checked="">
        
        <label>Unlock</label>
        
        <input type="radio" name="${userId}" value="unlock"><br>
        
        <hr>
        
        <label>Username</label>
        
        <input type="text" name="${userId}" value="${userName}" disabled="" readonly="">
        
        <div id="${userId}" style="display: none;">

            <label>Email:</label>
            <input type="email" name="${userId}" value="${userEmail}" disabled="" readonly="">
            <br>
            <label>Age:</label>
            <input type="email" name="${userId}" value="${userAge}" disabled="" readonly="">
        </div>
        <br>
        <button>Show more</button>`;

        divWrapper.appendChild(cardHolder);


    }

    const btns = [...document.getElementsByTagName('button')];
    btns.forEach(btn => btn.addEventListener('click', showHide));
 
    function showHide(event) {
        const button = event.target;
        const profile = button.parentNode;
        const moreInformation = profile.getElementsByTagName('div')[0];
        const lockStatus = profile.querySelector('input[type="radio"]:checked').value;
 
        if (lockStatus === 'unlock') {
            if (button.textContent === 'Show more') {
                moreInformation.style.display = 'inline-block';
                button.textContent = 'Hide it';
            } else if (button.textContent === 'Hide it') {
                moreInformation.style.display = 'none';
                button.textContent = 'Show more';
            }
        }
    }



}