var oldPrice = 0

function getDolarValue() {
  return fetch('https://economia.awesomeapi.com.br/all/usd-brl').then(function (response) {
    return response.json().then(function (body) {
      return Number(body.USD.bid).toFixed(2).replace('.', ',') + ' BRL'
    })
  })
}

function changeDolar (dolar) {
  document.querySelector('.dolar-price').innerHTML = dolar
}

function playCoin (sound) {
  var sound = new Audio(sound + ".mp3");
  sound.play();
}

function checkDolarRaise (dolar) {
  if(dolar > oldPrice) {
    playCoin('coin-sound')
  }

  if(dolar < oldPrice) {
    playCoin('wrong')
  }
  oldPrice = dolar
}

setInterval(function () {
  getDolarValue().then(function (dolar) {
    changeDolar(dolar)
    checkDolarRaise(dolar)
  })
}, 5000)

getDolarValue().then(function (dolar) {
  changeDolar(dolar)
})