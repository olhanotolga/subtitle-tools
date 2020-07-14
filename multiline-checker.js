const inputField = document.getElementById("uncheckedInput");
const outputField = document.getElementById("checkedOutput");

const checkBtn = document.querySelector("button");

const multilineSubtitleRegex = /(\d{0,}?\n{0,}?\s{0,}?(\d{1,2}[,.:]){3}\d{1,3}\s{0,}-?-?>?\s{0,}(\d{1,2}[,.:]){3}\d{1,3}(\n|\u000A|\v|\u000B|\f|\u000C|\r|\u000D|\r\n|\u000D\u000A|\u0085|\u2028|\u2029))(.{1,}(\n|\u000A|\v|\u000B|\f|\u000C|\r|\u000D|\r\n|\u000D\u000A|\u0085|\u2028|\u2029))(.{1,}(\n|\u000A|\v|\u000B|\f|\u000C|\r|\u000D|\r\n|\u000D\u000A|\u0085|\u2028|\u2029))(.{1,}(\n|\u000A|\v|\u000B|\f|\u000C|\r|\u000D|\r\n|\u000D\u000A|\u0085|\u2028|\u2029)?)+/gm;

const checkForThreeOrMoreLines = () => {
    let input = inputField.value;

    if (multilineSubtitleRegex.test(input)) {

        let multilineSubtitlesArray = input.match(multilineSubtitleRegex);
        console.log(input.match(multilineSubtitleRegex));
        let subtitlesArrayLength = multilineSubtitlesArray.length;

        const errors = [];

        let ul = document.createElement("ul");
        outputField.append("The following subtitles have more than 2 lines:")
        outputField.appendChild(ul);
        
        for (let i = 0; i < subtitlesArrayLength; i++) {
            let newItem = document.createElement("li");
            ul.appendChild(newItem);
            newItem.textContent = `${multilineSubtitlesArray[i]}`;
            
            ul.classList.add("error");

            errors.push(i);

        }

    } else {
        let ul = document.createElement("ul");
        ul.textContent = `All subtitles contain no more than 2 lines!`;
        outputField.appendChild(ul);
        ul.classList.add("correct");
    }
}
const clearOutput = () => {
    outputField.innerHTML = "";
}

checkBtn.addEventListener("click", () => {
    clearOutput();
    checkForThreeOrMoreLines();
});