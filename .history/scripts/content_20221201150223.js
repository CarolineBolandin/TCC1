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

function screenshot() { 
    console.log("screenshot")
    let region = document.querySelector("html"); // cria uma variavel região do Body
    html2canvas(region).then(canvas => { //usa a variável regiao para pegar o tamanho da tela e criar o canvas
        context = canvas.getContext('2d', {
            willReadFrequently : 1,
        });
    })
}

function init() {
    //Printa a tela a partir daqui, colocado o setInterval para atualizar a cada 5 segundo para pegar novos objetos de uma pagina
    //setInterval(screenshot, 5000);
    //printa a tela
    screenshot()
    document.addEventListener('mousemove', (event) => { // adiciona um listener para esperar o movimento do mouse
        const mouseY = event.clientY;
        const mouseX = event.clientX;

        if (context) { // Só pegará os dados do canvas ao ser inicializado
            let pixelData = context.getImageData(event.pageX, event.pageY, 1, 1).data; //Passa parte da imagem, onde o mouse esta localizado
            if (pixelData[0] == 0 && pixelData[1] == 0 && pixelData[2] == 0 && pixelData[3] == 0) { //cada indice representa valores do RGBa
                throw "Transparencia Detectada, não pode ser convertida para HEX" // 0 Red, 1 Green ,2 Blue, 3 Alpha Transparent,
            }
            if (pixelData[0] > 255 && pixelData[1] > 255 && pixelData[2] > 255 && pixelData[3] > 255) {
                throw "Cor inválida detectada"
            }
            //console.log("%c◼◼◼◼◼◼◼◼◼◼◼", //esta imprimindo a cor direto no console, por estilizar oque é impresso na tela do console
              //  "color: rgba(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + "," + pixelData[3] + ")");
            // Podemos trabalhar diretamente com o rgb
            //%c formata o estilo do console           
            let color = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    document.getElementsByTagName('body')[0].style.cursor = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style="border: 1px solid"><circle fill="${color}" cx="10" cy="10" r="10"/></svg>'), auto`

        }
    
    });
}
window.addEventListener('load', (event) => { init(); }); // só executa o script depois q a página terminou de ser carregada