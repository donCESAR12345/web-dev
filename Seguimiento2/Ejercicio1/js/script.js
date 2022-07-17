function is_even(n)
{   
    if(!isNaN(n)) return(n % 2 == 0 ? "par" : "impar");
    else return "inválido";
}

while(true)
{ 
    alert("El número ingresado es " + is_even(parseInt(prompt("Ingrese un número: "))));
}
