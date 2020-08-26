const inputField = document.getElementById("uncheckedInput");
const outputField = document.getElementById("checkedOutput");
const processBtn = document.querySelector("button");
const framerateInput = document.getElementById("framerate-input");

const replaceFn = framerate => {
    framerate = Number(framerateInput.value);
    console.log(framerate);
    const expression = /(:)(\d\d)(?=\s)/g;
    let text = inputField.value.replace(expression, function (match, p1, p2) {
        let milliseconds = (Number(p2) / framerate * 1000).toFixed(0);
        if (!/\d{3}/.test(milliseconds)) {

            milliseconds = "0".concat(milliseconds.toString());
            if (!/\d{3}/.test(milliseconds)) {
                milliseconds = "0".concat(milliseconds.toString());
            }
        }
        return ",".concat(milliseconds);
    })
    console.log(text);
    outputField.value = text;
    return text;
};
processBtn.addEventListener("click", replaceFn);