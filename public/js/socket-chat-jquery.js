var params = new URLSearchParams(window.location.search);

let divUsuarios = document.getElementById('divUsuarios');
let formEnviar = document.getElementById('formEnviar');
let txtMensaje = document.getElementById('txtMensaje');
let divChatbox = document.getElementById('divChatbox');

function renderPersons(persons) {


    console.log(persons);

    let html = '';

    html += 
    `<li>
        <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('room')}</span></a>
    </li>`
    
    for (let i = 0; i < persons.length; i++) {
        html += 
        `<li>
            <a name=${persons[i].id} onclick="obtenerId(this.name);" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${persons[i].name}<small class="text-success">online</small></span></a>
        </li>`
    };

    divUsuarios.innerHTML = html;
};

function renderMessages(data, yo) {


    let html = '';

    if (yo) {
        html += 
        `<li>
            <div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>
            <div class="chat-content">
                <h5>${data.name}</h5>
                <div class="box bg-light-info">${data.message}</div>
            </div>
            <div class="chat-time">10:57 am</div>
        </li>`
        
    } else {
        
        html += 
        `<li class="reverse">
            <div class="chat-content">
                <h5>${data.name}</h5>
                <div class="box bg-light-inverse">${data.message}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">10:57 am</div>
        </li>`
       
    }

    divChatbox.append(stringToHtml(html));
};

function scrollBottom() {

    divChatbox.scrollTop = divChatbox.scrollHeight - divChatbox.clientHeight;
}

const stringToHtml = function(str) {

    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
}

const obtenerId = ( id ) => {
    console.log( id );
};



// Listeners
formEnviar.addEventListener('submit', function(e){
    e.preventDefault();
    
    if( txtMensaje.value.trim().length === 0 ) return;
    
    // Enviar información
    socket.emit('crear-mensaje', {
        name: params.get('name'),
        message: txtMensaje.value 
    }, function(resp) {
        txtMensaje.value = '';
        renderMessages(resp, true);
        scrollBottom();
    });
    


})