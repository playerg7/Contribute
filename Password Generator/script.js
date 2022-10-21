"use strict";
let passwordGenerated = document.querySelector(".star");
let copyButton = document.querySelector("#copy");
let copied = document.querySelector(".Copy-Password");
let lengths = document.querySelector("#quantity");
let ok = document.querySelector(".ok");
let upperCase = document.querySelector(".up");
let lowerCase = document.querySelector("#low");
let number = document.querySelector("#no");
let symbol = document.querySelector("#bol");
let generate = document.querySelector("#processing");
let generated = document.querySelector("#done");
let ucChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lcChar = "abcdefghijklmnopqrstuvwxyz";
let num = "0123456789";
let sym = "@#$%^&*!;:(){}[]";

ok.addEventListener("click", function () {
  let lengthUpdated = lengths.value;
  console.log(lengthUpdated);
});
let code = [];
generate.addEventListener("click", function () {
  copyButton.style.display = "block";

  for (let i = 0; i < lengths.value; i++) {
    let u = Math.floor(Math.random() * ucChar.length);
    let v = Math.floor(Math.random() * lcChar.length);
    let w = Math.floor(Math.random() * num.length);
    let x = Math.floor(Math.random() * sym.length);
    if (lowerCase.checked && code.length < lengths.value) {
      code.push(lcChar[v]);
    }
    if (upperCase.checked && code.length < lengths.value) {
      code.push(ucChar[u]);
    }
    if (number.checked && code.length < lengths.value) {
      code.push(num[w]);
    }
    if (symbol.checked && code.length < lengths.value) {
      code.push(sym[x]);
    }
    if (code.length > lengths.value) {
      break;
    }
  }
  let passcode = code.join(" ");
  passwordGenerated.textContent = passcode;
  generate.style.display = "none";
  generated.style.display = "block";

  copyButton.addEventListener("click", function () {
    copyButton.style.display = "none";
    copied.style.display = "block";
    navigator.clipboard.writeText(passcode).then(() => {
      alert("Copied to clipboard");
    });
  });
});

generated.addEventListener("click", function () {
  passwordGenerated.textContent = "********";
  lengths.value = 8;
  upperCase.checked = false;
  lowerCase.checked = false;
  number.checked = false;
  symbol.checked = false;
  generated.style.display = "none";
  generate.style.display = "block";
  copied.style.display = "none";
  copyButton.style.display = "none";
  code = [];
});
