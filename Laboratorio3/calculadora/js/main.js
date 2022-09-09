var number_btns = [];
var input;

window.onload = function()
{
  input = document.getElementById("main-input")

  for(let i = 0; i <= 9; i++)
  {
    dom_btn = document.getElementById(`${i}-btn`);
    number_btns[i] = dom_btn;

  }
}
