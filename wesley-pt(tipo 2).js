function CriaBot(){

let Bot = document.createElement("div");
Bot.id="Bot";
Bot.setAttribute("class", "some")
let TextoBolinha = document.createElement("div");
TextoBolinha.id="TextoBolinha";
let PLateral = document.createElement("p");
PLateral.id="PLateral";
let Bolinha = document.createElement("div");
Bolinha.id="Bolinha";

TextoBolinha.appendChild(PLateral)
Bot.appendChild(TextoBolinha)
Bot.appendChild(Bolinha)

let TelaBot = document.createElement("div");
TelaBot.id="TelaBot";
TelaBot.setAttribute("class", "some")
let Cabecalho = document.createElement("div");
Cabecalho.id="Cabecalho";
let FotoCab = document.createElement("div");
FotoCab.id="FotoCab";
let PFoto = document.createElement("p");
PFoto.id="PFoto";
let Sair = document.createElement("div");
Sair.id="Sair";
let p = document.createElement("p");
p.innerHTML = "_"

let Finalizar = document.createElement("div");
Finalizar.id="Finalizar";
let Fechar = document.createElement("p");
Fechar.id="Fechar";
Fechar.innerHTML = "X"


let Conversa = document.createElement("div");
Conversa.id="Conversa";
let MenEu = document.createElement("div");
MenEu.id="MenEu";
let Balao1 = document.createElement("p");
Balao1.id="Balao1";

let Campo = document.createElement("input");
Campo.id="Campo";
Campo.setAttribute("placeholder", "Digite sua pergunta")

MenEu.appendChild(Balao1)
Conversa.appendChild(MenEu)
FotoCab.appendChild(PFoto)
Cabecalho.appendChild(FotoCab)
Cabecalho.appendChild(Sair)
Cabecalho.appendChild(Finalizar)
Finalizar.appendChild(Fechar)
Sair.appendChild(p)
TelaBot.appendChild(Cabecalho)
TelaBot.appendChild(Conversa)
TelaBot.appendChild(Campo)

let link = document.createElement("link")
link.setAttribute("rel", "stylesheet" )
link.setAttribute("href","styles.css")

document.body.appendChild(link)
document.body.appendChild(Bot)
document.body.appendChild(TelaBot)


const chat = document.querySelector('#Conversa')
let retorno = ""

setTimeout(TresSegundos, 3000);

let contador = 0
     


var credencial = {token:'e1d1f5fac5b182348b77310f18b9b4a1'};

    const body={ credencial: credencial};
    
     fetch("//api.jepherson.com.br/configuration.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                 if (!data.status === 200) {
                     throw Error(data.status);
                    }else{
                  const config = data.configuracao
                  
                  let direcaoTela = document.querySelector('#TelaBot')
                  let direcaoBola = document.querySelector('#Bot')
                  if(config.direcao == "left"){
                    direcaoBola.setAttribute("style", "left: 40px")
                    direcaoTela.setAttribute("style", "left: 40px")
                  }else{
                    direcaoBola.setAttribute("style", "right: 40px")
                    direcaoTela.setAttribute("style", "right: 40px")
                  }
                  
                  document.querySelector('#Bolinha').style.backgroundImage = 'url(' + config.imagem + ')';
                  document.querySelector('#FotoCab').style.backgroundImage = 'url(' + config.imagem + ')';
                  let css = document.querySelector('#Cabecalho')
                  css.style.backgroundColor = config.cor_borda
                  css.style.textColor = config.cor_letra
                  let textoLateral = document.querySelector('#PLateral')
                  localStorage.setItem("texto", config.descricao)
                  textoLateral.innerHTML = config.descricao;
                  let balao1 = document.querySelector('#Balao1')
                  balao1.innerHTML = config.descricao;
                }
            
            }).catch(e => {
                console.log(e);
                });
const sair = document.querySelector('#Sair');
sair.addEventListener("click", ()=>{
    document.querySelector('#TelaBot').classList.toggle('some');
    bot.classList.remove('some');
})

const fechar = document.querySelector('#Finalizar');
fechar.addEventListener("click", ()=>{
    document.querySelector('#TelaBot').classList.toggle('some');
    bot.classList.remove('some');
    fecha_chat()

})

const bot = document.querySelector('#Bolinha');
bot.addEventListener("click", ()=>{
    document.querySelector('#TelaBot').classList.toggle('some');
    bot.classList.toggle('some');
      verificaChat();
      setTimeout(()=>{
        localStorage.setItem('Codigo_do_chat', retorno)
      if(retorno == "" ){
        abrir_chat()
          setInterval(function(){
                                let codchat = localStorage.getItem("Codigo_do_chat") 
                                inatividade(codchat)
                                },1000*60*5);
        }else{
        let setTexto = localStorage.getItem("texto")
        chat.innerHTML = `
        <div id="MenEu">
            <p>${setTexto}</p>
        </div>`
        contador = localStorage.getItem("Contador")
        for(let i = 1 ; i<= contador; i++){
            let pergunta = localStorage.getItem("Pergunta" + i) 
            RestauraPergunta(pergunta)
            let resposta = localStorage.getItem("Resposta" + i) 
            RestauraResposta(resposta)
        }
        let cod_chat = localStorage.getItem("Codigo_do_chat")
        const campo = document.querySelector('#Campo')
        campo.onkeydown = function (evento) {

    if (evento.code === 'Enter') {
        criaPergunta(campo.value, cod_chat)
        campo.value = ""
    }
}
        setInterval(function(){
            let cod_chat = localStorage.getItem("Codigo_do_chat") 
            inatividade(cod_chat)
         },1000*60*5);
      }
     
      }, 1000)
});

function TresSegundos(){
    document.querySelector('#TextoBolinha').classList.add('some');
}


function abrir_chat(){
    var credencial = {token:'e1d1f5fac5b182348b77310f18b9b4a1'};

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
function enviarPergunta(codigo_chat){
    
const campo = document.querySelector('#Campo')
campo.onkeydown = function (evento) {

    if (evento.code === 'Enter') {
        criaPergunta(campo.value, codigo_chat)
        campo.value = ""
    }
     
}
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
    <div id="MenCli">
    <p>${pergunta} </p>
    </div>
`
chat.innerHTML += BalaoPergunta;
localStorage.setItem('Contador', contador += 1) 
localStorage.setItem('Pergunta'+ contador, pergunta)
let minuto = new Date()
localStorage.setItem('Minuto', minuto.getMinutes())
criaResposta(pergunta, cod_chat, contador)
}

function criaResposta(pergunta, cod_chat, contador){


    var credencial = {token:'e1d1f5fac5b182348b77310f18b9b4a1'};

    const body={ 
        credencial: credencial,
         code_chat: cod_chat,
         chat_client: pergunta
    };
     fetch("//api.jepherson.com.br/chat.php",
              {method:'post',body:JSON.stringify(body)}).then((response)=> response.json()).then((data) =>{
                if (!data.status === 200) {
                    throw Error(data.status);
                   }else{
                let BalaoResposta = ` 
                        <div id="MenEu">
                            <p>${data.resposta}</p>
                         </div>
                        `  
                localStorage.setItem('Resposta'+ contador, data.resposta)                  
                chat.innerHTML += BalaoResposta;
                   }
            }).catch(e => {
                console.log(e);
                });
            
}

function verificaChat(){
    var credencial = {token:'e1d1f5fac5b182348b77310f18b9b4a1'};

    const body={ credencial: credencial,}; 
     fetch("//api.jepherson.com.br/list_chat.php",
              {method:'post',body:JSON.stringify(body)}).then((response)=> response.json()).then((data) =>{
                if(data != null){
                retorno = data.code_chat
                }
                 if (data.status === 401) {
                     throw Error(data.status);
                   }
                 }
             ).catch(e => {
                 
                 });
                 
                 
    }
function RestauraPergunta(pergunta){
    let BalaoPergunta = ` 
    <div id="MenCli">
        <p>${pergunta}</p>
     </div>
    `               
chat.innerHTML += BalaoPergunta;
}

function RestauraResposta(resposta){
    let BalaoResposta = ` 
    <div id="MenEu">
        <p>${resposta}</p>
     </div>
    `               
chat.innerHTML += BalaoResposta;
}

function fecha_chat(){
    verificaChat()
    code_do_chat = retorno
    localStorage.clear()
    chat.innerHTML = ""
   
     var credencial = {token:'e1d1f5fac5b182348b77310f18b9b4a1'}
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
               
               });
             setTimeout(()=>{ location.reload();},1000);
    
}

}
window.onload = CriaBot;

















