// Variable global del mapa
let map;

// Variables globales generales
let markers = [];
let eafit_markers = [];
let udea_markers = [];
let udem_markers = [];
let upb_markers = [];
let uniminuto_markers = [];

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
  let user_coords = new google.maps.LatLng(user_lat, user_lng);

  let map_options = 
    {
      zoom : 9,
      center: user_coords,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  map = new google.maps.Map(document.getElementById("map"), map_options);

  // Crear marcadores de EAFIT
  const eafit_icon_url = "https://raw.githubusercontent.com/donCESAR12345/web-dev/00d3028b7156c420fb17358dc9d183883ef1a56a/Laboratorio3/universidades/assets/icons/eafit_icon.svg";
  const eafit_coords = 
  [
    {
      lat : 6.199072529524611,
      lng : -75.57871015758644
    }
  ];
  let eafit_icon = new google.maps.MarkerImage(
    eafit_icon_url,
    null,
    null,
    null,
    new google.maps.Size(48, 48)
  )
  add_markers(eafit_coords, eafit_markers, eafit_icon);

  // Crear marcadores de la UdeA
  const udea_icon_url = "https://raw.githubusercontent.com/donCESAR12345/web-dev/00d3028b7156c420fb17358dc9d183883ef1a56a/Laboratorio3/universidades/assets/icons/udea_icon.svg";
  const udea_coords = 
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
  let udea_icon = new google.maps.MarkerImage(
    udea_icon_url,
    null,
    null,
    null,
    new google.maps.Size(48, 48)
  );
  add_markers(udea_coords, udea_markers, udea_icon);

  // Crear marcadores de la UdeM
  const udem_icon_url = "https://raw.githubusercontent.com/donCESAR12345/web-dev/ac125f656da9424a7ac698f3684d54ca1dd6f30f/Laboratorio3/universidades/assets/icons/udem_icon.svg";
  const udem_coords = 
  [
      {
        lat: 6.231522954173981,
        lng: -75.6101902827443
      }
  ];
  let udem_icon = new google.maps.MarkerImage(
    udem_icon_url,
    null,
    null,
    null,
    new google.maps.Size(48, 48)
  )
  add_markers(udem_coords, udem_markers, udem_icon);

  // Crear marcadores de la Uniminuto
  const uniminuto_icon_url = "https://raw.githubusercontent.com/donCESAR12345/web-dev/ac125f656da9424a7ac698f3684d54ca1dd6f30f/Laboratorio3/universidades/assets/icons/uniminuto_icon.svg";
  const uniminuto_coords = 
  [
      {
        lat: 6.250149457155128,
        lng: -75.56632219999646
      },
      {
        lat: 6.171290036221311, 
        lng: -75.60666721282595
      },
      {
        lat: 6.311026008605729, 
        lng: -75.55451337500229
      }
  ];
  let uniminuto_icon = new google.maps.MarkerImage(
    uniminuto_icon_url,
    null,
    null,
    null,
    new google.maps.Size(48, 48)
  )
  add_markers(uniminuto_coords, uniminuto_markers, uniminuto_icon);

  // Crear marcadores de la UPB
  const upb_icon_url = "https://raw.githubusercontent.com/donCESAR12345/web-dev/ac125f656da9424a7ac698f3684d54ca1dd6f30f/Laboratorio3/universidades/assets/icons/upb_icon.svg";
  const upb_coords = 
  [
      {
        lat: 6.242365947279352, 
        lng: -75.58988220974942
      },
      {
        lat: 6.277641254837518, 
        lng: -75.5833287125053
      },
      {
        lat: 6.207742376159124, 
        lng: -75.57318323679442
      },
      {
        lat: 6.12401498407729, 
        lng: -75.4212748043453
      },
      {
        lat: 6.1714722008978455, 
        lng: -75.32882437603197
      }
  ];
  let upb_icon = new google.maps.MarkerImage(
    upb_icon_url,
    null,
    null,
    null,
    new google.maps.Size(48, 48)
  )
  add_markers(upb_coords, upb_markers, upb_icon);
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


