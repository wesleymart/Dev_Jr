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
const chat = document.querySelector('.Conversa')
setTimeout(CincoSegundos, 1000*5);
let contador = localStorage.getItem("Contador")
 

if(contador == null || contador == undefined){
     contador = 0
     localStorage.setItem('Contador', contador) 
 }


function CincoSegundos(){
    const texto1 = document.querySelector('.TextoBolinha').classList.add('some');
}

const bot = document.querySelector('.Bolinha');
bot.addEventListener("click", ()=>{
    document.querySelector('.TelaBot').classList.toggle('some');
    bot.classList.add('some');
      //let retorno = verificaChat()
      if(contador == 0 ){
        console.log("abri um chat")
          abrir_chat()
          setInterval(function(){
              inatividade(retorno)
           },1000*60*5);
      }else{

        for(let i = 1 ; i<= contador; i++){
            let pergunta = localStorage.getItem("Pergunta" + i) 
            RestauraPergunta(pergunta)
            let resposta = localStorage.getItem("Resposta" + i) 
            RestauraResposta(resposta)
        }
        setInterval(function(){
            inatividade(retorno)
         },1000*60*5);
    
    
      }

})


function fecha_chat(code_do_chat){
    localStorage.clear()
    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

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

const sair = document.querySelector('.Sair');
sair.addEventListener("click", ()=>{
    document.querySelector('.TelaBot').classList.toggle('some');
    bot.classList.remove('some');
})

const fechar = document.querySelector('.Fechar');
fechar.addEventListener("click", ()=>{
    let code_do_chat = localStorage.getItem("Codigo_do_chat")
    fecha_chat(code_do_chat)
})


// -------------------- Inicia ChatBot ------------------------------------------------------------ 

var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial};
    
     fetch("//api.jepherson.com.br/configuration.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                  const config = data.configuracao
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
function abrir_chat(){
    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial};
    
     fetch("//api.jepherson.com.br/start_chat.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                enviarPergunta(data.code_chat)
                 
                setTimeout(fecha_chat(data.code_chat), 1800000);
            });
}

function inatividade(){

    

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
 

criaResposta(pergunta, cod_chat, contador)
}

function criaResposta(pergunta, cod_chat, contador){
 
    console.log(pergunta)
    console.log("chat ")
    console.log(cod_chat)

    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ 
        credencial: credencial,
        // code_chat: cod_chat,
        // chat_client: pergunta
    };
     fetch("//api.jepherson.com.br/start_chat.php",
              {method:'post',body:JSON.stringify(body)}).then((response)=> response.json()).then((data) =>{
                console.log(data.cod_chat)
                let BalaoResposta = ` 
                        <div class="MenEu">
                            <p>${data.cod_chat}</p>
                         </div>
                        `  
                localStorage.setItem('Resposta'+ contador, cod_chat)                  
                chat.innerHTML += BalaoResposta;
            });
            
}

function verificaChat(){
    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial    }; 
     fetch("//api.jepherson.com.br/start_chat.php",
              {method:'post',body:JSON.stringify(body)}).then((response)=> response.json()).then((data) =>{
                  if(data.code_chat != null){
                   let teste = data
                   return teste
                  }
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







// var nome = document.getElementById('nome').value;
// 			localStorage.setItem('name', nome) 






















