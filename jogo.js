console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')
//fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenho(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );


    }

}

//chão
const chao = {

    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenho(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // Sprite X, Sprite Y
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // Sprite X, Sprite Y
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );


    }

}

//MessagemGetReady
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174/2,
    y: 50,
    desenho(){

        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY, // Sprite X, Sprite Y
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura,
        );
    

    }

}
//Passarinho
const flapyBird = {

    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        flapyBird.velocidade = flapyBird.velocidade + flapyBird.gravidade;
        flapyBird.y = flapyBird.y + flapyBird.velocidade; 
    },

    desenho(){
        contexto.drawImage(
            sprites,
            flapyBird.spriteX, flapyBird.spriteY, // Sprite X, Sprite Y
            flapyBird.largura, flapyBird.altura,
            flapyBird.x, flapyBird.y,
            flapyBird.largura, flapyBird.altura,
        );

    }

}
//
//Telas
//
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;
}
const Telas = {
    INICIO: {
        desenho(){
            planoDeFundo.desenho();
            chao.desenho();
            flapyBird.desenho();
            mensagemGetReady.desenho();
        },
        click(){
            mudaParaTela(Telas.JOGO);
            console.log('cliclado')
        },
        atualiza(){
    
        }
       
    }
};

Telas.JOGO = {
    desenho() {
            planoDeFundo.desenho();
            chao.desenho();
            flapyBird.desenho();
    },
        atualiza(){
            flapyBird.atualiza();
        }
};


function loop(){ 
    telaAtiva.atualiza();
    telaAtiva.desenho();
    

    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();