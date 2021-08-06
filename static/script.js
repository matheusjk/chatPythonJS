// window.onload = function(){
//     // const socket = io('http://127.0.0.1:59000');
//     const socket = io('http://192.168.0.13:59000');

//     function addToChat(msg){
//         const span = document.createElement("span");
//         const chat = document.querySelector(".chat")
//         span.innerHTML = `<strong> ${msg.nome}: </strong> ${msg.message} ${msg.dataFormatada}`
//         chat.append(span);
//     }

//     socket.on('connect', () => {
//         socket.send('Usuario conectado ao socket');
//         console.log(socket.connected)
//     });
    
//     document.querySelector("form").addEventListener("submit", function(event){
//         event.preventDefault(); // tirando refresh automatico da pagina
//         var dataHora = new Date()
//         const dataFormatada = dataHora.getDay() + "/" + dataHora.getMonth()+1 + "/" + dataHora.getFullYear() + " " + dataHora.getHours() + ":" + dataHora.getMinutes() + ":" + dataHora.getSeconds()
//         // console.log(dataFormatada)

//         socket.emit('sendMessage', {nome: event.target[0].value, message: event.target[1].value, dataFormatada: dataFormatada}) // enviando as infos para o backend
//         event.target[0].value = "";
//         event.target[1].value = "";
//         // event.target[2].value = "";
//     });

//     socket.on('getMessage', (msg) =>{
//        addToChat(msg)
//     })

//     socket.on('message', (msgs) => {
//         for(msg of msgs){
//             addToChat(msg)
//         }
//         // console.log(msgs)
//     })

// }

$(document).ready(function(){

    var socket = io.connect('http://192.168.0.13:59000');
    
    var socket_messages = io("http://192.168.0.13:59000/messages");

    $("#send").on('click', function(){
        var message = $('#message').val();

        socket_messages.emit('mensagem do usuario', message);
    });

    socket_messages.on('vindo do flask', function(msg){
        alert(msg);
    });

    socket.on('origem servidor', function(msg){
        alert(msg);
    });

    var private_socket = io('http://192.168.0.13:59000/private')

    $('#send_username').on('click', function(){
        private_socket.emit('username', $('#username').val());
    });
})
