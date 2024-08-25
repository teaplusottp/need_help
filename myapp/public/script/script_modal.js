
//script modal

var query_index = 1 ;
let currentItemId = null;


let currentQueryElement = null;

//modal
function showSelectedModal(element) {
    currentQueryElement = element;
}
function getFileName(path) {
    return path.split('/').pop(); 
}
function deleteMetadata() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/delete_metadata", true);
    xhr.onload = function () {
        location.reload();
    }
    xhr.send();
}

function triggerColorPicker() {
    document.getElementById('colorInput').click();
}

function setColor(color) {
    document.getElementById('dominant_color').value = color;
    const customColor = document.querySelector('.custom-color');
    customColor.style.backgroundColor = color;
}

function removeQuery(button) {
    button.parentElement.remove();
}

function startProcessing() {
}
function saveJsonData(jsonContent) {
    let saveJson = [];
    saveJson.push(jsonContent);
    localStorage.setItem('saveJson', JSON.stringify(saveJson));
}
function getJson(){
    let saveJson = JSON.parse(localStorage.getItem('saveJson')) || {};
    return JSON.stringify(saveJson, null, 2);
}