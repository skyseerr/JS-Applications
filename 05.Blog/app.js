async function attachEvents() {
    //<-- get server data for posts;
    const url = `http://localhost:3030/jsonstore/blog/posts`;
    const response = await fetch(url);
    const dataPosts = await response.json();
    // -->

    const options = document.getElementById('posts');
    const viewBtn = document.getElementById('btnViewPost');
    viewBtn.addEventListener('click', viewPost);

    const entries = Object.entries(dataPosts);
    let title = document.getElementById('post-title');
    let body = document.getElementById('post-body');

    // <-- fill ul list with options from server data;
    for (const line of entries) {
        let id = line[0];
        let title = line[1].title;
        options.appendChild(createEl('option', id, title));
    }
    // -->

    // <-- make second GET request to the server on viewBtn click
    // filter and show the coments in DOM;
    async function viewPost() {
        const ulList = document.getElementById('post-comments');
        ulList.innerHTML = '';
        const value = options.value;
        title.innerHTML = '';
        title.textContent = dataPosts[value].title;
        body.innerHTML = '';
        body.textContent = dataPosts[value].body;

        //<-- get server data for comments;
        const url = `http://localhost:3030/jsonstore/blog/comments`;
        const response = await fetch(url);
        const data = await response.json();
        //-->

        // <-- filter data with selected id;
        let filteredData = Object.values(data).filter(d => d.postId == value);
        //-->
        //<-- create li element for every filtered comment;
        for (const line of filteredData) {
            ulList.appendChild(createEl('li', '', line.text));
        }
        // -->
    }
    // -->

    // <-- shortHand function for createing elements;

    function createEl(type, value, text) {
        let element = document.createElement(type);

        if (value) {
            element.value = value;
        }
        if (text) {
            element.textContent = text;
        }

        return element;
    }
    //-->
}

attachEvents();