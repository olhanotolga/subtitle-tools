// SubRip Text example: https://www.speechpad.com/captions/srt

const inputField = document.getElementById("uncheckedInput");
const outputField = document.getElementById("checkedOutput");

const checkBtn = document.querySelector("button");

// EXPRESSIONS:
const fullTimecodeExpression = /\d+[\n\r(\n\r)](\d+:\d+:\d+,\d+)\s-->\s(\d+:\d+:\d+,\d+)/gm;
const startTimecodeExpression = /^(\d+:\d+:\d+,\d+)/gm;
const endTimecodeExpression = /(\d+:\d+:\d+,\d+)$/gm;
const timecodeNumberExpression = /^\d+$/gm;

// 3 functions, each creates an unordered list

// 1 - checks the order of timecodes' numbers
const compareTimecodeNumbers = () => {
    let input = inputField.value;
    let timecodeNumbersArr = input.match(timecodeNumberExpression);

    let ul = document.createElement("ul");
    outputField.appendChild(ul);

    const errors = [];

    for (let i = 1; i < timecodeNumbersArr.length; i++) {
        if (Number(timecodeNumbersArr[i]) != Number(timecodeNumbersArr[i-1])+1) {
            let newItem = document.createElement("li");
            newItem.textContent = `the order of subtitle numbers is wrong: ${timecodeNumbersArr[i]} does not immediately follow ${timecodeNumbersArr[i-1]}`;
            ul.appendChild(newItem);
            ul.classList.add("error");
            errors.push(timecodeNumbersArr[i]);
        }
    }
    if (errors.length == 0) {
        let newItem = document.createElement("li");
        newItem.textContent = `the order of subtitle numbers is correct`;
        ul.appendChild(newItem);
        ul.classList.add("correct");
    }
}

// 2 - checks if a subtitle starts before it ends (comapres start timecode with end timecode within one timecode expression)
const compareStartEndTimes = () => {
    let input = inputField.value;
    let fullTimecodesArr = input.match(fullTimecodeExpression);

    let ul = document.createElement("ul");
    outputField.appendChild(ul);

    const errors = [];

    for (let el of fullTimecodesArr) {
        let start = el.match(startTimecodeExpression);
        let end = el.match(endTimecodeExpression);
        if (end < start) {
            let newItem = document.createElement("li");
            newItem.textContent = `timecode ${el.match(timecodeNumberExpression)}: ${start} --> ${end} — starts later than ends`;
            ul.appendChild(newItem);
            ul.classList.add("error");
            errors.push(el.match(timecodeNumberExpression));
        }
    }
    if (errors.length == 0) {
        let newItem = document.createElement("li");
        newItem.textContent = `the order of the start and end times within each timecode seems to be correct`;
        ul.appendChild(newItem);
        ul.classList.add("correct");
    }
}

// 3 - checks if the previous subtitle ends before the next subtitle starts by comparing previous subtitle's end timecode with the next subtitle's start timecode
const compareTimecodeOrder = () => {
    let input = inputField.value;
    let timecodesArr = input.match(fullTimecodeExpression);

    let ul = document.createElement("ul");
    outputField.appendChild(ul);

    const errors = [];

    for (let i = 1; i < timecodesArr.length; i++) {
        if (timecodesArr[i].match(startTimecodeExpression) < timecodesArr[i-1].match(endTimecodeExpression)) {
            let newItem = document.createElement("li");
            newItem.textContent = `inconsistence in chronology: timecodes #${timecodesArr[i-1]} and #${timecodesArr[i]}`;
            ul.appendChild(newItem);
            ul.classList.add("error");
            errors.push(timecodesArr[i]);
        }
    }
    if (errors.length == 0) {
        let newItem = document.createElement("li");
        newItem.textContent = `timecodes seem to follow one another chronologically`;
        ul.appendChild(newItem);
        ul.classList.add("correct");
    }
}

// 4 — show the number of timecodes
const showTimecodesCount = () => {
    let input = inputField.value;
    let timecodesArr = input.match(fullTimecodeExpression);
    let timecodesArrayLength = timecodesArr.length;

    const comment = document.getElementById("comment");
    comment.textContent = `Total number of subtitles (by timecodes): ${timecodesArrayLength}`
    comment.classList.remove("hidden");
}

const clearOutput = () => {
    outputField.innerHTML = "";
}

checkBtn.addEventListener("click", () => {
    clearOutput();
    compareStartEndTimes();
    compareTimecodeNumbers();
    compareTimecodeOrder();
    showTimecodesCount();
});

