let som = document.getElementById("thunder")

let childrens = document.querySelectorAll('.son')
let thunders = document.querySelectorAll('img')
let dad = document.getElementById('dad')

let selecionado = 0;
let maximo = childrens.length - 1;

dad.style.transform = `translateX(calc(-${160*selecionado+80}px + 50%))`

window.addEventListener('keypress',(x)=>{
 if (x.code  === 'KeyA') {
    
    if(selecionado > 0){
      selecionado--;
      dad.style.transform = `translateX(calc(-${160*selecionado+80}px + 50%))`
    }
    teclar()
  }
  if (x.code  === 'KeyD') {
    
    if(selecionado < maximo){
      selecionado++;
      dad.style.transform = `translateX(calc(-${160*selecionado+80}px + 50%))`
    }
    teclar()
  }
console.log(selecionado)
})
teclar()
function teclar(){

  som.currentTime = 0
  som.play();
 
  thunders.forEach((x)=>{

   x.style.opacity = "1"
  })
  
  setTimeout (()=>{
    thunders.forEach((x)=>{
      x.style.opacity = "0"})
    },100)

      childrens.forEach((x)=>{
        x.classList.remove('rabbitEnteredTheHole')
      })
      childrens[selecionado].classList.add('rabbitEnteredTheHole')
      
}

/*let childrens = document.querySelectorAll('.son')



/*
setInterval(() => {
 childrens[1].classList.toggle('rabbitEnteredTheHole')
 childrens[2].classList.toggle('rabbitEnteredTheHole')
}, 2000);
*/