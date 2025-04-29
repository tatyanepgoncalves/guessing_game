let secretNumber = 0
const level = document.getElementById("level") 
const statusText = document.getElementById("statusText")
const numberInput = document.getElementById("number")
const textStatus = document.createElement("span")
const mode = document.getElementById("mode")
const body = document.querySelector("body")
const modeStatus = document.createElement("img")
const buttonReset = document.createElement("button")
statusText.appendChild(buttonReset)
statusText.appendChild(textStatus)
mode.appendChild(modeStatus)
modeStatus.alt = "Icon Moon"
modeStatus.src = "./src/images/moon.svg"

mode.addEventListener("click", (e) => {
  e.preventDefault()
  body.classList.toggle("dark")
  const isDark = body.classList.contains("dark")

  modeStatus.src = isDark ? "./src/images/sun.svg" : "./src/images/moon.svg"
  modeStatus.alt = isDark ? "Icon Sun" : "Icon Moon"
})

function generateSecretNumber() {
  let maxNumber

  if (level.value === "easy") {
    maxNumber = 100
  } else if (level.value === "medium") {
    maxNumber = 500
  } else if (level.value === "hard") {
    maxNumber = 1000
  } else {
    maxNumber = 100
  }

  secretNumber = Math.floor(Math.random() * maxNumber) + 1
}

function numberStatus(event) {
  event.preventDefault()
  
  const number = Number(numberInput.value)
  textStatus.textContent = ""
  buttonReset.classList.remove("visible")
  

  if (!secretNumber) {
    textStatus.textContent = "Escolha uma dificuldade primeiro!"
    return
  }

  if (number === secretNumber) {
    textStatus.textContent = "Acertou! 🎯"
    buttonReset.classList.add("visible")
    buttonReset.textContent = "Reiniciar"
  } else if (number > secretNumber) {
    buttonReset.classList.remove("visible")
    textStatus.textContent = "Muito alto! ⬆️"
  } else {
    buttonReset.classList.remove("visible")
    textStatus.textContent = "Muito baixo! ⬇️"
  }
}


buttonReset.addEventListener("click", (e) => {
  e.preventDefault()
  level.value = ""
  textStatus.textContent = "" 
  numberInput.value = ""

  generateSecretNumber()
  buttonReset.textContent = ""
  buttonReset.classList.remove("visible")
})



document.querySelector("form").addEventListener("submit", numberStatus);
level.addEventListener("change", generateSecretNumber);
