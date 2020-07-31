const inputField = document.getElementById("uncheckedInput");
const outputField = document.getElementById("checkedOutput");
const multipleSpaces = /  +/g;
const unnecessarySpaces = / (\.)| (,)| (:)| (;)/g;
const processBtn = document.querySelector("button");
const comment = document.getElementById("comment");

processBtn.addEventListener("click", function(){
  let input = inputField.value;
  // fix repeating spaces:
  let output = input.replace(multipleSpaces, " ");
  // fix spaces before commas or periods or colons or semicolons:
  output = output.replace(unnecessarySpaces, "$1$2$3$4");
  // display output:
  outputField.value = output;
  // display information on errors in the input:
  let info = input.match(multipleSpaces).length + input.match(unnecessarySpaces).length;
  comment.textContent = `Fixed: ${info} instances of redundant spaces.`;
  comment.classList.add('correct');
});
