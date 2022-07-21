// Primer ejercicio
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
    let number_of_links_to_link = 0;
    for(const a of document.getElementsByTagName("a"))
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

// Segundo ejercicio
function create_a_title(text)
{
    // Creamos el elemento título y le agregamos contenido
    var title = document.createElement("h1");
    const title_text = document.createTextNode(text);
    title.appendChild(title_text);

    // Ubicamos el primer párrafo del cuerpo y metemos el
    // título antes de éste
    const first_paragraph = document.body.getElementsByTagName("p")[0];
    first_paragraph.insertAdjacentElement("beforebegin", title);
}

function create_a_paragraph()
{
    // Creamos el elemento párrafo y le agregamos contenido (Lorem)
    var paragraph = document.createElement("p");
    const lorem = document.createTextNode("Mauris sollicitudin, est vel tempus fringilla, mauris ante euismod augue, in condimentum felis est sit amet purus. Sed quis magna nec nulla blandit commodo. Curabitur imperdiet consectetur imperdiet. Phasellus fringilla ipsum vel sapien sodales rutrum. Suspendisse vel eros vulputate, lobortis urna id, consectetur velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget rutrum dui, semper porttitor turpis. Praesent varius arcu sed vehicula cursus. Integer viverra augue vel leo ultrices, sit amet dictum nisl vulputate. Maecenas in purus ultricies, imperdiet lacus nec, sagittis sapien. Maecenas bibendum risus nec augue sagittis posuere.");
    paragraph.appendChild(lorem);

    // Ubicamos el último párrafo del cuerpo y metemos el
    // nuevo párrafo después de éste
    let last_paragraph = document.body.getElementsByTagName("p");
    last_paragraph = last_paragraph[last_paragraph.length - 1];
    last_paragraph.insertAdjacentElement("afterend", paragraph);
}

function add_elements_to_list(list_name, list_elements)
{
    for(const element of list_elements)
    {
        // Creamos el elemento de input y añadimos sus atributos
        let sport_element = document.createElement("input");
        sport_element.setAttribute("name", list_name);
        sport_element.setAttribute("type", "checkbox");
        sport_element.setAttribute("value", element);

        // Creamos el elemento de texto y le añadimos su checkbox
        let sport_text = document.createTextNode(element + ":   ");

        // Añadimos este nuevo elemento al último encontrado
        let last_input = document.body.getElementsByTagName("input");
        last_input = last_input[last_input.length - 1];
        last_input.insertAdjacentElement("afterend", sport_element);
        // Recalculamos el último elemento para añadir el texto
        // antes del elemento en cuestión
        last_input = document.body.getElementsByTagName("input");
        last_input = last_input[last_input.length - 1];
        document.body.insertBefore(sport_text, last_input);
    }
}

function select_all_checkboxes()
{
    for(let input of document.getElementsByTagName("input"))
    {
        if(input.hasAttribute("type"))
        {
            if(input.type == "checkbox") input.setAttribute("checked", "");
        }
    }
}
