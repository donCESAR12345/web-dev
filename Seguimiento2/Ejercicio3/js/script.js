function is_palindrome(str)
{   
    str = str.toLowerCase().replaceAll(" ", "");
    r_str = str.split("").reverse().join("");
    return(str == r_str ? "es palíndromo" : "no es palíndromo");
}

while(true)
{ 
    alert("El texto ingresado " + is_palindrome(prompt("Ingrese un texto: ")));
}
