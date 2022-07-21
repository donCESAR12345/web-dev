function number_of_tags(tag)
{
    const amount = document.getElementsByTagName(tag).length;
    console.log("Hay " + amount + " etiquetas de enlaces en la página.");
}

function where_penultimate_tag()
{
    const tags = document.getElementsByTagName("a");
    const penultimate_tag = tags[tags.length -  2];
    console.log("El penúltimo enlace dirige a: " + penultimate_tag.href);
}

function how_many_links_to(link)
{
    const links = document.getElementsByTagName("a");
    let number_of_links_to_link = 0;
    for(const a of links)
    {
        if(a.hasAttribute("href"))
        {
            number_of_links_to_link += String(a.href) === link ? 1 : 0;
        }
    }
    console.log("El número de enlaces que enlazan a " + link + 
                " es " + number_of_links_to_link);
}

function number_of_y_in_the_nth_x(x, y, nth)
{
    const x_element = document.getElementsByTagName(x);
    const nth_x = x_element[nth - 1];
    const amount_of_y = nth_x.getElementsByTagName(y).length;
    console.log("El número de " + y + " en el " + x + " #" + nth +
                " es: " + amount_of_y);
}
