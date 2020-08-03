const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

let frames = 0;
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
//cria um chão
function criaChao(){
    const chao = {
    
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza(){
            const movimentoDoChao = 1;
            const repeteEm = chao.largura /2; 
            movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
        },
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
    
    
        },
    
    };
    return chao;
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

//função de colisão
function fazColisao(flappyBird, chao){
    const flapyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flapyBirdY >= chaoY){
        return true;
    }
    return false;
}
//cria flappy bird
function criaFlappyBird(){
    const flappyBird = {
    
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula(){
            
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                som_HIT.play();

                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);

                }, 500);
                return;
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.velocidade + flappyBird.y;
        },

        movimentos: [
            { spriteX: 0, spriteY: 0, }, //Asa para cima
            { spriteX: 0, spriteY: 26, }, //Asa no meio
            { spriteX: 0, spriteY: 52, }, //Asa para baixo
        ],

        frameAtual: 0,
        atualizaOFrameAtual(){
            const intervaloDeFrames =10;
            const passouOIntervalo = frames % intervaloDeFrames ===0;

            if(passouOIntervalo){
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;

            }
        },
    
        desenho(){
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
             
            contexto.drawImage(
                sprites,
                spriteX, spriteY, // Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
    
        }
    
    }
return flappyBird;
}

//
//Telas
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}
const Telas = {
    INICIO: {
        inicializa(){
        globais.flappyBird = criaFlappyBird();
        globais.chao = criaChao();
        },
        desenho(){
            planoDeFundo.desenho();
            globais.chao.desenho();
            globais.flappyBird.desenho();
            mensagemGetReady.desenho();
        },
        click(){
            mudaParaTela(Telas.JOGO);
            
        },
        atualiza(){
            globais.chao.atualiza();
        }
       
    }
};

Telas.JOGO = {
    desenho() {
            planoDeFundo.desenho();
            globais.chao.desenho();
            globais.flappyBird.desenho();
    },
    click(){
        globais.flappyBird.pula();
    },
        atualiza(){
            globais.flappyBird.atualiza();
        }
};


function loop(){ 
    telaAtiva.atualiza();
    telaAtiva.desenho();
    
    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();