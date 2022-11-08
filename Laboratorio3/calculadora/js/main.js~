// Variables globales
let main_input;
let post_input;
let inverse_functions = false;
let angle_units = "rad"; 
let last_ans = "0";
let ac_button;
let inv_button;
let ang_button;
let ans_button;
let equals_button;
// Registro para inicializar botones que escriben
const buttons_reg = 
{
  fact  : {writes: "!",             button: "!"},
  sin   : {writes: "sin( sin⁻¹(", button: "sin sin⁻¹"},
  ln    : {writes: "ln( e^(",     button: "ln eˣ"},     
  pi    : {writes: "π",             button: "π"},         
  cos   : {writes: "cos( cos⁻¹(", button: "cos cos⁻¹"}, 
  log   : {writes: "log₁₀( 10^(", button: "log₁₀ 10ˣ"}, 
  e     : {writes: "e",             button: "e"},         
  tan   : {writes: "tan( tan⁻¹(", button: "tan tan⁻¹"}, 
  sqrt  : {writes: "√( ²",         button: "√ x²"},         
  exp   : {writes: "E",             button: "EXP"},         
  pow   : {writes: "^( ^(1/",     button: "xʸ ʸ√x"},
  op    : {writes: "(",             button: "("},
  cp    : {writes: ")",             button: ")"},
  mod   : {writes: "%",             button: "%"},
  div   : {writes: "÷",             button: "÷"},
  mult  : {writes: "×",             button: "×"},
  minus : {writes: "-",             button: "-"},
  sum   : {writes: "+",             button: "+"},
  dot   : {writes: ".",             button: "."},
  0     : {writes: "0",             button: "0"},
  1     : {writes: "1",             button: "1"},
  2     : {writes: "2",             button: "2"},
  3     : {writes: "3",             button: "3"},
  4     : {writes: "4",             button: "4"},
  5     : {writes: "5",             button: "5"},
  6     : {writes: "6",             button: "6"},
  7     : {writes: "7",             button: "7"},
  8     : {writes: "8",             button: "8"},
  9     : {writes: "9",             button: "9"},
};
// Arreglo de botones refinados 
let buttons = [];

class AcButton
{
  constructor(dom)
  {
    this.dom = dom;
    this.dom.addEventListener("click", this.clear_input);
  }

  clear_input()
  {
    main_input.innerHTML = "0";
    post_input.innerHTML = "";
  }
}

class AngButton
{
  constructor(dom)
  {
    this.dom = dom; 
    this.dom.addEventListener("click", this.toggle_angular_units);
  }

  toggle_angular_units()
  {
    angle_units = angle_units == "deg" ? "rad" : "deg";
    if(angle_units == "deg")
    {
      document.getElementById("rad").classList.add("not-selected");
      document.getElementById("deg").classList.remove("not-selected");
    }
    else
    {
      document.getElementById("deg").classList.add("not-selected");
      document.getElementById("rad").classList.remove("not-selected");
    }
  }
}

class InvButton
{
  constructor(dom)
  {
    this.dom = dom;
    this.dom.addEventListener("click", this.invert_functions);
  }

  invert_functions()
  {
    inverse_functions = !inverse_functions;
    for(let i in buttons)
    {
      if(buttons[i].invertible)
      {
        let dom = buttons[i].dom;
        dom.innerHTML = buttons[i].button
        [
          inverse_functions ? 1 : 0
        ];
      }
    }
    ans_button.dom.innerHTML = ans_button.button
    [
      inverse_functions ? 1 : 0
    ];
  }
}

class AnsButton
{
  constructor(dom, button)
  {
    this.dom = dom;
    this.button = button.split(' ');
    this.invertible = this.button.length > 1;
  }
}

class EqualsButton
{
  constructor(dom)
  {
    this.dom = dom;
    this.dom.addEventListener("click", this.equals);
  }
  
  equals()
  {
    last_ans = math.evaluate(main_input); 
    main_input.innerHTML = last_ans;
  }
}

class Button
{
  constructor(dom, writes, button)
  {
    var me = this;
    this.dom = dom;
    this.writes = writes.split(' ');
    this.button = button.split(' ');
    this.invertible = this.button.length > 1;

    this.validate = function(char)
    {
      let actual_input = main_input.innerHTML;
      let buffer = post_input.innerHTML;

      const number_regex = /\d/;
      const const_regex = /[πe]/;
      const operation_regex = /[+-×÷^%!]/;
      const last_number_regex = /[\.\d]*(?!.*\d)/;

      const last_digit = actual_input[actual_input.length - 1];

      // Testear paréntesis
      if(char == "(")
      {
        if(last_digit != ".")
        {
          if(buffer.length > 0)
          {
            if(operation_regex.test(buffer[0]))
            {
              let operation = buffer[0];
              post_input.innerHTML = ')' + buffer.slice(1);
              return actual_input + operation + char;
            }
          }

        }
        return actual_input;
      }
      if(char == ")")
      {
        if(buffer.length > 0)
        {
          if(buffer.indexOf(char) != -1)
          {
            post_input.innerHTML = buffer.slice(buffer.indexOf(char) + 1);
            return actual_input + char;
          }
        }
      }
      // Testear entrada numérica
      if(number_regex.test(char))
      {
        if(actual_input == "0")
        {
          return char;
        }
        if(last_digit == "-")
        {
          return actual_input + char;
        }
        if(buffer.length > 0)
        {
          if(operation_regex.test(buffer[0]))
          {
            let operation = buffer[0];
            post_input.innerHTML = buffer.slice(1);
            return actual_input + operation + char;
          }
        }
        return actual_input + char;
      }
      // Testear entrada de punto decimal
      if(char == ".")
      {
        if(last_number_regex.test(actual_input) && 
           !operation_regex.test(buffer))
        {
          const last_number = actual_input.match(last_number_regex)[0];
          if(last_number.indexOf(".") == -1)
          {
            return actual_input + char;
          }
        }
        return actual_input;
      }
      // Testear entrada de operaciones
      else if((operation_regex.test(char) && actual_input != "0") ||
              char == "-")
      {
        // Comparar si sobreescribir la operación
        if(actual_input == "0" && char == "-")
        {
          return char;
        }
        if(last_digit != "." && last_digit != "-")
        {
          if(buffer.length > 0)
          {
            if(buffer[0] == "+" && char == "-")
            {
              post_input.innerHTML = buffer.slice(1);
              return actual_input + char;
            }
            if(operation_regex.test(buffer[0]))
            {
              if(char == "-" && buffer[0] != "-")
              {
                let operation = buffer[0];
                post_input.innerHTML = ")" + buffer.slice(1);
                return actual_input + operation + "(" + char;
              }
              post_input.innerHTML = char + buffer.slice(1);
              return actual_input;
            }
          }
          post_input.innerHTML = char + buffer;
          return actual_input;
        }
      }
      // Testear menos como signo
      // if(operation_regex.test(buffer[0]))
      // {
      //     let operation = buffer[0];
      //     post_input.innerHTML = buffer.slice(1);
      //     return operation + char;
      // }
      return actual_input;
    }

    this.write_to_input = function()
    {
      let write = me.writes
      [
        inverse_functions && me.invertible ? 1 : 0
      ];

      main_input.innerHTML = me.validate(write);
    }
    this.dom.addEventListener('click', this.write_to_input);
  }
}

window.onload = function()
{
  main_input = document.getElementById("main-input")
  post_input = document.getElementById("post-input")
  ac_button = new AcButton(document.getElementById("ac-btn"));
  inv_button = new InvButton(document.getElementById("inv-btn"));
  ang_button = new AngButton(document.getElementById("ang-btn"));
  ans_button = new AnsButton(document.getElementById("ans-btn"), "Ans Rnd");
  equals_button = new EqualsButton(document.getElementById("equals-btn"));
  
  for(let id in buttons_reg)
  {
    let dom = document.getElementById(`${id}-btn`);
    let writes = buttons_reg[id]['writes'];
    let button = buttons_reg[id]['button'];
    buttons.push(new Button(dom, writes, button)); 
  }
}
