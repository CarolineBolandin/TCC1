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
   vermelhoEscuro:[121,35,47],
   roxoEscuro:[83,40,78],
   marromEscuro:[103,57,24],
   
   //cores especiais
   ouro:[255,215,0],
   prata:[192,192,192],
   cinzaEscuro:[169,169,169],
   branco:[255,255,255],
   preto:[0,0,0]

   //cores adicionais

};

const prata:{x:192,y:192,z:192};

function distance(r, g, b){
   let count = Object.keys(cor).length;
   console.log(count);
   

   let minDistance;
   let corselect;
    for(i=0; i<count; i++){
      
    //  Object.entries(cor).map(cores)
   let distance = Math.sqrt((r-x)*(r-x)+(g-y)*(g-y)+(b-z)*(b-z));
  
   if (minDistance < distance){
      minDistance= distance;
      corselect = cor.key
   }

    }
    console.log(minDistance + cor);
}