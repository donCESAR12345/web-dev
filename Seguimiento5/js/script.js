window.onload = function()
{
  let data = document.forms[0].elements;

  // Aplicar la debida restricción a cada entrada de información
  for(let i = 0; i < data.length; i++)
  {
    // Restringir entradas no numéricas
    if(data[i].classList.contains("no-numbers"))
    {
      data[i].onkeypress = restrict_no_numbers;
    }
    else if(data[i].classList.contains("only-numbers"))
    { 
      data[i].onkeypress = restrict_only_numbers;
    }
  }
}

function restrict_no_numbers(event)
{
  // Se declara la regex de nombres permitidos
  const valid_regex = /^(?! +)[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]+$/i;
  // Se valida el char code ingresado
  let char_code = (typeof event.which == "undefined") ? event.keyCode : event.which;
  // Se concatena el valor recién ingresado con el valor anterior
  let actual_value = this.value + String.fromCharCode(char_code);
  // console.log(actual_value);
  return(valid_regex.test(actual_value));
}

function restrict_only_numbers(event)
{
  // Se declara la regex de nombres permitidos
  const valid_regex = /^(?! +)[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]+$/i;
  // Se valida el char code ingresado
  let char_code = (typeof event.which == "undefined") ? event.keyCode : event.which;
  // Se concatena el valor recién ingresado con el valor anterior
  let actual_value = this.value + String.fromCharCode(char_code);
  // console.log(actual_value);
  return(valid_regex.test(actual_value));
}

