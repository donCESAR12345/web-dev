let map;

let eafit_coords = [];
let eafit_markers = [];
const eafit_icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_EAFIT.svg/320px-Logo_EAFIT.svg.png";
// const eafit_polyline = 
// [
//   [6.197517748197423, -75.57850639417443],
//   [6.19820770356412, -75.57815513049803],
// ];

window.onload = function() 
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(init_map, display_error);  
  }
  else
  {
    display_error();
  }
}

window.init_map = function(position)
{
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  let coord = new google.maps.LatLng(lat, lng);

  let map_options = 
    {
      zoom : 8,
      center: coord,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  map = new google.maps.Map(document.getElementById("map"), map_options);

  eafit_coords.push({ 
    lat : 6.199072529524611,
    lng : -75.57871015758644
  });
  add_markers(eafit_coords, eafit_markers, eafit_icon);
}

function add_markers(coords, markers, icon)
{
  for(let index in coords)
  {
    let marker_options = 
      {
        position: coords[index],
        label: "EAFIT",
        icon: icon
      };
    let marker = new google.maps.Marker(marker_options);
    markers.push(marker);
  }
}

function display_error()
{
  alert("¡Error!");
}


