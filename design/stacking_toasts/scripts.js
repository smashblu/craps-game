function activate() {
    displayMessage('Activate Pressed');
}

function deactivate() {
    displayMessageTwo('Deactivate Pressed');
}

function displayMessage(str) {
    document.getElementById('current-message').innerHTML = str;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(messageTrigger);
    toastBootstrap.show();
}

function displayMessageTwo(str) {
    document.getElementById('second-message').innerHTML = str;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(messageTriggerTwo);
    toastBootstrap.show();
}

let testBool = false;
let testStr = `Test`;
let testNum = 0;
let testArr = [];

const messageTrigger = document.getElementById('test-msg');
const messageTriggerTwo = document.getElementById('test-msg-two');

// document.getElementById('change-text').innerHTML = testStr;
// document.getElementById('change-css').disabled = true;
document.querySelector('#activate').addEventListener('click', activate);
document.querySelector('#deactivate').addEventListener('click', deactivate);
