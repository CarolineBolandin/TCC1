const cor = {
   //primárias
    azul: [0,0,255],
   vermelho:[255,0,0],
   verde: [0,255,0],
   //cores secundárias
   amarelo:[255,255,0],
   roxo:[128,0,128],
   marrom:[165,42,42], 
   laranja:[255,165,0], 
   azulClaro:[173,216,230],
   verdeClaro:[144,238,144],
   laranjaClaro:[254,161,25],
   vermelhoClaro:[252,196,88],
   roxoClaro:[246,186,202],
   marromClaro:[245,198,93],
   azulEscuro:[0,0,139],
   verdeEscuro:[0,100,0], 
   amareloEscuro:[253,195,45],
   laranjaEscuro:[188,74,22],
   


};

function distance(r, g, b){
    for(i=0; i<28; i++){
   let distance = Math.sqrt((r-x)*(r-x)+(g-y)*(g-y)+(b-z)*(b-z));
    }
}