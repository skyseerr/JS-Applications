async function loadStudets(){

    const url = 'http://localhost:3030/jsonstore/collections/students';

    const response = await fetch(url);
    const data = await response.json();

    const tableBody = document.querySelector("#results > tbody");
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', submitStudent);

    let myEntries = Object.entries(data);
    console.log(myEntries);

    for (let line of myEntries) {
     let firstName = line[1].firstName;
     let lastName = line[1].lastName;
     let facultyNumber = line[1].facultyNumber;
     let grade = line[1].grade;

     let tableRow = createEl('tr','','');
     tableBody.appendChild(tableRow);
     tableRow.appendChild(createEl('td',firstName,''));
     tableRow.appendChild(createEl('td',lastName,''));
     tableRow.appendChild(createEl('td',facultyNumber,''));
     tableRow.appendChild(createEl('td',grade,''));
    }

}

async function submitStudent(e){
    e.preventDefault();
    const notify = document.querySelector("#form > p");

    notify.textContent = '';
    const firstName = document.querySelector("#form > div.inputs > input[type=text]:nth-child(1)").value;
    const lastName = document.querySelector("#form > div.inputs > input[type=text]:nth-child(2)").value;
    const facultyNumber = document.querySelector("#form > div.inputs > input[type=text]:nth-child(3)").value;
    const grade = document.querySelector("#form > div.inputs > input[type=text]:nth-child(4)").value;

  if(firstName != '' && lastName != '' && facultyNumber != '' && grade != ''){

    notify.textContent = 'Refresh the page to see the results';

    data = {
        firstName,
        lastName,
        facultyNumber,
        grade,
    };

    const url = 'http://localhost:3030/jsonstore/collections/students';

    const response = await fetch(url, {
        method: 'post',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(data)
    });
  } else{
      notify.textContent = 'All the fields are required';
  }

}

function createEl(type, text, identificator){
    let element = document.createElement(type);

    if(text){
        element.textContent = text;
    }
    if(identificator){
        element.id = identificator;
    }

    return element;
}

loadStudets();