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

setInterval(function(){
    let pergunta = "Pergunta de teste"
    criaPergunta(pergunta);
},6000);


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

const chat = document.querySelector('.Conversa')

// -------------------- Inicia ChatBot ------------------------------------------------------------ 

var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial};
    
     fetch("//api.jepherson.com.br/configuration.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                  const cliente = data.cliente;
                  const code_bot = data.code_bot;
                  const config = data.configuracao
                  //console.log("cliente" )
                  console.log(cliente)
                  //console.log("bot")
                  console.log(code_bot)
                  console.log(config)
    
                  document.querySelector('.Bolinha').style.backgroundImage = 'url(' + config.imagem + ')';
                  document.querySelector('.FotoCab').style.backgroundImage = 'url(' + config.imagem + ')';
                  let css = document.querySelector('.Cabecalho')
                  css.style.backgroundColor = config.cor_borda
                  css.style.textColor = config.cor_letra
                  let textoLateral = document.querySelector('.PLateral')
                  textoLateral.innerHTML = config.descricao;
                  let balao1 = document.querySelector('.Balao1')
                  balao1.innerHTML = config.descricao;
                  
            });

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

function pega_config(){
   
    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial};
    
     fetch("//api.jepherson.com.br/configuration.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                  const cliente = data.cliente;
                  const code_bot = data.code_bot;
                  const config = data.configuracao
                  //console.log("cliente" )
                  console.log(cliente)
                  //console.log("bot")
                  console.log(code_bot)
                  console.log(config)
    
                  let foto = document.querySelector('.Foto')
                  foto.innerHTML = config.imagem;
                  let css = document.querySelector('.Cabecalho')
                  css.style.backgroundColor = config.cor_borda
                  css.style.textColor = config.cor_letra
    
                
                  
            });
}
*/
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

  
function criaPergunta(pergunta){
    
    let BalaoPergunta = `
    <div class="MenCli">
    <p>${pergunta} </p>
    </div>
`
chat.innerHTML += BalaoPergunta;

//const paragrafo = document.querySelector('#Ppergunta')
//paragrafo.innerHTML += pergunta



}

function criaResposta(response){

let BalaoResposta = ` 
    <div class="MenEu">
        <p>${response}</p>
    </div>
    `
    chat.innerHTML += BalaoResposta;
}











