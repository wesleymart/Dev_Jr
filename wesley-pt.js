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

setInterval(function(){
    const texto1 = document.querySelector('.TextoBolinha').classList.add('some');
},5000);




const bot = document.querySelector('.Bolinha');
bot.addEventListener("click", ()=>{
    document.querySelector('.TelaBot').classList.toggle('some');
    bot.classList.add('some');
    abrir_chat();
})

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






// -------------------- Inicia ChatBot ------------------------------------------------------------ 

var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial};
    
     fetch("//api.jepherson.com.br/configuration.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                  //const cliente = data.cliente;
                  //const code_bot = data.code_bot;
                  const config = data.configuracao
                  //console.log("cliente" )
                  //console.log(cliente)
                  //console.log("bot")
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

*/
function abrir_chat(){
    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ credencial: credencial};
    
     fetch("//api.jepherson.com.br/start_chat.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                enviarPergunta(data.code_chat)
            });
            
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

  
function criaPergunta(pergunta, cod_chat){
    
    let BalaoPergunta = `
    <div class="MenCli">
    <p>${pergunta} </p>
    </div>
`
chat.innerHTML += BalaoPergunta;

criaResposta(pergunta, cod_chat)



}

function criaResposta(pergunta, cod_chat){
 
    console.log(pergunta)
    console.log("chat ")
    console.log(cod_chat)

    var credencial = {token:'13ba540599f9e536945e28c59421c36a'};

    const body={ 
        credencial: credencial,
        code_chat: cod_chat,
        chat_client: pergunta
    
    };
    
     fetch("//api.jepherson.com.br/chat.php",
              {method:'post',body:JSON.stringify(body) }).then((response)=> response.json())
            .then((data) =>{
                let BalaoResposta = ` 
                        <div class="MenEu">
                            <p>${data.resposta}</p>
                         </div>
                        `
                chat.innerHTML += BalaoResposta;
            });
            
}























