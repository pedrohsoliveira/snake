//variaveis

var x = 45
var y = 97
var opcao = 1;
var tela = 0;
var img;

let apple;
let gap = 15;
let snake;
let pLoc = {};
let highest = 0;
let game_over = new Audio('assets/game_over.mp3');
let eat = new Audio('assets/eat.mp3');



function preload(){
  img = loadImage('minha1.jpeg')
}


function setup() {
  createCanvas(510, 510);
  apple = new Fruit();
    snake = new Head();
    frameRate(12);
    textSize(14);
    textStyle(BOLD);

    for (let i = 0; i < 2; i++) {
        snake.tails.push(new Tail(snake.x, snake.y + (15 * i)));
    }
  
}

function draw() {
  background(225);
  if(tela==0)
  menu();
  if(tela==1)
  fase1();
  if(tela==2)
  Instruções();
  if(tela==3)
  Créditos();
  
  
  
  
}
function menu(){
  fill(200, 200, 0)
  rect(147, y, 200, 45, 50);
  fill(0, 0, 0)
  cursor (HAND)
  
  
  textSize(32);
  textAlign(CENTER);
  text('Jogo da Cobrinha', 250, 50);
  text('Jogar', 250, 130);
  text('Instruções', 250, 230);
  text('Créditos', 250, 330);
  
}

function fase1(){
  
    noFill();
    noStroke();
    for (let i = 0; i < height; i += gap) {
        for (let j = 0; j < width; j += gap) {

            rect(j, i, gap, gap);

        }
    }
    //
    for (let i = snake.tails.length - 1; i >= 0; i--) {
        if (i == 0) {
            snake.tails[i].x = snake.x;
            snake.tails[i].y = snake.y;
        } else {
            snake.tails[i].x = snake.tails[i - 1].x;
            snake.tails[i].y = snake.tails[i - 1].y;
        }
        snake.tails[i].show();
    }


    pLoc.x = snake.x;
    pLoc.y = snake.y;
    snake.update();

    if (snake.collision(apple)) {
        eat.play();
        snake.score++;
        apple.eat();
        snake.tails.push(new Tail(pLoc.x, pLoc.y));
    }
    if (snake.score > highest) {
        highest = snake.score;
    }
    if (snake.collision(apple) == false || snake.tail_collide() == true) {
        game_over.play();
        snake.redefine();
        apple.eat();
    }

    apple.show();

    fill(43, 51, 25);
    text("Score: " + int(snake.score), 100, height - 35);
    text("Highest: " + int(highest), 100, height - 10);
    snake.show();
    noFill();
    strokeWeight(4);
    stroke(43, 51, 25);
    rect(1, 1, width - 2, height - 2);
  //************************************************
  
}

 function Instruções(){
  textSize(32);
  textAlign(CENTER);
  text('Instruções', 250, 50);
   
  textSize(15);
   textAlign(CENTER);
  fill(0, 0 , 0);
   text('O jogador assume o papel da cobra e precisa ir', 250, 140)
   text('encontrando comida em seu caminho, com o corpo da', 250, 160)
   text('serpente ficando cada vez mais longo. Não pode encostar', 250, 180)
   text('nas laterais e não pode tocar com a cabeça no corpo da serpente.', 250, 200)
  text('1. Selecione a opção pelas teclas para cima e para baixo.', 250, 240);
  text('2. Para escolher a opção desejada aperte a tecla (Enter).', 250, 260);
  text('3. Aperte Esc para voltar ao Menu.', 250, 280);
  text('.', 250, 300);
  text('.', 250, 320);
} 

function Créditos(){
  cursor (HAND)
  image (img, 0, 0)
  fill(200,200,0)
  rect(10, 200, 480, 150);
  textSize(32);
  textAlign(CENTER);
  text('Créditos', 250, 50);
 
  textSize(18)
  text('Pedro Henrique da Silva Oliveira', 275, 140);
  text('PROGRAMADOR', 210, 100);
  
  
  textSize(20);
  textAlign(CENTER);
  fill(0, 0 , 0);
  text('Graduando de Ciências e Tecnologia pela', 250, 240);
  text('Universidade Federal do Rio Grande do Norte.', 250, 260);
  text('Disciplina: Lógica de Programação.', 250, 280);
  text('Prof. Orientador: Rummenigge Rudson Dantas.', 250, 300);
  text('Filipi Emanuel Vieira Taveiros.', 335, 320);
  
}

function keyPressed(){
  if(key=="ArrowUp" && y>130){
    y=y-100
    opcao=opcao-1;
    console.log(opcao)
  }
   if(key=="ArrowDown" && y<=280){
    y=y+100;
     opcao=opcao+1;
     console.log(opcao)
   }
  if (key=="Enter"){
    tela=opcao
    
  }
  if(key=="Escape"){
    tela=0
  }
   if (keyCode == LEFT_ARROW && snake.dir != 'right') {
        snake.dir = 'left';
    } else if (keyCode == RIGHT_ARROW && snake.dir != 'left') {
        snake.dir = 'right';
    } else if (keyCode == UP_ARROW && snake.dir != 'down') {
        snake.dir = 'up';
    } else if (keyCode == DOWN_ARROW && snake.dir != 'up') {
        snake.dir = 'down';
    }
}


   