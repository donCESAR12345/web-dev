// Variable global del mapa
let map;

// Variables globales generales
let markers = [];
let eafit_markers = [];
let udea_markers = [];

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
  let user_lat = position.coords.latitude;
  let user_lng = position.coords.longitude;
  let coord = new google.maps.LatLng(user_lat, user_lng);

  let map_options = 
    {
      zoom : 9,
      center: coord,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  map = new google.maps.Map(document.getElementById("map"), map_options);

  // Crear marcadores de EAFIT
  let eafit_coords = 
  [
    {
      lat : 6.199072529524611,
      lng : -75.57871015758644
    }
  ];
  
  const eafit_icon_url = "https://svgur.com/i/mXz.svg";
  let eafit_icon = new google.maps.MarkerImage(
    eafit_icon_url,
    null,
    null,
    null,
    new google.maps.Size(48, 48)
  )
  add_markers(eafit_coords, eafit_markers, eafit_icon);

  // Crear marcadores de la UdeA
  let udea_coords = 
  [
      {
        lat: 6.267820727224462,
        lng: -75.56885433374535
      },
      {
        lat: 6.261415884020201,
        lng: -75.5663551368828
      },
      {
        lat: 6.272569355695053, 
        lng: -75.58761478699007
      },
      {
        lat: 6.198139320828839, 
        lng: -75.5842191219998
      },
      {
        lat: 6.105618571649276, 
        lng: -75.38758194108358
      },
      {
        lat: 6.555055302878294, 
        lng: -75.82649687362516
      }
  ];
    
  const udea_icon_url = "https://svgur.com/i/mZ9.svg";
  let udea_icon = new google.maps.MarkerImage(
    udea_icon_url,
    null,
    null,
    null,
    new google.maps.Size(48, 48)
  )
  add_markers(udea_coords, udea_markers, udea_icon);
}

function add_markers(coords, markers, icon)
{
  for(let index in coords)
  {
    let marker_options = 
      {
        position: coords[index],
        icon: icon,
        optimized: true
      };
    let marker = new google.maps.Marker(marker_options);
    marker.setMap(map);
    markers.push(marker);
  }
  markers.push(new markerClusterer.MarkerClusterer({markers, map}));
}

function display_error()
{
  alert("¡Error!");
}


