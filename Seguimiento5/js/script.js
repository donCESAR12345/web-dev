window.onload = function()
{
    let data = document.forms[0].elements;

    // Restricción de nombres y apellidos
    for(let i = 0; i < data.length; i++)
    {
        if(data[i].name == name || data[i].name == l-name)
        {
            data[i].onkeypress = restrict_name;
        }
    }

    for(let i = 0; i < data.length; i++)
    {
        data[i].on = validate;
    }
}

function restrict_name(event)
{
    let valid_characters = range(a, z) + range(A, Z) +  ;
    console.log(event.charCode);
    return(valid_characters.indexOf(String.fromCharCode(event.charCode)) != -1);
}

function validate()
{
    let name_regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i;

}

function* iterate(a, b)
{
  for (let i = a; i <= b; i += 1)
  {
    yield i
  }
}

function range(a, b)
{
    if(typeof a === 'string')
    {
        let result = [...iterate(a.charCodeAt(), b.charCodeAt())].map(n => String.fromCharCode(n));
        return result;
    }
    else
    {
        return [...iterate(a, b)];
    }
}
