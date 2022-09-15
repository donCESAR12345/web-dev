// Variables globales
let inverse_functions = false;
let angle_units = "rad"; 
let last_ans = "0";

let main_input;
let post_input;
let ac_button;
let inv_button;
let ang_button;
let ans_button;
let equals_button;

// Expresiones regulares
const number_regex = /^[0-9]$/;
const const_regex = /^[πe]$/;
const operation_regex = /[+×÷%!E-]/;
const complex_op_regex = /\b(?:sin|ln|cos|log|tan)\b|[√\^²]/;
const last_number_regex = /E?[\.\d]*(?!.*\d)/;

// Arreglo de botones refinados 
let buttons = [];

// Registro para inicializar botones comúnes
const buttons_reg = 
{
  fact  : {writes: "!",           button: "!"},
  sin   : {writes: "sin( sin⁻¹(", button: "sin sin⁻¹"},
  ln    : {writes: "ln( e^(",     button: "ln eˣ"},     
  pi    : {writes: "π",           button: "π"},         
  cos   : {writes: "cos( cos⁻¹(", button: "cos cos⁻¹"}, 
  log   : {writes: "log₁₀( 10^(", button: "log₁₀ 10ˣ"}, 
  e     : {writes: "e",           button: "e"},         
  tan   : {writes: "tan( tan⁻¹(", button: "tan tan⁻¹"}, 
  sqrt  : {writes: "√( ²",        button: "√ x²"},         
  exp   : {writes: "E",           button: "EXP"},         
  pow   : {writes: "^( ^(1/",     button: "xʸ ʸ√x"},
  op    : {writes: "(",           button: "("},
  cp    : {writes: ")",           button: ")"},
  mod   : {writes: "%",           button: "%"},
  div   : {writes: "÷",           button: "÷"},
  mult  : {writes: "×",           button: "×"},
  minus : {writes: "-",           button: "-"},
  sum   : {writes: "+",           button: "+"},
  dot   : {writes: ".",           button: "."},
  0     : {writes: "0",           button: "0"},
  1     : {writes: "1",           button: "1"},
  2     : {writes: "2",           button: "2"},
  3     : {writes: "3",           button: "3"},
  4     : {writes: "4",           button: "4"},
  5     : {writes: "5",           button: "5"},
  6     : {writes: "6",           button: "6"},
  7     : {writes: "7",           button: "7"},
  8     : {writes: "8",           button: "8"},
  9     : {writes: "9",           button: "9"},
};

class AcButton
{
  constructor(dom)
  {
    this.dom = dom;
    this.dom.addEventListener("click", this.clear_input);
  }

  clear_input()
  {
    main_input.innerHTML = "";
    post_input.innerHTML = "0";
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
    // Invertir cada botón almacenado en en arreglo
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
    // Además invertir el botón de Ans/Rnd
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
    this.button = button.split(" ");
    this.invertible = this.button.length > 1;
    this.dom.addEventListener("click", this.pressed)
  }

  pressed() 
  {
    let input = main_input.innerHTML;
    let buffer = post_input.innerHTML;
    const error_input = /∞|ℝ/;
    const write = inverse_functions ? Math.random() : last_ans;

    // Si no hay un error pendiente y hay una respuesta diferente a 0
    // guardada
    if(!error_input.test(main_input.innerHTML) && write != "0")
    {
      const last_digit = input[input.length - 1];

      // Si la entrada está vacía reemplazarla
      if(input == "" && buffer == "0")
      {
        main_input.innerHTML = write;
        post_input.innerHTML = "";
        return input;
      }
      if(buffer.length > 0)
      {
        // Si se va a aplicar una operación, ponerla
        // antes del contenido
        if(last_digit == "(")
        {
          main_input.innerHTML = input + write;
        }
        if(operation_regex.test(buffer[0]) && buffer[0] != "E")
        {
          let operation = buffer[0];
          post_input.innerHTML = buffer.slice(1);
          main_input.innerHTML = input + operation + write;
        }
        return input;
      }
      // Si el último dígito es un número o una constante
      // o un abrir paréntesis, multiplicar por la constante
      if(const_regex.test(last_digit) ||
         number_regex.test(last_digit) ||
         last_digit == ")")
      {
        main_input.innerHTML = input + "×" + write;
      }
      // Si el último dígito es abrir paréntesis, permitirlo
      if(last_digit == "(")
      {
        main_input.innerHTML = input + write;
      }
    }
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
    let input = main_input.innerHTML;
    let buffer = post_input.innerHTML;
    const error_input = /∞|ℝ/;

    if(!error_input.test(main_input.innerHTML))
    {
      // Eliminar operaciones pendientes del buffer
      // o añadirlas en caso de que operen hacia la
      // izquierda
      if(operation_regex.test(buffer[0]))
      {
        if(buffer[0] == "!")
        {
          input += buffer[0];
        }
        buffer = buffer.slice(1);
      }
      input += buffer;

      // Naturalizar la entrada para poder procesarla
      let processable_input = input.replace(/×/g, "*");
      processable_input = processable_input.replace(/÷/g, "/");
      processable_input = processable_input.replace(/π/g, "pi");
      processable_input = processable_input.replace(/²/g, "^2");
      processable_input = processable_input.replace(/√/g, "sqrt");
      processable_input = processable_input.replace(/₁₀/g, "10");

      // Reemplazar funciones inversas trigonométricas
      const inv_regex = /(sin|cos|tan)⁻¹(\(.*\))/g;
      while(processable_input.indexOf("¹") != -1)
      {
        processable_input = processable_input.replace(inv_regex, `a$1$2`);
      }

      // Reemplazar los logaritmos naturales por su función en math.js
      processable_input = processable_input.replace(/ln/g, "log");

      // Añadir las unidades de grados de ser necesario
      const deg_regex = /((?<!a)sin|(?<!a)cos|(?<!a)tan)\(((?!.*deg).*?)\)/gm;
      while(deg_regex.test(processable_input) && angle_units == "deg")
      {
        processable_input = processable_input.replace(deg_regex, `$1($2 deg)`);
      }
      
      // Evaluar y formatear
      last_ans = math.evaluate(processable_input); 
      if(math.Infinity == last_ans)
      {
        last_ans = "∞"
      }
      if(-math.Infinity == last_ans)
      {
        last_ans = "-∞"
      }
      if(last_ans != "∞" && last_ans != "-∞")
      {
        if(math.complex(last_ans).im != 0)
        {
          last_ans = "Ans ∉ ℝ";
        }
      }

      // Escribir los datos evaluados en la calculadora
      last_operation.innerHTML = input + " = " + last_ans;
      main_input.innerHTML = last_ans;
      post_input.innerHTML = "";
    }
  }
}

class Button
{
  constructor(dom, writes, button)
  {
    var me = this;
    this.dom = dom;
    this.writes = writes.split(" ");
    this.button = button.split(" ");
    this.invertible = this.button.length > 1;

    this.val_op = function(input, buffer, char)
    {
      const last_digit = input[input.length - 1];

      // Si la entrada está vacía se sobreescribe
      if(input == "" && buffer == "0")
      {
        post_input.innerHTML = ")";
        return char;
      }
      // Si hay un punto decimal no se permite
      if(last_digit != ".")
      {
        if(buffer.length > 0)
        {
          // No permitir paréntesis cuando se tiene la E
          if(buffer[0] == "E")
          {
            return input;
          }
          // Si hay una operación pendiente se aplica antes del
          // paréntesis
          if(operation_regex.test(buffer[0]))
          {
            let operation = buffer[0];
            post_input.innerHTML = ")" + buffer.slice(1);
            return input + operation + char;
          }
        }
        // Si el último digito es abrir paréntesis o signo menos, se permite
        if(last_digit == char || last_digit == "-")
        {
          post_input.innerHTML = ")" + buffer;
          return input + char;
        }
        // Si el último digito es multiplicable, se multiplica
        if(number_regex.test(last_digit) || const_regex.test(last_digit) || last_digit == ")")
        {
            post_input.innerHTML = ")" + buffer;
            return input + "×" + char; 
        }
      }
      // Por defecto rechaza
      return input;
    }

    this.val_cp = function(input, buffer, char)
    {
      const last_digit = input[input.length - 1];

      if(buffer.length > 0)
      {
        // Si hay un factorial pendiente se aplica y se cierra
        if(buffer[0] == "!")
        {
          post_input.innerHTML = buffer.slice(buffer.indexOf(char) + 1);
          return input + "!" + char;
        }
        // Si hay un paréntesis por cerrar, no se está cerrando
        // inmediatamente o dejando una operación pendiente, se cierra 
        if(buffer.indexOf(char) != -1 && last_digit != "(" &&
          !operation_regex.test(last_digit))
        {
          post_input.innerHTML = buffer.slice(buffer.indexOf(char) + 1);
          return input + char;
        }
      }
      // Por defecto rechaza
      return input;
    }

    this.val_num = function(input, buffer, char)
    {
      const last_digit = input[input.length - 1];

      // Si la entrada está "vacía" se sobreescribe
      if(input == "" && buffer == "0")
      {
        post_input.innerHTML = "";
        return char;
      }

      if(buffer.length > 0)
      {
        // El factorial opera hacia atrás, por lo que
        // si intentamos poner un número después es
        // necesario multiplicar
        if(buffer[0] == "!")
        {
          post_input.innerHTML = buffer.slice(1);
          return input + "!×" + char;
        }
        // Si en el buffer hay una operación pendiente,
        // se añade a la entrada y se pone el número
        if(operation_regex.test(buffer[0]))
        {
          let operation = buffer[0];
          post_input.innerHTML = buffer.slice(1);
          return input + operation + char;
        }
      }
      // Si el último digito es una constante o un
      // cierre de paréntesis, se multiplica por el
      // número recién ingresado
      if(const_regex.test(last_digit) || 
         last_digit == ")")
      {
        return input + "×" + char;
      }
      // Por defecto entrega el número
      return input + char;
    }

    this.val_const = function(input, buffer, char)
    {
      const last_digit = input[input.length - 1];

      // Si la entrada está vacía reemplazarla
      if(input == "" && buffer == "0")
      {
        post_input.innerHTML = "";
        return char;
      }

      if(buffer.length > 0)
      {
        // Si se va a aplicar una operación, ponerla
        // antes de la constante
        if(operation_regex.test(buffer[0]) && buffer[0] != "E")
        {
          let operation = buffer[0];
          post_input.innerHTML = buffer.slice(1);
          return input + operation + char;
        }
      }
      // Si el último dígito es un número o una constante
      // o un abrir paréntesis, multiplicar por la constante
      if(number_regex.test(last_digit) ||
         const_regex.test(last_digit) ||
         last_digit == ")")
      {
        return input + "×" + char;
      }
      // Si el último dígito es abrir paréntesis o el signo menos,
      // poner la constante
      if(last_digit == "(" || last_digit == "-")
      {
        return input + char;
      }
      // Por defecto rechaza
      return input;
    }

    this.val_dot = function(input, buffer, char)
    {
      const last_digit = input[input.length - 1];
      // Si hay una operación pendiente o recién se abrió 
      // paréntesis no se permite
      if(input != "")
      {
        if(last_number_regex.test(input) && 
           !operation_regex.test(buffer) && last_digit != "(")
        {
          const last_number = input.match(last_number_regex)[0];
          // Si ya hay un punto en el último número o es una constante,
          // o es un exponente (E) no se permite
          if(last_number.indexOf(".") == -1 && !const_regex.test(last_digit) &&
             last_number.indexOf("E") == -1 && !operation_regex.test(last_digit))
          {
            return input + char;
          }
        }
      }
      // Por defecto rechaza
      return input;
    }

    this.val_opr = function(input, buffer, char)
    {
      const last_digit = input[input.length - 1];
      // Si está vacío y es menos reemplaza
      if(input == "" && buffer == "0")
      {
        if(char == "-")
        {
          post_input.innerHTML = "";
          return char;
        }
        return input;
      }
      // Si no hay un punto, abrir paréntesis, o menos
      if(last_digit != "." && last_digit != "-" && 
        (last_digit != "(" || (char == "-")))
      {
        if(buffer.length > 0)
        {
          // Si había una suma en el buffer y se presiona
          // menos se combinan en un menos
          if(buffer[0] == "+" && char == "-")
          {
            post_input.innerHTML = buffer.slice(1);
            return input + char;
          }
          // Si el operador pendiente es el factorial
          // se aplica y luego se pone la operación en el
          // buffer
          if(buffer[0] == "!")
          {
            post_input.innerHTML = char + buffer.slice(1);
            return input + "!";
          }
          // Si hay otra operación
          if(operation_regex.test(buffer[0]))
          {
            // Si había un E y se usa el menos, se acepta
            if(char == "-" && buffer[0] == "E")
            {
              post_input.innerHTML = buffer.slice(1);
              return input + "E" + char; 
            }
            // Si pongo un menos, se aplica la operación
            // se abre paréntesis y se pone el negativo
            if(char == "-" && buffer[0] != "-")
            {
              let operation = buffer[0];
              post_input.innerHTML = ")" + buffer.slice(1);
              return input + operation + "(" + char;
            }
            // Por defecto sobreescribe la operación
            post_input.innerHTML = char + buffer.slice(1);
            return input;
          }
        }
        // Si no había operación pendiente se pone
        post_input.innerHTML = char + buffer;
      }
      // Por defecto rechaza
      return input;
    }

    this.val_complex_opr = function(input, buffer, char)
    {
      const last_digit = input[input.length - 1];
      // Si la entrada está vacía se sobreescribe
      if(input == "" && buffer == "0")
      {
        // Siempre y cuando no sea una operación de potencia
        // sin base
        if(char[0] != "^" && char != "²")
        {
          post_input.innerHTML = ")";
          return char
        }
        // Si era una operación sin base, rechaza
        return input;
      }

      if(buffer.length > 0)
      {
        // Si es una potencia sin base...
        if(char[0] == "^" || char == "²")
        {
          // Y la operación pendiente es un factorial, se permite 
          if(buffer[0] == "!")
          {
            post_input.innerHTML = ")" + buffer.slice(1);
            return input + "!" + char;
          }
          // Caso contrario se rechaza
          return input;
        }
        // Si es después de una operación se permite
        if(operation_regex.test(buffer[0]))
        {
          // Siempre y cuando no sea una potencia sin base, o el E
          if(char != "²" && char[0] != "^" && buffer[0] != "E")
          {
            let operation = buffer[0];
            post_input.innerHTML = ")" + buffer.slice(1);
            return input + operation + char;
          }
          // Si era una de estas, rechaza
          return input;
        }
      }
      // Si es después de abrir paréntesis o después de
      // un signo negativo se permite, siempre que no
      // sea una potencia sin base
      if((last_digit == "(" || last_digit == "-") &&
          char[0] != "^" && char != "²")
      {
        post_input.innerHTML = ")" + buffer;
        return input + char;
      }
      // Si es después de un paréntesis se permite
      if(last_digit == ")")
      {
        // Si es potencia sin base genérica se añade
        // paréntesis al buffer
        if(char[0] == "^" || char == "²")
        {
          post_input.innerHTML = char == "²" ? "" : ")" + buffer;
          return input + char;
        }
        // Por defecto entrega la multiplicación
        post_input.innerHTML = ")" + buffer;
        return input + "×" + char;
      }
      // Si lo último fue un número/constante
      if(number_regex.test(last_digit) || const_regex.test(last_digit))
      {
        // Si la operación es una potencia sin base
        if(char[0] == "^" || char == "²")
        {
          post_input.innerHTML = char == "²" ? "" : ")" + buffer;
          return input + char;
        }
        // En caso de no ser una potencia sin base, se multiplica
        // por esta operación
        post_input.innerHTML = ")" + buffer;
        return input + "×" + char;
      }
      // Por defecto rechaza
      return input;
    }

    this.validate = function(char)
    {
      let input = main_input.innerHTML;
      let buffer = post_input.innerHTML;
      // Testear abrir paréntesis
      if(char == "(")
      {
        return this.val_op(input, buffer, char);
      }

      // Testear cerrar paréntesis
      if(char == ")")
      {
        return this.val_cp(input, buffer, char);
      }

      // Testear números
      if(number_regex.test(char))
      {
        return this.val_num(input, buffer, char);
      }
      
      // Testear entrada de constantes
      if(const_regex.test(char))
      {
        return this.val_const(input, buffer, char);
      }
      
      // Testear entrada de punto decimal
      if(char == ".")
      {
        return this.val_dot(input, buffer, char);
      }

      // Testear entrada de operaciones
      if((operation_regex.test(char) && input != "0") ||
              char == "-")
      {
        return this.val_opr(input, buffer, char);
      }

      // Testear entrada de operaciones complejas
      if(complex_op_regex.test(char))
      {
        return this.val_complex_opr(input, buffer, char);
      }
      return input;
    }

    this.write_to_input = function()
    {
      let write = me.writes
      [
        inverse_functions && me.invertible ? 1 : 0
      ];

      const error_input = /∞|ℝ/;

      if(!error_input.test(main_input.innerHTML))
      {
        main_input.innerHTML = me.validate(write);
      }
    }
    this.dom.addEventListener("click", this.write_to_input);
  }
}

window.onload = function()
{
  main_input = document.getElementById("main-input");
  post_input = document.getElementById("post-input");
  last_operation = document.getElementById("last-operation");
  ac_button = new AcButton(document.getElementById("ac-btn"));
  inv_button = new InvButton(document.getElementById("inv-btn"));
  ang_button = new AngButton(document.getElementById("ang-btn"));
  ans_button = new AnsButton(document.getElementById("ans-btn"), "Ans Rnd");
  equals_button = new EqualsButton(document.getElementById("equals-btn"));
  
  for(let id in buttons_reg)
  {
    let dom = document.getElementById(`${id}-btn`);
    let writes = buttons_reg[id]["writes"];
    let button = buttons_reg[id]["button"];
    buttons.push(new Button(dom, writes, button)); 
  }
}
