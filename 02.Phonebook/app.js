async function attachEvents() {

    const loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', loadPhonebook);
    const createBtn = document.getElementById('btnCreate');
    createBtn.addEventListener('click', createPeson);
    const ulList = document.getElementById('phonebook');
    ulList.addEventListener('click', (e) => {

        if (e.target.textContent == 'Delete') {
            console.log(e.target.parentNode.id);
            deletePerson(e.target.parentNode.id);
        }

    });


    async function loadPhonebook() {

        const url = 'http://localhost:3030/jsonstore/phonebook';
        ulList.innerHTML = '';
        const response = await fetch(url);
        const data = await response.json();

        let phonebook = Object.entries(data);

        for (const line of phonebook) {
            let name = line[1].person;
            let number = line[1].phone;
            let identificator = line[1]._id;
            let liElement = createEl('li', `${name}: ${number}`, identificator);
            liElement.appendChild(createEl('button', 'Delete', 'btnDelete'));
            ulList.appendChild(liElement);
        }
    }


    async function createPeson() {

        const personField = '';
        const phoneField = '';
        personField = '';
        phoneField = '';
        personField = document.getElementById('person').value;
        phoneField = document.getElementById('phone').value;
        let data = {
            'person': personField.value,
            'phone': phoneField.value,
        };

        const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();


    }

    async function deletePerson(id) {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
            method: 'delete'
        });

        const result = await response.json();


    }

    function createEl(type, text, identificator) {

        let element = document.createElement(type);

        if (text) {
            element.textContent = text;
        }

        if (identificator) {
            element.id = identificator;
        }

        return element;
    }

}

attachEvents();