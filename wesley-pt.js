let HTML = `
<link rel="stylesheet" href="styles.css"/>
<div class="Bot">
<div class="TextoBolinha">
     <p>Vamos conversar sobre o seu projeto de adequação à LGPD?</p>
</div>
<div class="Bolinha">
 <img class="Foto" src="foto.jpg" />
</div>
</div>


<div class="TelaBot some">
    <div class="Cabecalho">
        <div class="FotoCab">
            <img class="Foto" src="foto.jpg"/>
            <p class="PFoto">Wesley Souza</p>
        </div>
        <div class="Sair">
            <p> X </p>   
        </div>
    </div>
    <div class="Conversa">
         <div class="MenEu">
            <p>Vamos conversar sobre o seu projeto de adequação à LGPD?</p>
         </div>
         <div class="MenCli">
            <p>Olá, vamos sim</p>
         </div>
    </div>
    <input class="Campo" />
</div>

`

//document.body.innerHTML += HTML;

setInterval(function(){
    const texto1 = document.querySelector('.TextoBolinha').classList.add('some');
},5000);



const bot = document.querySelector('.Bolinha');
bot.addEventListener("click", ()=>{
    document.querySelector('.TelaBot').classList.toggle('some');
    bot.classList.add('some');
})

const sair = document.querySelector('.Sair');
sair.addEventListener("click", ()=>{
    document.querySelector('.TelaBot').classList.toggle('some');
    bot.classList.remove('some');
})

// -------------------- Inicia ChatBot ------------------------------------------------------------ 
const update = {
    'credencial':{
        'token': 'e1d1f5fac5b182348b77310f18b9b4a1'
    }
    };
    
    const options = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(update),
    };

const endpoint = 'http://api.jepherson.com.br/chat.php';

fetch(endpoint, options)
    .then(response => {
        response.json()
            .then(
                data => {
                    setBotConfig(data);
            //Demais ações aqui
                })
    })
    .catch(error => {
        console.log(error);
    })

const setBotConfig= (data) => {
  
}
// ----------------------- APIs --------------------------------------------------------------------


  
/*
                TRATAMENTO  DE ERRO
  
      fetch('http://api.jepherson.com.br/start_chat.php',options)
      .then(data => {
          if (!data.ok) {
            throw Error(data.status);
           }
           return data.json()}).then(update => {
            console.log(update);}).catch(e => {
      console.log(e);
      });
*/
function pega_config(){
    var url = 'http://api.jepherson.com.br/configuration.php'
    var body = {
        'credencial':{
            'token': 'e1d1f5fac5b182348b77310f18b9b4a1'
        }
    }
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader('Cache-Control', 'no-cache')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(body))
    request.onload = function(){
        console.log(this.responseText)
    }
    const code_chat = request.responseText.code_chat
    console.log(code_chat)
}

function abrir_chat(){
    var url = "http://api.jepherson.com.br/start_chat.php"
    var body = {
        "credencial":{
            "token": "e1d1f5fac5b182348b77310f18b9b4a1"
        }
    }
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Cache-Control", "no-cache")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))
    request.onload = function(){
        console.log(this.responseText)
    }
    return request.responseText
}

function chat_aberto(){
    var url = "http://api.jepherson.com.br/list_chat.php"
    var body = {
        "credencial":{
            "token": "e1d1f5fac5b182348b77310f18b9b4a1"
        }
    }
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Cache-Control", "no-cache")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))
    request.onload = function(){
        console.log(this.responseText)
    }
    const code_chat = request.responseText.code_chat
    return request.responseText
}

function busca_chat(){
    var url = "http://api.jepherson.com.br/chat.php"
    var body = {
        "credencial":{
            "token": "e1d1f5fac5b182348b77310f18b9b4a1"
        },
        
        "code_chat": code_chat,
        "chat_client":"ola"
    }
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Cache-Control", "no-cache")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))
    request.onload = function(){
        console.log(this.responseText)
    }
    return request.responseText
}

function fecha_chat(){
    var url = "http://api.jepherson.com.br/end_chat.php"
    var body = {
        "credencial":{
            "token": "e1d1f5fac5b182348b77310f18b9b4a1"
        },
        "code_chat": code_chat
    }
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Cache-Control", "no-cache")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))
    request.onload = function(){
        console.log(this.responseText)
    }
    return request.responseText
}

// -------------------------------------fim das APIs -------------------------------------------

function fecha_30(data){
    let data1 = new Date();
    console.log(data1)
    
    let data2 = new Date(data1.getUTCFullYear(), data1.getUTCMonth(), data1.getUTCDate(), data1.getUTCHours()-3, (data1.getUTCMinutes()+30))
    if (data1 = data2){
        fecha_chat()
        console.log(data2)
    }
}

function inatividade(){
    setInterval(function() {
    let data1 = new Date();
    console.log(data1)

    let response = busca_chat();
    let data2 = response.date 

    }, 300000);
}

  
function criaBalao(){


}












