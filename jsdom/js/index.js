document.getElementById('titulo').innerText = "Hola desde JS"

const eH2 = document.createElement('h2')
eH2.innerText = 'Soy un h2'
document.body.appendChild(eH2)

const eDiv = document.createElement('div')
eDiv.innerText = 'Soy un div'
eDiv.style.cssText = 'background-color: red; color: white;'
document.body.appendChild(eDiv)

const eInput = document.createElement('input')
document.body.appendChild(eInput)

const eButton = document.createElement('button')
eButton.innerText = 'Soy un boton creado con JS'
document.body.appendChild(eButton)

eButton.addEventListener("click", function(event){
  alert('Haz hecho un click')
})

