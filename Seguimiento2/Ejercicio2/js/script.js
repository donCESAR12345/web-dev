function how_much_caps(str)
{   
    if(str == str.toUpperCase()) return("solo mayúsculas");
    if(str == str.toLowerCase()) return("solo minúsculas");
    return("tanto mayúsculas como minúsculas");
}

while(true)
{ 
    alert("El texto ingresado contiene " + how_much_caps(prompt("Ingrese un texto: ")));
}
