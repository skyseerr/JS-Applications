async function attachEvents() {
    const textArea = document.getElementById('messages');
    const getMsgBtn = document.getElementById('refresh');
    getMsgBtn.addEventListener('click', getMessages);
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', sendMessage);



    async function getMessages() {
        const url = 'http://localhost:3030/jsonstore/messenger';

        const response = await fetch(url);
        const data = await response.json();

        const dataFromUrl = Object.entries(data);

        for (const line of dataFromUrl) {

            let author = line[1].author;
            let content = line[1].content;

            textArea.value += `${author}: ${content}  \n`;

        }
    }

    async function sendMessage() {

        const authName = document.querySelector("#controls > input[type=text]:nth-child(2)").value;
        const authMsg = document.querySelector("#controls > input[type=text]:nth-child(5)").value;

        let data = {
            'author': authName,
            'content': authMsg,
        }


        const response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
    }




}

attachEvents();