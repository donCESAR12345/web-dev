// Taken from https://www.w3schools.com/howto/howto_js_read_more.asp
function show_more(btn_id, span_id, dots_id, more, less) 
{
  var btn_text = document.getElementById(btn_id);
  var more_text = document.getElementById(span_id);
  var dots = document.getElementById(dots_id);

  if (dots.style.display === "none") 
  {
    dots.style.display = "inline";
    btn_text.innerHTML = more;
    more_text.style.display = "none";
  } 
  else
  {
    dots.style.display = "none";
    btn_text.innerHTML = less;
    more_text.style.display = "inline";
  }
}
