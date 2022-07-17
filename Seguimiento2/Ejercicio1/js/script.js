function is_even(n)
{   
    if(n != null) return(n % 2 == 0 ? "par" : "impar");
    else return "indefinido";
}

while(true)
{ 
    alert("El número ingresado es " + is_even(parseInt(prompt("Ingrese un número: "))));
}
