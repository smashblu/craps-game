function iterateObj(id) {
        numOfObj++
        const newDiv = document.createElement('div');
        const newContent = document.createTextNode(`Object #${id}`);
        newDiv.appendChild(newContent);
        document.body.insertBefore(newDiv, firstObj);;
        newDiv.setAttribute('id', `obj${id}`);
}

let numOfObj = 0;
const objArray = [];
const iterateButton = document.getElementById('iterate');
const firstObj = document.getElementById('first');
const lastObj = document.getElementById('last');

// iterateButton.addEventListener('click', iterateObj);
