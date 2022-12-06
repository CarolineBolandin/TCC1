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
   // document.getElementsByTagName('body')[0].style.cursor = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle fill="${color}" cx="10" cy="10" r="10"/></svg>'), auto`
    document.getElementsByTagName('body')[0].style.cursor = `url('<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    
    <svg
       width="119.31145mm"
       height="110.25952mm"
       viewBox="0 0 119.31145 110.25952"
       version="1.1"
       id="svg5"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs2" />
      <g
         id="layer1"
         transform="translate(-47.848935,-61.143461)">
        <path
           style="fill:${color};stroke-width:0.264583"
           d="m 116.36194,97.152983 c -2.91564,-2.752593 -3.94069,-7.389241 -5.17164,-11.082089 -0.52962,-1.588863 -0.83346,-3.256261 -1.47762,-4.802238 -2.45736,-5.897673 -7.1734,-12.609623 -12.190294,-16.623135 -0.946502,-0.757201 -4.012779,-2.392678 -5.171641,-2.585821 -0.850212,-0.1417 -1.72642,0.06611 -2.585821,0 -4.498644,-0.346048 -9.459325,-1.311053 -14.037312,-0.738806 -1.007552,0.125944 -1.962372,0.526052 -2.955224,0.738806 -0.732372,0.156938 -1.520992,0.09123 -2.21642,0.369403 -6.267833,2.507134 -1.703271,0.8157 -4.063431,2.585821 -1.210873,0.908156 -2.844998,1.363514 -4.063434,2.216417 -0.570637,0.39945 -0.959868,1.011645 -1.47761,1.477613 -4.145703,3.731133 -8.639239,6.955618 -11.082091,12.190299 -2.357507,5.051798 -1.847014,10.479191 -1.847014,15.884329 0,1.754902 -0.390266,4.219288 0,5.910448 0.210865,0.91375 0.792805,1.70269 1.10821,2.58582 1.000746,2.80209 1.780063,5.75423 2.955223,8.49627 0.735463,1.71608 1.810589,2.5754 2.955224,4.06343 1.647002,2.14111 2.974279,3.94188 4.802238,5.91045 3.09509,3.33318 6.03214,6.7466 9.604478,9.60448 3.859006,3.0872 8.303988,5.44274 12.190299,8.49626 0.547711,0.43035 0.906973,1.07817 1.47761,1.47762 0.676693,0.47368 1.539724,0.63452 2.216417,1.10821 0.57064,0.39944 0.933696,1.04247 1.477614,1.47761 1.715283,1.37222 6.274199,4.05401 7.388058,5.91044 0.200337,0.3339 0.246269,0.73881 0.369403,1.10821 0.246269,0.49254 0.44695,1.01065 0.738807,1.47762 0.8509,1.36144 1.723879,2.70895 2.58582,4.06343 2.226061,3.4981 4.822521,6.82646 6.279851,10.71268 0.0137,0.0365 1.08835,2.21642 0.73881,2.21642 -1.14391,0 -0.95914,-2.36767 -0.73881,-2.95522 0.46799,-1.24798 2.73953,-3.975 3.69403,-4.80224 6.46053,-5.59912 13.86335,-8.06888 21.79478,-10.71269 2.72044,-0.90681 1.64407,-0.84883 4.80223,-2.58582 1.44753,-0.79614 3.01057,-1.37598 4.43284,-2.21642 5.98156,-3.53455 11.81348,-8.48439 15.51493,-14.40671 1.86366,-2.98186 2.80541,-6.36956 4.06343,-9.60448 1.82632,-4.69626 4.36066,-9.07969 5.54104,-14.03731 0.34697,-1.45726 0.40197,-2.9732 0.73881,-4.43284 0.63138,-2.73599 1.84532,-5.3436 2.21642,-8.126864 0.28636,-2.147723 0.21869,-8.156374 0,-10.343282 -0.21958,-2.195798 -1.6182,-3.611779 -2.95523,-5.171641 -1.40031,-1.633704 -2.73671,-3.07594 -4.43283,-4.432837 -0.54223,-0.433782 -1.67148,-0.60257 -2.21642,-0.738807 -5.68803,-1.422006 -9.64948,-1.47761 -15.51493,-1.47761 -1.70053,0 -9.73731,-0.384223 -11.08209,0 -1.11695,0.319127 -1.93976,1.282869 -2.95522,1.847014 -0.81391,0.452172 -2.64525,0.798234 -3.32463,1.477613 -0.31393,0.313931 -0.42487,0.794276 -0.7388,1.108207 -1.03685,1.036847 -2.33538,1.801101 -3.32463,2.955224 -1.87723,2.19011 -3.3654,4.760857 -5.17164,7.018657 -2.10027,2.625339 -6.27985,8.740439 -6.27985,12.190296"
           id="path753" />
      </g>
    </svg>
    '), auto`

        }
    
    });
}
window.addEventListener('load', (event) => { init(); }); // só executa o script depois q a página terminou de ser carregada