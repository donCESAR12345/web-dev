window.onload = function()
{
  let data = document.forms[0].elements;

  // Aplicar la debida restricción a cada entrada de información
  for(let i = 0; i < data.length; i++)
  {
    let data_element = data[i];
    // Restringir entradas no numéricas
    if(data_element.classList.contains("no-numbers"))
    {
      data_element.onkeypress = restrict_no_numbers;
    }
    // Restringir entradas solamente numéricas
    else if(data_element.classList.contains("only-numbers"))
    { 
      data_element.onkeypress = restrict_only_numbers;
    }
    // Restringir entradas de direcciones
    else if(data_element.classList.contains("address"))
    {
      data_element.onkeypress = restrict_address;
    }
    // Restringir fechas futuras
    else if(data_element.classList.contains("date"))
    {
      restrict_date(data_element);
    }
  }
}

function basic_restrict(regex, key, value)
{
  // Se valida el char code ingresado
  let char_code = (typeof key.which == "undefined") ? key.keyCode : key.which;
  // Se transforma el caracter tecleado en string
  let str_char_code = String.fromCharCode(char_code);
  // Se verifica si es doble espacio
  let double_space_ok = value[value.length - 1] != ' ' || str_char_code != ' ';
  // Se actualiza el valor para comprobar la regex
  let value_to_check = value + str_char_code;

  return(regex.test(value_to_check) && double_space_ok);
}

function restrict_no_numbers(event)
{
  // Se declara la regex de nombres permitidos
  const valid_regex = /^(?! +)[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]+$/i;
  return(basic_restrict(valid_regex, event, this.value));
}

function restrict_only_numbers(event)
{
  // Se declara la regex de solamente números sin espacios al inicio 
  const valid_regex = /^(?! +)[\d]+$/i;
  return(basic_restrict(valid_regex, event, this.value));
}

function restrict_address(event)
{
  // Se declara la regex de caracteres válidos de las direcciones
  const valid_regex = /^(?! +)[\d\w#\- ]+$/i;
  return(basic_restrict(valid_regex, event, this.value));
}

function restrict_date(date_element)
{
  // Obtiene la fecha de hoy
  let today = new Date();
  // Le resta un día
  today.setDate(today.getDate() - 1);
  // Toma el substring de la fecha en formato deseado
  today = today.toISOString().slice(0, 10);
  // Declara el máximo del elemento
  date_element.max = today;
}

