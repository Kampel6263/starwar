
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let score = 0
let antiScore = 0

let scoreContinue = 0

const field = document.getElementById('field')

setInterval(() => {
  for (let i = 0; i < 5; i++) {
    let star = document.createElement('div')
    let i = 0
    star.classList.add('star')
    star.style.top = '0px'
    star.style.left = `${Math.floor(getRandomInt(950))}px`
    setInterval(() => {
      star.style.top = `${i}px`
      i += 2
      if (i > 700) {
        star.remove()
      }
    }, 20)
    field.appendChild(star)
  }
}, 700)

let asteroidArr = []
let dotArr = []

const ship = document.getElementById('ship')

let shipX = 400

ship.style.left = `${shipX}px`

let isMoove = false

let direction = ''


setInterval(() => {
  if (isMoove) {
    if (direction === 'left') {
      if (shipX > 7) {
        shipX -= 7
      }

    } else if (direction === 'right') {
      if (shipX < 1000 + 5) {
        shipX += 7
      }

    }
    ship.style.left = `${shipX}px`
  }

}, 20)


let leftKeyPress = false
let rightKeyPress = false


window.addEventListener('keydown', (props) => {

  if (props.key === 'ArrowLeft') {

    direction = 'left'
    isMoove = true
    leftKeyPress = true

  } else if (props.key === 'ArrowRight') {
    rightKeyPress = true
    direction = 'right'
    isMoove = true
  }
})

window.addEventListener('keyup', (props) => {

  if (props.key === 'ArrowLeft') {
    if (!rightKeyPress) {
      isMoove = false
    }
    direction = 'right'
    leftKeyPress = false


  } else if (props.key === 'ArrowRight') {
    if (!leftKeyPress) {
      isMoove = false
    }
    direction = 'left'
    rightKeyPress = false

  }
})






window.addEventListener('keydown', (props) => {
  if (props.code === 'Space') {

    let dot = document.createElement('div')
    let dotToLeft = document.createElement('div')
    let dotToRight = document.createElement('div')
    let dotToLeft2 = document.createElement('div')
    let dotToRight2 = document.createElement('div')

    dot.classList.add('dot')
    dotToLeft.classList.add('dot')
    dotToRight.classList.add('dot')
    dotToLeft2.classList.add('dot')
    dotToRight2.classList.add('dot')

    dot.style.left = `${shipX + 25}px`
    let shipY = 160

    let dotxRight = shipX
    let dotxLeft = shipX

    let dotxRight2 = shipX
    let dotxLeft2 = shipX

    setInterval(() => {
      dot.style.bottom = `${shipY}px`
      dotToLeft.style.bottom = `${shipY}px`
      dotToLeft.style.left = `${dotxRight + 25}px`
      dotToLeft2.style.bottom = `${shipY}px`
      dotToLeft2.style.left = `${dotxRight2 + 25}px`

      dotToRight.style.bottom = `${shipY}px`
      dotToRight.style.left = `${dotxLeft + 25}px`
      dotToRight2.style.bottom = `${shipY}px`
      dotToRight2.style.left = `${dotxLeft2 + 25}px`
      shipY += 10
      dotxRight += 10 / 5
      dotxLeft -= 10 / 5

      dotxRight2 += 10 / 2
      dotxLeft2 -= 10 / 2

      for (el of asteroidArr) {

      }
      if (shipY > 700) {
        // delete el
        dot.remove()
        dotToLeft.remove()
        dotToRight.remove()
        dotToLeft2.remove()
        dotToRight2.remove()
      }
    }, 30)
    // if (scoreContinue >= 10 && scoreContinue <= 30) {
    //   // field.appendChild(dot)
    //   field.appendChild(dotToLeft)
    //   field.appendChild(dotToRight)
    // } else if (scoreContinue > 30) {
    //   field.appendChild(dot)
    //   field.appendChild(dotToLeft)
    //   field.appendChild(dotToRight)
    // } else {
    //   field.appendChild(dot)
    // }
    field.appendChild(dot)
    field.appendChild(dotToLeft)
    field.appendChild(dotToRight)
    field.appendChild(dotToLeft2)
    field.appendChild(dotToRight2)

  }
})

let isDeleted

setInterval(() => {

  let asteroid = document.createElement('div')
  asteroid.classList.add('asteroid')
  let asteroidY = -100
  let rotateDeg = Math.floor(getRandomInt(180))
  asteroid.style.left = `${Math.floor(getRandomInt(1000)) - 50}px`
  const testInterval = setInterval(() => {
    asteroid.style.top = `${asteroidY}px`
    asteroid.style.transform = `rotate(${rotateDeg}deg)`
    if (asteroidY > 560) {
      asteroid.remove()

      if (asteroid.getAttribute('deleted') !== 'true') {
        antiScore++
        scoreContinue = 0
      }



      clearInterval(testInterval)
    }


    asteroidY++
    rotateDeg++


    document.getElementById('antiScore').innerText = scoreContinue + ' '
  }, 10)





  field.appendChild(asteroid)


}, 2000)


const deleteAsteroid = () => {

  let dotArr = Array.from(document.getElementsByClassName('dot'))
  let asteroidArr = Array.from(document.getElementsByClassName('asteroid'))

  for (el of dotArr) {
    for (itm of asteroidArr) {

      if (el.offsetTop > itm.offsetTop && el.offsetTop <= itm.offsetTop + 50 && el.offsetLeft > itm.offsetLeft && el.offsetLeft <= itm.offsetLeft + 50) {

        itm.remove()
        el.remove()
        itm.setAttribute("deleted", "true")
        score++
        scoreContinue++
        document.getElementById('score').innerText = score
      }
    }
  }
}




setInterval(() => {

  deleteAsteroid()
}, 10)