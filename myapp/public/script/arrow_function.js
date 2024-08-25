function showModal(modalId) {
    $(modalId).modal('show');
}

function saveDataLineByLine(line,my_type) {
    let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    savedData.push({line,my_type});
    localStorage.setItem('savedData', JSON.stringify(savedData));
}
function getDataByIndex(index) {
    let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    let line = savedData[index].line || null;
    if (line) {
        return line.split(',').map(item => item.trim());
    }
    return null;
}
function updateDataByIndex(index, newContent) {
    let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    if (index >= 0 && index < savedData.length) {
        savedData[index].line = newContent;
        localStorage.setItem('savedData', JSON.stringify(savedData));   
    }
}
function delData(id) {
    let delData = JSON.parse(localStorage.getItem('delData')) || [];
    delData.push(id-1);
    localStorage.setItem('delData', JSON.stringify(delData));
}
function getTypeByIndex(index) {
    let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    let line = savedData[index].my_type || null;
    if (line) {
        return line;
    }
    return null;
}
export function deleteMetadata(){
    var oldItem = document.getElementById('old');
    if (oldItem) {
        console.log('ẻdẻhj');
        oldItem.remove();
    }
    $('#JsonModal-edit').modal('hide');
}
export function deleteQuery() {
    if (currentQueryElement) {
        let a=getTypeByIndex(currentQueryElement.id-1);
        if(a[0]=='2'){
            let cardId=a.slice(1);
            let card = document.getElementById(cardId);
            if (card) {
                card.classList.toggle('clicked'); 
            }   
        }
        delData(currentQueryElement.id);
        currentQueryElement.remove();
        $('#textModal-edit').modal('hide');
        $('#imageModal-edit').modal('hide');
        $('#colorModal-edit').modal('hide');            
    }
}
export const handleSubmenuClickOption = () => {
document.querySelectorAll('.sub-menu a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        
        const linkText = event.target.innerText.trim().toLowerCase();

        if (linkText === 'text') {
            showModal('#textModal');
        } else if (linkText === 'image') {
            showModal('#imageModal');
        } else if (linkText === 'color') {
            showModal('#colorModal');
        }else if (linkText === 'draw') {
            showModal('#drawModal');
        }
    });
});
};
function JsonModal(){
    showModal('#JsonModal-edit');
    document.getElementById("Json-edit").value = getJson();
}
export const handleHistorySubmenu = () => {
document.getElementById('history-submenu').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {

        event.preventDefault(); 
        var linkText12 = event.target.innerText.trim().toLowerCase();
        var id = linkText12.match(/\d+/);
        if(linkText12.endsWith('.json')){
            JsonModal();
            return;
        }
        var case_option=linkText12.split(':')[1].trim();
        if(case_option==='text'){
            showModal('#textModal-edit');
            var txt=getDataByIndex(id-1);
            document.getElementById("time-edit").value = txt[0];
            document.getElementById("place-edit").value = txt[1];
            document.getElementById("description-edit").value = txt[2];
        }
        if(case_option==='image'){
            showModal('#imageModal-edit');

            var txt=getDataByIndex(id-1);
            document.getElementById('defaultImage-edit').src = txt;

        }
         if(case_option==='color'){
            showModal('#colorModal-edit');
            var txt=getDataByIndex(id-1);
            // Cập nhật giá trị input
            document.getElementById('colorPicker-1').value = txt;
        }
        if(case_option==='draw'){
            showModal('#imageModal-edit');
            var txt=getDataByIndex(id-1);
            document.getElementById('defaultImage-edit').src = txt;
        }
    }
});
};

export  const ShowOption = (e) => {
    const arrowParent = e.currentTarget.parentElement;
    arrowParent.classList.toggle("showMenu");
    handleSubmenuClickOption();
    handleHistorySubmenu();
  };

function addQueryToHistory(index, type) {
    var historyMenu = document.getElementById('history-submenu');
    var newItem = document.createElement('li');
    newItem.innerHTML = `<a href="#" id=${index} onclick="showSelectedModal(this)"   >Query ${index} : ${type}</a>`;
    historyMenu.appendChild(newItem);
}

export const saveText = () => {
   var time = document.getElementById("time").value;
    var place = document.getElementById("place").value;
    var description = document.getElementById("description").value;
    //gom lại dễ xử lý
    var query = time+", "+place+", "+ description;
    saveDataLineByLine(query,'1');
    $('#textModal').modal('hide');
    //reset lại
    document.getElementById("time").value = "";
    document.getElementById("place").value = "";
    document.getElementById("description").value = "";
    addQueryToHistory(query_index, "Text");
    query_index+=1
};

function compressImg(img, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Nén ảnh
        var compressedImg = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedImg);
    });
}
export const saveImg=(inputSelector)=> {
    var fileInput = document.querySelector(inputSelector);
    var file = fileInput.files[0];
    
    if (file && file.type.startsWith('image/')) {
        var reader = new FileReader();   
        reader.onload = function(e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                compressImg(img).then(compressedImg => {
                    saveDataLineByLine(compressedImg,'1');
                    addQueryToHistory(query_index, "Image");
                    query_index += 1;
                    $('#imageModal').modal('hide');
                });
            }
        };
        reader.readAsDataURL(file);
    }
}
function saveImg2(imgPath,id) {
    fetch(imgPath)
        .then(response => response.blob())
        .then(blob => {
            var img = new Image();
            img.src = URL.createObjectURL(blob);
            img.onload = function() {
                compressImg(img).then(compressedImg => {
                    saveDataLineByLine(compressedImg,'2'+id);
                    addQueryToHistory(query_index, "Image");
                    query_index += 1;
                    $('#imageModal').modal('hide');
                });
            };
        })
        .catch(error => {
            console.error("Error loading image:", error);
        });
}
export const saveChange=()=>{
    if (currentQueryElement) {
        var text = currentQueryElement.textContent || currentQueryElement.innerText;
        var parts = text.split(':');
        var result = parts.length > 1 ? parts[1].trim() : '';
        var id=currentQueryElement.id;
        if(result.toLowerCase()==='text'){            
            var time = document.getElementById("time-edit").value;
            var place = document.getElementById("place-edit").value;
            var description = document.getElementById("description-edit").value;
            var query = time+", "+place+", "+ description;
            updateDataByIndex(id-1,query);
            $('#textModal-edit').modal('hide');
        }     
        if(result.toLowerCase()==='color'){
            var query = document.getElementById('colorPicker-1').value;
            updateDataByIndex(id-1,query);
            $('#colorModal-edit').modal('hide');   
        }
        if(result.toLowerCase()==='image'){
            var fileInput = document.getElementById('related_image');
            var file = fileInput.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var img = e.target.result;
                    updateDataByIndex(id-1,img);
                    document.getElementById('defaultImage-edit').src = img;
                };
                reader.readAsDataURL(file);
            }
            $('#imageModal-edit').modal('hide');
        }
    }
}
export const saveColor =()=>{
    var color = document.getElementById('dominant_color').value;
    saveDataLineByLine(color,'1');
    $('#colorModal').modal('hide');            
    addQueryToHistory(query_index, "Color");
    query_index+=1;
}
// draw.js

export function changeBackgroundColor(event) {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = event.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function clearCanvas() {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function savePaint() {
  const canvas = document.getElementById('paintCanvas');
  const dataURL = canvas.toDataURL('image/png');
      $('#drawModal').modal('hide');
    saveDataLineByLine(dataURL,'1');
    addQueryToHistory(query_index, "Draw");
    query_index+=1
    clearCanvas();
  // Save the image data, e.g., send it to the server or download
}
export function initializeCanvas() {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  let painting = false;

  function startPosition() {
    painting = true;
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

function draw(event) {
    if (!painting) return;

    const rect = canvas.getBoundingClientRect(); // Lấy kích thước và vị trí của canvas
    const x = event.clientX - rect.left; // Tính vị trí X tương đối với canvas
    const y = event.clientY - rect.top;  // Tính vị trí Y tương đối với canvas

    ctx.lineWidth = document.getElementById('brushSize').value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('colorPicker').value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mousemove', draw);
}

export function Ouput_Appearance(imageObjects) {

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ''; 

    // Tạo IntersectionObserver để tải ảnh khi nó xuất hiện trên màn hình
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Sử dụng dataset để lưu trữ base64
                observer.unobserve(img); // Dừng quan sát khi ảnh đã được tải
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });

    // Xử lý từng đối tượng ảnh
    imageObjects.forEach(imageObject => {
        const card = document.createElement("div");
        const fileName = imageObject.filename; // Sử dụng filename từ đối tượng
        card.className = "card";
        card.id = `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const img = document.createElement("img");
        img.dataset.src = imageObject.data; // Sử dụng data base64
        img.alt = fileName;
        img.loading = "lazy";

        const name = document.createElement("div");
        name.className = "name";
        name.innerText = fileName;

        card.appendChild(img);
        card.appendChild(name);
        addToQuery(card, imageObject.data); // Truyền data base64 cho hàm addToQuery

        gallery.appendChild(card);
        observer.observe(img); // Bắt đầu quan sát ảnh
    });
}
function convert(a) {
    let b = [];
    for (let key in a) {
        if (a.hasOwnProperty(key)) {
            b.push(a[key].line);
        }
    }
    return b;
}

let lastClickTime = 0;
export const StartQuery = () => {
    document.getElementById('start-query').addEventListener('click', function (event) {
         const currentTime = Date.now();
            let savedData = convert(JSON.parse(localStorage.getItem('savedData')))|| [];
            let delData = JSON.parse(localStorage.getItem('delData')) || [];
            let Json=getJson();
            let filteredData = savedData.filter((_, index) => !delData.includes(index));
        if(currentTime-lastClickTime>1000){
            fetch('http://127.0.0.1:8080/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: filteredData,metadata:Json })  // Đặt danh sách vào một đối tượng JSON
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Kiểm tra dữ liệu trả về từ server
                Ouput_Appearance(data['images']);
            });
            lastClickTime = currentTime;
        }
        }, { once: true }); // Chỉ gọi listener một lần
}// 

function triggerFileUpload() {  
    document.getElementById('file-input').click();
}
export const readJsonFile=(event) =>{
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            try {
                const jsonContent = JSON.parse(contents);
                addMetaData(file.name);
                saveJsonData(jsonContent);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return "";
            }
        };
        reader.readAsText(file);
    }
}
export const Upload = () => {
    const uploadLink = document.getElementById('upload-link');
    if (uploadLink) {
        uploadLink.removeEventListener('click', handleUploadClick);
        uploadLink.addEventListener('click', handleUploadClick);
    }
}

function addMetaData(name) {
    var historyMenu = document.getElementById('history-submenu');
    var oldItem = document.getElementById('old');
    if (oldItem) {
        oldItem.remove();
    }
    var newItem = document.createElement('li');
    newItem.innerHTML = `<a href="#" onclick="showSelectedModal(this)" id='old'>${name}</a>`;
    historyMenu.appendChild(newItem);
}
const handleUploadClick = (event) => {
    event.preventDefault();
    triggerFileUpload();
}
function addToQuery(card,filepath){
   card.addEventListener("click", function() {
        if(card.classList.contains('clicked')){
            return;
        }
        else{
            saveImg2(filepath,card.id) ;
            var newItem = document.createElement('li');
            newItem.innerHTML = `<a href="#" id=${query_index} onclick="showSelectedModal(this)"   >Query ${query_index} : Image</a>`;
        }
        card.classList.toggle('clicked');
    });
}