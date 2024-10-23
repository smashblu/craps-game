function iterateObj(id, loc) {
        numOfObj++
        const newDiv = document.createElement('div');
        const textDiv = document.createElement('div');
        const newImg = document.createElement('img');
        document.body.appendChild(newDiv);
        newDiv.appendChild(textDiv);
        newDiv.appendChild(newImg);
        document.body.insertBefore(newDiv, firstObj);;
        newDiv.setAttribute('id', `chip-${id}`);
        newDiv.setAttribute('class', 'chip-container');
        newDiv.style.left = `${loc}`;
        textDiv.setAttribute('class', 'text-container');
        textDiv.innerHTML = `$${betAmount}`;
        newImg.setAttribute('class', 'chip-text');
        // newImg.setAttribute('id', `chip-text-${id}`); // Not needed as textDiv.innerHTML dictates value
        newImg.setAttribute('src', `../images/chip_${chooseColor(betAmount)}.svg`);
}

function removeObj(id) {
        document.getElementById(`chip-${id}`).remove();
}

function popObj(obj) {
        for (const prop in obj) {
                if (Object.hasOwn(obj, prop)) {
                        return false;
                }
        }
        return true;
}

function boolTest() {
        if (popObj(testObj) === true) {
                boolSwitch = 'no content';
                return;
        }
        boolSwitch = 'has content';
        return;
}

function chooseColor(amount) {
        let chipColor = 0;
        switch (amount) {
                case 1:
                        chipColor = 'white';
                        break;
                case 2:
                        chipColor = 'red';
                        break;
                case 3:
                        chipColor = 'green';
                        break;
                case 4:
                        chipColor = 'black';
                        break;
        }
        return chipColor;
}

let numOfObj = 0;
let betAmount = 2;
let testObj = {};
let boolSwitch = 'none';
const objArray = [];
const iterateButton = document.getElementById('iterate');
const firstObj = document.getElementById('first');
const lastObj = document.getElementById('last');

// iterateButton.addEventListener('click', iterateObj);
