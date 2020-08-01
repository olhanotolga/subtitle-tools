const inputField = document.getElementById("uncheckedInput");
const outputField = document.getElementById("checkedOutput");
const multipleSpaces = /  +/g;
const unnecessarySpaces = / (\.)| (,)| (:)| (;)/g;
const trailingSpacesStart = /^ +/gm;
const trailingSpacesEnd = / +$/gm;
const processBtn = document.querySelector("button");
const comment = document.getElementById("comment");

processBtn.addEventListener("click", function(){
  let input = inputField.value;
  // fix repeating spaces:
  let output = input.replace(multipleSpaces, " ");
  
  // fix spaces before commas or periods or colons or semicolons:
  output = output.replace(unnecessarySpaces, "$1$2$3$4");

  // fix trailing spaces:
  output = output.replace(trailingSpacesStart, "");
  output = output.replace(trailingSpacesEnd, "");

  // display output:
  outputField.value = output;
  // display information on errors in the input:
  let multipleLength;
  let unnecessaryLength;
  let trailingSpacesStartLength;
  let trailingSpacesEndLength;

  if (!multipleSpaces.test(input)) {
    multipleLength = 0;
  } else {
    multipleLength = input.match(multipleSpaces).length;
  }
  if (!unnecessarySpaces.test(input)) {
    unnecessaryLength = 0;
  } else {
    unnecessaryLength = input.match(unnecessarySpaces).length;
  }
  if (!trailingSpacesStart.test(input)) {
    trailingSpacesStartLength = 0;
  } else {
    trailingSpacesStartLength = input.match(trailingSpacesStart).length;
  }
  if (!trailingSpacesEnd.test(input)) {
    trailingSpacesEndLength = 0;
  } else {
    trailingSpacesEndLength = input.match(trailingSpacesEnd).length;
  }
  
  if (multipleLength || unnecessaryLength) {
    let info = multipleLength + unnecessaryLength + trailingSpacesStartLength + trailingSpacesEndLength;
    comment.textContent = `Fixed: ${info} instances of redundant spaces.`;
  } else {
    comment.textContent = `No critically redundant spaces found.`;
  }
  comment.classList.add('correct');
});

