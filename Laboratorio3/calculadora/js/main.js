// Bandera para funciones inversas
var inverse_functions = false;
// Lista donde se guardarán los botones
var btns = [];
// Entrada de datos
var input;

class Button
{
  constructor(dom, name, fn, invertible)
  {
    this.dom = dom;
    this.name = name;
    this.fn = fn;
    this.dom.onclick = this.fn;
    this.invertible = invertible;
  }
}

function write_to_input()
{
  console.log("Working with DOM:");
  console.log(this.name);
  console.log(this.invertible);
  if(this.invertible)
  {
    input.value += inverse_functions ? this.name.split()[1] : this.name.split[0];
  }
  else
  {
    input.value += this.name;
  }
}

function write_fn_to_input()
{
  if(this.invertible)
  {
    input.value += inverse_functions ? this.name.split()[1] : this.name.split[0];
  }
  else
  {
    input.value = input.value + this.name;
  }
}

function clear_input()
{
  input.value = "0";
}

function inverse()
{
  inverse_functions = !inverse_functions; 
  for(let btn in btns)
  {
    if(btn.invertible)
    {
      if(inverse_functions)
      {
        btn.dom.classList.remove("inverse");
      }
      else
      {
        btn.dom.classList.add("inverse");
      }
    }
  }
}

// Registro para inicializar botones
const btns_reg = 
{
  "fact" : ["!",         write_to_input,    false],
  "inv"  : ["inverse",   inverse,           false],
  "sin"  : ["sin sin⁻¹", write_fn_to_input, true],
  "ln"   : ["ln e^",     write_fn_to_input, true],
  "pi"   : ["π",         write_to_input,    false],
  "cos"  : ["cos cos⁻¹", write_fn_to_input, true],
  "log"  : ["log₁₀ 10^", write_fn_to_input, true],
  "e"    : ["e",         write_to_input,    false],
  "tan"  : ["tan tan⁻¹", write_fn_to_input, true],
  "sqrt" : ["√",         write_fn_to_input, true],
  "ans"  : ["ans rnd",   write_to_input,    true],
  "exp"  : ["E",         write_to_input,    false],
}

window.onload = function()
{
  input = document.getElementById("main-input")

  let index = 0;
  for(let id in btns_reg)
  {
    let dom = document.getElementById(`${id}-btn`);
    let properties = btns_reg[id];
    let name = properties[0];
    let fn = properties[1];
    let invertible = properties[2]
    let btn = new Button(dom, name, fn, invertible);
    btns[index] = btn;
    index += 1; 
  }

  // for(let i = 0; i <= 9; i++)
  // {
  //   dom = document.getElementById(`${i}-btn`);
  //   dom.onclick = write_number;
  //   number_btns[i] = dom;
  // }
}
