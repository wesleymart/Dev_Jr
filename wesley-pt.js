let HTML = `
<link rel="stylesheet" href="styles.css"/>
<div class="Bot">
<div class="TextoBolinha">
     <p class="PLateral"></p>
</div>
<div class="Bolinha">
 <img class="Foto" />
</div>
</div>
<div class="TelaBot some">
    <div class="Cabecalho">
        <div class="FotoCab">
        </div>
        <p class="PFoto">Wesley Souza</p>
        <div class="Sair">
            <p> _ </p>   
        </div>
        <div class="Finalizar">
            <p class="Fechar"> X </p>   
        </div>
    </div>
    <div class="Conversa" >
         <div class="MenEu">
            <p class="Balao1"></p>
         </div>
    </div>
    <input  class="Campo" placeholder="Digite sua pergunta" />
</div>
`

document.body.innerHTML += HTML;
const chat = document.querySelector('.Conversa')
setTimeout(CincoSegundos, 5000);
let contador = localStorage.getItem("Contador")
if(contador == null || contador == undefined){
     contador = 0
     localStorage.setItem('Contador', contador) 
 }


function CincoSegundos(){
    const texto1 = document.querySelector('.TextoBolinha').classList.add('some');
}

var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial};
    
     fetch("//api.jepherson.com.br/configuration.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                if (!data.status === 200) {
                    throw Error(data.status);
                   }else{
                  const config = data.configuracao
                  let direcaoTela = document.querySelector('.TelaBot')
                  let direcaoBola = document.querySelector('.Bot')
                  if(config.direcao == "left"){
                    direcaoBola.style.left = "40px"
                    direcaoTela.style.left = "40px"
                  }else{
                    direcaoBola.style.right = "40px"
                    direcaoTela.style.right = "40px"
                  }
                  document.querySelector('.Bolinha').style.backgroundImage = 'url(' + config.imagem + ')';
                  document.querySelector('.FotoCab').style.backgroundImage = 'url(' + config.imagem + ')';
                  let css = document.querySelector('.Cabecalho')
                  css.style.backgroundColor = config.cor_borda
                  css.style.textColor = config.cor_letra
                  let textoLateral = document.querySelector('.PLateral')
                  textoLateral.innerHTML = config.descricao;
                  let balao1 = document.querySelector('.Balao1')
                  balao1.innerHTML = config.descricao;
                }
            
            }).catch(e => {
                console.log(e);
                });
const sair = document.querySelector('.Sair');
sair.addEventListener("click", ()=>{
    document.querySelector('.TelaBot').classList.toggle('some');
    bot.classList.remove('some');
})

const fechar = document.querySelector('.Finalizar');
fechar.addEventListener("click", ()=>{
    let code_do_chat = localStorage.getItem("Codigo_do_chat")
    document.querySelector('.TelaBot').classList.toggle('some');
    bot.classList.remove('some');
    fecha_chat(code_do_chat)

})

const bot = document.querySelector('.Bolinha');
bot.addEventListener("click", ()=>{
    document.querySelector('.TelaBot').classList.toggle('some');
    bot.classList.add('some');
      if(contador == 0 ){
          abrir_chat()
          
          setInterval(function(){
                                let codchat = localStorage.getItem("Codigo_do_chat") 
                                inatividade(codchat)
                                },1000*60*5);
        }else{
        chat.innerHTML = `
        <div class="MenEu">
            <p>Vamos conversar sobre o seu projeto de adequação à LGPD?</p>
        </div>`
        for(let i = 1 ; i<= contador; i++){
            let pergunta = localStorage.getItem("Pergunta" + i) 
            RestauraPergunta(pergunta)
            let resposta = localStorage.getItem("Resposta" + i) 
            RestauraResposta(resposta)
        }
        setInterval(function(){
            let cod_chat = localStorage.getItem("Codigo_do_chat") 
            inatividade(cod_chat)
         },1000*60*5);
      }

})

function fecha_chat(){
    let code_do_chat = localStorage.getItem("Codigo_do_chat")
    localStorage.clear()
    chat.innerHTML = ""
    location.reload();
     var credencial = {token:'13ba540599f9e536945e28c59421c36a'}
     const body={ 
         credencial: credencial,
         code_chat: code_do_chat
     };
      fetch("//api.jepherson.com.br/end_chat.php",
               {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
             .then((data) =>{
                 if (!data.ok) {
                     throw Error(data.status);
                    }
                    return data.json()}).then(update => {
                     console.log(update);}).catch(e => {
               console.log(e);
               });
    
}

function enviarPergunta(codigo_chat){
    console.log(codigo_chat)
const campo = document.querySelector('.Campo')
campo.onkeydown = function (evento) {

    if (evento.code === 'Enter') {
        criaPergunta(campo.value, codigo_chat)
        campo.value = ""
    }
     
}
}
function abrir_chat(){
    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial};
   
    
     fetch("//api.jepherson.com.br/start_chat.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                if (!data.status === 200) {
                    throw Error(data.status);
                   }else{
                        enviarPergunta(data.code_chat)
                 
                        setTimeout(fecha_chat, 1800000);
                   }
            }).catch(e => {
                console.log(e);
                });
}

function inatividade(cod_chat){

    let agora = new Date()
    let inativo = parseInt(localStorage.getItem("Minuto"))
    
    console.log(inativo)
    inativo += 5
    if(inativo > 59){
        inativo -= 60
    }
    console.log(agora.getMinutes())
    console.log(inativo)
    if(agora.getMinutes() <= inativo){
        fecha_chat(cod_chat)
    }
}

function criaPergunta(pergunta, cod_chat){
    
    let BalaoPergunta = `
    <div class="MenCli">
    <p>${pergunta} </p>
    </div>
`
chat.innerHTML += BalaoPergunta;
localStorage.setItem('Codigo_do_chat', cod_chat)
localStorage.setItem('Contador', contador += 1) 
localStorage.setItem('Pergunta'+ contador, pergunta)
let minuto = new Date()
localStorage.setItem('Minuto', minuto.getMinutes())
criaResposta(pergunta, cod_chat, contador)
}

function criaResposta(pergunta, cod_chat, contador){


    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ 
        credencial: credencial,
         code_chat: cod_chat,
         chat_client: pergunta
    };
     fetch("//api.jepherson.com.br/start_chat.php",
              {method:'post',body:JSON.stringify(body)}).then((response)=> response.json()).then((data) =>{
                if (!data.status === 200) {
                    throw Error(data.status);
                   }else{
                let BalaoResposta = ` 
                        <div class="MenEu">
                            <p>${data.cod_chat}</p>
                         </div>
                        `  
                localStorage.setItem('Resposta'+ contador, cod_chat)                  
                chat.innerHTML += BalaoResposta;
                   }
            }).catch(e => {
                console.log(e);
                });
            
}

function verificaChat(){
    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial    }; 
     fetch("//api.jepherson.com.br/start_chat.php",
              {method:'post',body:JSON.stringify(body)}).then((response)=> response.json()).then((data) =>{
                if (!data.status === 200) {
                    throw Error(data.status);
                   }else{  
                if(data.code_chat != null){
                   let teste = data
                   return teste
                  }
                }
            }).catch(e => {
                console.log(e);
                });
}

function RestauraPergunta(pergunta){
    let BalaoPergunta = ` 
    <div class="MenCli">
        <p>${pergunta}</p>
     </div>
    `               
chat.innerHTML += BalaoPergunta;
}

function RestauraResposta(resposta){
    let BalaoResposta = ` 
    <div class="MenEu">
        <p>${resposta}</p>
     </div>
    `               
chat.innerHTML += BalaoResposta;
}





















