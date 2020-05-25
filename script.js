const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

const throttle = (fn, ms) => {
  let lastFunc;
  let lastRun;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRun) {
      fn.apply(context, args);
      lastRun = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRun >= ms) {
          fn.apply(context, args);
          lastRun = Date.now();
        }
      }, ms - (Date.now() - lastRun));
    }
  };
};

function generate() {
  let hexValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hexValues[x];
      a += y;
    }
    return a;
  }

  let newColor1 = populate("#");
  let newColor2 = populate("#");
  let angle = Math.round(Math.random() * 360);

  let gradient =
    "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";

  document.getElementById("random-bg").style.background = gradient;
}

document.onload = generate();

const debounceFunction = debounce(() => {
  generate();
}, 600);

const throttleFunction = throttle(() => {
  generate();
}, 1500);
