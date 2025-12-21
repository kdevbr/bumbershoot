let som = document.getElementById("thunder")

let thunders = document.querySelectorAll('img')
window.addEventListener('keypress',(x)=>{
 if (x.code  === 'KeyH') {
    teclar()
  }
  if (x.code  === 'KeyY') {
    teclar()
  }
  console.log(x.code, x.key)
})

function teclar(){
  console.log("TURAMMM!")
  som.currentTime = 0
  som.play();

  thunders.forEach((x)=>{

   x.style.opacity = "1"

  })
  
  setTimeout (()=>{
    thunders.forEach((x)=>{

   x.style.opacity = "0"})

  },100)
  
}
