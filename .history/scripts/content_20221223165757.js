/**
 * Inicio do código
 * 
 * 
 * Printa a tela quando abre a página
 * LIMITAÇÕES: Se a pagina for alterada após a criação da screenshot, a extensão não reconhecerá os novos "objetos"
 * → getImageData é uma operação cara. quem sabe podemos salvar o imageData em cache como em https://github.com/youbastard/getImageData
 * Assim se fazendo necessário colocar uma sequência de intervalos, onde ele faz o screenshot novamente. (função setInterval)
 * **/
 let context; //Variavel global que será usada muitas vezes para adquirir dados, como no caso a seguir


 window.addEventListener('load' || 'scroll', (event) => { screenshot(); });

function init() {
    //printa a tela
    screenshot()
    document.addEventListener('mousemove', (event) => { // adiciona um listener para esperar o movimento do mouse
        if (context) { // Só pegará os dados do canvas ao ser inicializado
            let pixelData = context.getImageData(event.pageX, event.pageY, 1, 1).data; //Passa parte da imagem, onde o mouse esta localizado
            if (pixelData[0] == 0 && pixelData[1] == 0 && pixelData[2] == 0 && pixelData[3] == 0) { //cada indice representa valores do RGBa
                console.log("Transparencia");
                throw "Transparencia Detectada, não pode ser convertida para HEX" // 0 Red, 1 Green ,2 Blue, 3 Alpha Transparent
            }
            if (pixelData[0] > 255 && pixelData[1] > 255 && pixelData[2] > 255 && pixelData[3] > 255) {
                console.log("Cor inválida");
                throw "Cor inválida detectada"
            }
            console.log("%c◼◼◼◼◼◼◼◼◼◼◼", //esta imprimindo a cor direto no console, por estilizar oque é impresso na tela do console
                "color: rgba(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + "," + pixelData[3] + ")");
            // Podemos trabalhar diretamente com o rgb
            //%c formata o estilo do console           
            let color = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
            console.log('Cor mais aproximada: ' + findcolor(cores, {r:pixelData[0], g:pixelData[1], b:pixelData[2]}));
    document.body.style.cursor = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle fill="${color}" cx="5" cy="5" r="5"/></svg>'), auto`

        }
    
    });
}

function screenshot() { 
    let region = document.body; // cria uma variavel região do Body
    html2canvas(region).then(canvas => { //usa a variável regiao para pegar o tamanho da tela e criar o canvas
        context = canvas.getContext('2d', {
            willReadFrequently : true
        });
        console.log("screenshot")
    })
}

/// distance Color
const cores = [
    //primárias
    {cor:'azul',r:0,g:0,b:255},
    {cor:'vermelho',r:255,g:0,b:0},
    {cor:'verde',r:0,g:255,b:0},
    //cores secundárias
    {cor:'amarelo',r:255,g:255,b:0},
    {cor:'roxo',r:128,g:0,b:128},
    {cor:'marrom',r:165,g:42,b:42}, 
    {cor:'laranja',r:255,g:165,b:0}, 
    //Cores Claras
    {cor:'azulClaro',r:173,g:216,b:230},
    {cor:'verdeClaro',r:144,g:238,b:144},
    {cor:'laranjaClaro',r:254,g:161,b:25},
    {cor:'vermelhoClaro',r:252,g:196,b:88},
    {cor:'roxoClaro',r:246,g:186,b:202},
    {cor:'marromClaro',r:245,g:198,b:93},
    //Cores escuras
    {cor:'azulEscuro',r:0,g:0,b:139},
    {cor:'verdeEscuro',r:0,g:100,b:0}, 
    {cor:'amareloEscuro',r:253,g:195,b:45},
    {cor:'laranjaEscuro',r:188,g:74,b:22},
    {cor:'vermelhoEscuro',r:121,g:35,b:47},
    {cor:'roxoEscuro',r:83,g:40,b:78},
    {cor:'marromEscuro',r:103,g:57,b:24},
    //cores especiais
    {cor:'ouro',r:255,g:215,b:0},
    {cor:'prata',r:192,g:192,b:192},
    {cor:'cinzaEscuro',r:169,g:169,b:169},
    {cor:'branco',r:255,g:255,b:255},
    {cor:'preto',r:0,g:0,b:0}
 
    //cores adicionais
 
 ];
 
 
 function distance(cor1, cor2){
    return Math.sqrt((cor1.r-cor2.r)*(cor1.r-cor2.r)+(cor1.g-cor2.g)*(cor1.g-cor2.g)+(cor1.b-cor2.b)*(cor1.b-cor2.b));
 }
 
 function findcolor(cores, cor){
    let perto = cores[0]
    let distancia = distance(perto, cor)
    for(let i = 1; i < cores.length; i++){
       let distanciaAt = distance(cores[i], cor)
       if(distanciaAt < distancia){
          perto = cores[i]
          distancia = distanciaAt
       }
    }
    console.log(perto, distancia)
    return perto;
 }

 //end

window.addEventListener('load', (event) => { init(); }); // só executa o script depois q a página terminou de ser carregada