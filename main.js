var oldPrice = 0;
var lastValueChange = luxon.DateTime.local();
function getDolarValue() {
  return fetch("https://economia.awesomeapi.com.br/all/usd-brl").then(function(
    response
  ) {
    return response.json().then(function(body) {
      return (
        Number(body.USD.bid)
          .toFixed(2)
          .replace(".", ",") + " BRL"
      );
    });
  });
}

function changeDolar(dolar) {
  document.querySelector(".dolar-price").innerHTML = dolar;
}

function playCoin(sound) {
  var sound = new Audio(sound + ".mp3");
  sound.play();
}

function resetTimer() {
  lastValueChange = luxon.DateTime.local();
}

function pad(number) {
  return number < 10 ? "0" + Math.trunc(number) : Math.trunc(number).toString();
}

function updateTime() {
  var time = luxon.DateTime.local().diff(lastValueChange, [
    "minutes",
    "hours",
    "seconds"
  ]).values;

  var formatedTime = `${pad(time.hours)}:${pad(time.minutes)}:${pad(
    time.seconds
  )}`;

  document.querySelector(".time").innerHTML = formatedTime;
}

function checkDolarRaise(dolar) {
  if (dolar > oldPrice) {
    playCoin("coin-sound");
    resetTimer();
  }

  if (dolar < oldPrice) {
    playCoin("wrong");
  }
  oldPrice = dolar;
}

setInterval(function() {
  getDolarValue().then(function(dolar) {
    changeDolar(dolar);
    checkDolarRaise(dolar);
  });
}, 5000);

getDolarValue().then(function(dolar) {
  changeDolar(dolar);
});
updateTime();
setInterval(updateTime, 1000);
