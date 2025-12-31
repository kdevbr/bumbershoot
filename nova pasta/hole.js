let som = document.getElementById("thunder")

let childrens = document.querySelectorAll('.son')
let thunders = document.querySelectorAll('img')
let dad = document.getElementById('dad')
let pe = document.getElementById('h22')

let selecionado = 2;
let maximoDireita = 3;
let maximoEsquerda = 1;
let maximo = childrens.length - 1;
let esquerdaa = -1;

window.addEventListener('keypress', (x) => {
  if (x.code === 'KeyA') {
    raio()
    esquerda()
  }
  if (x.code === 'KeyD') {
    raio()
    direita()
  }
})

function direita() {
    if (true) {
      console.log(dad.children.length)
      selecionado++;//aumentar o selecionado
      if (maximoDireita == selecionado){
        maximoDireita++;
        dad.append(CreatDiv(fibo(selecionado+2)));
      }
      //remover a anteirior e adicionar a proxima
      

    }
    AtualizarHud()
}
function esquerda() {
      selecionado--;//diminuir o selecionado
       if (maximoEsquerda == selecionado){
        maximoEsquerda--;
        dad.prepend(CreatDiv(fibo(selecionado+2)));
      }
    
    AtualizarHud()
}

function AtualizarHud() {
dad.style.transform = `translateX(calc(-${160 * selecionado + 80}px + 50%))`
pe.innerText = `${selecionado}`
  Array.from(dad.children).forEach((x) => {
    x.classList.remove('rabbitEnteredTheHole')
  })
  Array.from(dad.children)[selecionado+(maximoEsquerda-1)*-2].classList.add('rabbitEnteredTheHole')
}

function Start() {
for (let index = 0; index < 5; index++) {
  dad.append(CreatDiv(fibo(index)))
}
AtualizarHud()
}
Start()

/*let childrens = document.querySelectorAll('.son')

/*
setInterval(() => {
 childrens[1].classList.toggle('rabbitEnteredTheHole')
 childrens[2].classList.toggle('rabbitEnteredTheHole')
}, 2000);
*/

function raio() {

  som.currentTime = 0
  //som.play();

  thunders.forEach((x) => {
    x.style.opacity = "1"
  })

  setTimeout(() => {
    thunders.forEach((x) => {
      x.style.opacity = "0"
    })
  }, 100)
}
function fibo(sec){
  if (sec === 0) return 0
  if (sec === 1) return 1

  let a = 0
  let b = 1
  let cache
  for(let i = 2; i <= sec; i++){
    cache = a+b
    a=b
    b=cache
  }
  return cache
}
function CreatDiv(text){
  let div = document.createElement('div')
  div.classList.add('son')
  div.innerText = text
  return div;
}