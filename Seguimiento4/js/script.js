function toggle_content()
{
    let paragraph_id = "contenidos_" + this.id.split("_")[1];
    let paragraph = document.getElementById(paragraph_id);

    if(this.innerHTML == "Ocultar contenidos")
    {
        paragraph.classList.add("hidden");
        this.innerHTML = "Mostrar contenidos"
    }
    else
    {
        paragraph.classList.remove("hidden");
        this.innerHTML = "Ocultar contenidos";
    }
}

window.onload = function()
{
    let links = document.body.getElementsByTagName("a"); 
    for(let i = 0; i < links.length; i++)
    {
        links[i].onclick = toggle_content;
    }
}
