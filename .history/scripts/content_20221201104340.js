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
    //document.getElementsByTagName('body')[0].style.cursor = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle fill="${color}" cx="10" cy="10" r="10"/></svg>'), auto`
    document.getElementsByTagName('body')[0].style.cursor = `url('data:image/svg+xml, <svg width="8.4666605mm" height="8.4666977mm" viewBox="0 0 8.4666605 8.4666977" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 15 15" path:fill:"${color}" stroke-width:0.0252452" d="m 15.446104,8.4795494 c -0.203219,0.4674583 -0.51631,0.8506238 -0.82156,1.2256783 -0.544321,0.6131103 -1.134919,1.1648163 -1.701541,1.7482853 -0.527474,0.543924 -1.017534,1.13513 -1.515248,1.716098 -0.365487,0.421545 -0.743376,0.827416 -1.121091,1.233429 -0.210328,0.237171 -0.4493665,0.432497 -0.681809,0.636993 -0.2295487,0.184114 -0.4545625,0.376712 -0.6917883,0.546941 -0.1116118,0.102641 -0.2705406,0.152591 -0.3674933,0.277424 -0.012807,0.01649 -0.022509,0.03601 -0.033763,0.05402 -0.05518,0.123507 -0.069164,0.197023 0.011901,0.308495 0.1139911,0.07842 0.2258112,0.16143 0.3419734,0.235258 0.027532,0.0175 0.1005231,0.02517 0.1275177,0.03115 0.080749,0.01788 0.1602014,0.03892 0.2414872,0.054 0.1656476,0.02201 0.3266166,0.07677 0.4872911,0.127281 0.1351838,0.04388 0.2735039,0.06793 0.4108102,0.09919 0.227822,0.04042 0.45774,0.06185 0.686795,0.09049 0.252093,0.03687 0.505674,0.05512 0.759488,0.0628 0.254296,0.0054 0.508658,0.0046 0.762986,0.0052 0.198836,8.3e-4 0.397666,2.07e-4 0.5965,-4.15e-4 0.292557,-0.0022 0.585114,-0.0019 0.877673,-0.001 0.226526,6.23e-4 0.453055,8.3e-4 0.679582,0.0011 0.200368,5.19e-4 0.400735,-5e-6 0.601103,-1.4e-5 0.163727,5.4e-5 0.327453,0.0012 0.49118,0.0011 0.143867,-5.19e-4 0.287734,8e-6 0.431603,3.11e-4 0.127638,-0.01185 0.238216,-0.07481 0.343505,-0.155851 0.08962,-0.08458 0.176538,-0.174239 0.2528,-0.275665 0.07608,-0.108163 0.135241,-0.227615 0.183508,-0.355492 0.04358,-0.146109 0.08243,-0.293608 0.107346,-0.44579 0.02351,-0.157445 0.02519,-0.31736 0.02612,-0.476713 -1.76e-4,-0.23609 -0.0011,-0.472176 -3.51e-4,-0.708266 -0.0014,-0.191707 0.007,-0.383526 -0.01173,-0.57428 -0.01939,-0.166813 -0.06147,-0.328561 -0.101164,-0.489853 -0.06888,-0.226318 -0.126616,-0.456554 -0.183685,-0.687292 -0.05995,-0.227113 -0.107956,-0.458203 -0.163478,-0.686794 -0.0583,-0.198945 -0.100087,-0.402512 -0.141366,-0.60691 -0.06467,-0.283573 -0.116781,-0.570809 -0.171309,-0.85726 C 16.109367,10.325213 16.077327,10.03362 16.030918,9.7446729 16.000848,9.5149558 15.971898,9.2856903 15.936878,9.056942 15.916628,8.9119392 15.878628,8.772469 15.831666,8.6368585 L 15.518805,8.4666667 v 0 c 0.04931,0.1325114 0.08834,0.2697912 0.109804,0.4127315 0.0358,0.2292862 0.0687,0.4584168 0.0962,0.6893385 0.04757,0.2898309 0.08228,0.5818813 0.131403,0.8713063 0.05412,0.2853 0.10371,0.571955 0.165986,0.854976 0.04256,0.204743 0.08091,0.410173 0.141579,0.609151 0.05761,0.228067 0.103549,0.460087 0.164066,0.687211 0.05782,0.22972 0.112548,0.460416 0.18164,0.685946 0.03908,0.159689 0.08046,0.319596 0.103056,0.483902 0.02225,0.189293 0.01324,0.380041 0.01526,0.570696 0.0013,0.235721 0.0017,0.471459 -5.26e-4,0.707175 -0.002,0.156854 -0.0034,0.314379 -0.02445,0.469675 -0.02336,0.149459 -0.06158,0.293695 -0.104451,0.436878 -0.04655,0.123978 -0.103058,0.240652 -0.177512,0.344813 -0.07516,0.09776 -0.16015,0.185185 -0.248479,0.265975 -0.101678,0.07622 -0.208848,0.133009 -0.331718,0.137142 -0.143663,2.07e-4 -0.287326,8.3e-4 -0.43099,3.11e-4 -0.16288,-5.5e-5 -0.325757,0.001 -0.488638,0.0011 -0.200381,-1.1e-5 -0.400761,-5.19e-4 -0.601141,-1.9e-5 -0.225674,2.08e-4 -0.451348,4.15e-4 -0.677021,0.0011 -0.293254,9.34e-4 -0.586507,0.0012 -0.879758,-7.26e-4 -0.198637,-3.12e-4 -0.397268,-4.15e-4 -0.595904,8.3e-4 -0.254033,7.26e-4 -0.508103,0.0012 -0.762084,-0.0059 -0.252424,-0.0096 -0.504562,-0.02734 -0.755435,-0.06302 -0.231215,-0.02849 -0.462994,-0.05352 -0.6923517,-0.09925 -0.1369421,-0.0281 -0.2732366,-0.05835 -0.4077617,-0.10042 C 9.2884395,16.377399 9.1267876,16.326365 8.9608159,16.30388 8.8580096,16.28307 8.7506277,16.26495 8.6502872,16.23046 8.5476395,16.19519 8.3707927,16.045484 8.8441181,16.382832 c -0.089628,-0.0811 -0.084004,-0.142811 -0.034844,-0.255881 0.096084,-0.153282 0.2610323,-0.213303 0.3883831,-0.322672 0.2360388,-0.174083 0.4625963,-0.365324 0.6923503,-0.550637 0.2334465,-0.204309 0.4719635,-0.401974 0.6801285,-0.643156 0.37301,-0.410221 0.743704,-0.823298 1.107685,-1.244775 0.497878,-0.579901 0.954512,-1.056609 1.547746,-1.560053 0.565345,-0.586473 1.119152,-1.298383 1.669422,-1.9048892 0.314424,-0.3753326 0.63005,-0.7594533 0.853971,-1.2211477 L 15.44607,8.4795639 Z"/></svg>
'), auto`
        }
    
    });
}
window.addEventListener('load', (event) => { init(); }); // só executa o script depois q a página terminou de ser carregada