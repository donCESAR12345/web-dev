// Variables globales
let user_lat;
let user_lng;
let user_coords;
let map;
let directions_service;
let directions_renderer;
let university_selector;

// Variables globales de marcadores
let global_markers = [];
let eafit_markers = [];
let udea_markers = [];
let udem_markers = [];
let upb_markers = [];
let uniminuto_markers = [];

// Variables globales de polilíneas
let eafit_polylines = [];
let udea_polylines = [];
let udem_polylines = [];
let upb_polylines = [];
let uniminuto_polylines = [];

class University
{
  markers = [];
  polylines = [];
  cluster = null;
  infowindow = null;

  constructor(name)
  {
    this.name = name;
  }

  add_markers(marker_data)
  {
    // Create icon
    let icon = new google.maps.MarkerImage(
      marker_data['icon_url'],
      null,
      null,
      null,
      new google.maps.Size(48, 48)
    );
    // Create markers for every coords
    for(let index in marker_data['coords'])
    {
      let marker_options = 
        {
          position: marker_data['coords'][index],
          icon: icon,
          optimized: true
        };
      let marker = new google.maps.Marker(marker_options);
      marker.setMap(map);
      this.markers.push(marker);
    }
    // Assign cluster into object
    let markers = this.markers;
    this.cluster = new markerClusterer.MarkerClusterer({map, markers});
  }

  add_interactions(info)
  {
    // Create InfoWindow
    const content_str = 
      '<div id="content">' +
      '<h1 id="firstHeading" class="firstHeading">' +
      info['long_name'] +
      '</h1>' +
      '<div id="bodyContent">' +
      "<p>" +
      info['description'] +
      "</p>" +
      "<img src='" +
      info['image'] +
      "' width='100%'/>" +
      '<p>Ref: <a href="' +
      info['reference'] +
      '">Wikipedia</a>' +
      "</div>" +
      "</div>";
    this.infowindow = new google.maps.InfoWindow({content: content_str});

    for(let i in this.markers)
    {
      // Add event listener for opening InfoWindow
      this.markers[i].addListener("mouseover", () => 
      {
        this.infowindow.open(
        {
          anchor: this.markers[i],
          map: map,
          shouldFocus: true
        });
      });
      
      // Add event listener for closing InfoWindow
      this.markers[i].addListener("mouseout", () => 
      {
        this.infowindow.close();
      });
      
      // Add event listener for tracing route
      this.markers[i].addListener("click", () =>
      {
        let request = 
        {
          origin: user_coords,
          destination: this.markers[i].getPosition(),
          travelMode: 'DRIVING'
        }
        directions_service.route(request, function(result, status)
        {
          if(status == "OK")
          {
            directions_renderer.setDirections(result);
          }
        });
      });

      // Add event listener foro opening university website
      this.markers[i].addListener("dblclick", () => 
      {
        window.location.href = info['link'];
      });
    }
  }
}

let EAFIT = new University("EAFIT");
let UdeA = new University("UdeA");
let UdeM = new University("UdeM");
let Uniminuto = new University("Uniminuto");
let UPB = new University("UPB");

window.onload = function() 
{
  university_selector = document.getElementById("university_select");
  // university_selector.onchange = update_markers;

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
  user_lat = position.coords.latitude;
  user_lng = position.coords.longitude;
  user_coords = new google.maps.LatLng(user_lat, user_lng);

  let map_options = 
    {
      zoom : 9,
      center: user_coords,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  map = new google.maps.Map(document.getElementById("map"), map_options);
  directions_service = new google.maps.DirectionsService();
  directions_renderer = new google.maps.DirectionsRenderer();
  directions_renderer.setMap(map);

  // Universidad EAFIT
  const eafit_marker_data = 
  {
    coords: 
    [
      {
        lat : 6.199072529524611,
        lng : -75.57871015758644
      }
    ],
    icon_url: "https://raw.githubusercontent.com/donCESAR12345/web-dev/00d3028b7156c420fb17358dc9d183883ef1a56a/Laboratorio3/universidades/assets/icons/eafit_icon.svg"
  };
  const eafit_info = 
  {
    long_name: "Universidad EAFIT",
    description: 
     "La Universidad EAFIT (originalmente las siglas de Escuela de Administración,\
     Finanzas e Instituto Tecnológico) es una universidad privada colombiana.\
     Su sede principal se encuentra en el sur de la ciudad de Medellín,\
     en el barrio El Poblado. También cuenta con sedes en Bogotá, Pereira y Rionegro.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Mapa-EAFIT.png/1024px-Mapa-EAFIT.png",
    reference: "https://es.wikipedia.org/wiki/Universidad_EAFIT",
    link: "https://www.eafit.edu.co/"
  };

  EAFIT.add_markers(eafit_marker_data);
  EAFIT.add_interactions(eafit_info);

  // Universidad de Antioquia
  const udea_marker_data =
  {
    coords: 
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
    ],
    icon_url: "https://raw.githubusercontent.com/donCESAR12345/web-dev/00d3028b7156c420fb17358dc9d183883ef1a56a/Laboratorio3/universidades/assets/icons/udea_icon.svg"
  };
  const udea_info =
  {
    long_name: "Universidad de Antioquia",
    description: 
    "La Universidad de Antioquia (U. de A.) es la institución de educación superior más\
    importante del departamento de Antioquia (Colombia). Fundada en 1803,\
    y de régimen público, la Universidad de Antioquia es reconocida como una de las\
    mejores universidades del país.\
    Su campus principal, Ciudad Universitaria, está ubicado en la ciudad de Medellín,\
    y cuenta además con las sedes de Ciudadela Universitaria de Robledo,\
    Edificio San Ignacio y Área de la Salud. También tiene sedes alternas en los\
    municipios de Puerto Berrío, Caucasia, Santa Fe de Antioquia, Segovia, Amalfi,\
    El Carmen de Viboral, Sonsón, Andes, Carepa, Apartadó, Turbo y Yarumal.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Plazuela_CentralUdeA.JPG",
    reference: "https://es.wikipedia.org/wiki/Universidad_de_Antioquia",
    link: "https://www.udea.edu.co/"
  };
  UdeA.add_markers(udea_marker_data);
  UdeA.add_interactions(udea_info);

  // Universidad de Medellínj
  const udem_marker_data =
  {
    coords: 
    [
      {
        lat: 6.231522954173981,
        lng: -75.6101902827443
      }
    ],
    icon_url: "https://raw.githubusercontent.com/donCESAR12345/web-dev/ac125f656da9424a7ac698f3684d54ca1dd6f30f/Laboratorio3/universidades/assets/icons/udem_icon.svg"
  };
  const udem_info =
  {
    long_name: "Universidad de Medellín",
    description: 
    "La Universidad de Medellín (UdeMedellín o UdeM) es una universidad privada\
    colombiana. Fue fundada en el año 1950 por un destacado grupo de profesores e\
    intelectuales, como respuesta a la intolerancia y a la persecución política que\
    se vivía en el país, con el ánimo de crear una institución laica y de cátedra\
    libre apartada de las ideologías políticas del momento. Su oferta académica\
    consta de 27 pregrados, 36 especializaciones, 21 maestrías y 6 doctorados.\
    En 2021 el Ministerio de Educación Nacional renovó la Acreditación\
    Institucional de Alta Calidad de la universidad hasta 2027.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Plaza_de_la_Libertad_-_Universidad_de_Medell%C3%ADn.jpg/1024px-Plaza_de_la_Libertad_-_Universidad_de_Medell%C3%ADn.jpg",
    reference: "https://es.wikipedia.org/wiki/Universidad_de_Medellín",
    link: "https://www.udemedellin.edu.co/"
  };
  UdeM.add_markers(udem_marker_data);
  UdeM.add_interactions(udem_info);

  // Corporación Universitaria Minuto de Dios
  const uniminuto_marker_data =
  {
    coords: 
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
    ],
    icon_url: "https://raw.githubusercontent.com/donCESAR12345/web-dev/ac125f656da9424a7ac698f3684d54ca1dd6f30f/Laboratorio3/universidades/assets/icons/uniminuto_icon.svg"
  };
  const uniminuto_info =
  {
    long_name: "Corporación Universitaria Minuto de Dios",
    description: 
    "La Corporación Universitaria Minuto de Dios (UNIMINUTO) o (UMD)\
    es una universidad privada y católica de Colombia, con sede principal en Bogotá,\
    sujeta a inspección y vigilancia por medio de la Ley 1740 de 2014 y\
    la ley 30 de 1992 del Ministerio de Educación de Colombia. Fue fundada en 1990\
    por el sacerdote Rafael García-Herreros. Ofrece programas académicos de pregrado,\
    posgrado en especialización y maestría, además de educación continua en\
    modalidades presencial y a distancia.\
    Cuenta con certificación ICONTEC ISO 9001:2008 y desde 2012 está en proceso de\
    autoevalución con fines de acreditación institucional por parte del\
    Consejo Nacional de Acreditación. Tiene 103 grupos de investigación certificados\
    en Minciencias y 17 programas con Registro de Alta calidad.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/UNIMINUTO_S.P.jpg/1024px-UNIMINUTO_S.P.jpg",
    reference: "https://es.wikipedia.org/wiki/Corporación_Universitaria_Minuto_de_Dios",
    link: "https://www.uniminuto.edu/"
  };
  Uniminuto.add_markers(uniminuto_marker_data);
  Uniminuto.add_interactions(uniminuto_info);

  // Universidad Pontificia Bolivariana
  const upb_marker_data =
  {
    coords: 
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
    ],
    icon_url: "https://raw.githubusercontent.com/donCESAR12345/web-dev/ac125f656da9424a7ac698f3684d54ca1dd6f30f/Laboratorio3/universidades/assets/icons/upb_icon.svg"  
  };
  const upb_info =
  {
    long_name: "Universidad Pontificia Bolivariana",
    description: 
    "La Universidad Pontificia Bolivariana (UPB) es una universidad privada y\
    católica colombiana. Su oferta académica abarca la educación básica desde el\
    nivel preescolar, hasta doctorados en el nivel universitario, contando con\
    75 pregrados, 109 especializaciones, 62 maestrías y 10 doctorados.\
    Su población estudiantil asciende a 25 823 alumnos. Desde 2018, la UPB cuenta\
    con Acreditación de Alta Calidad Multicampus, otorgada por el Ministerio de\
    Educación Nacional por un período de 6 años.\
    La institución fue fundada por la Arquidiócesis de Medellín en 1936,\
    siendo la primera Universidad Bolivariana de América Latina. Además de su\
    sede principal en Medellín, cuenta con seccionales en Bucaramanga, Montería,\
    Palmira, Bogotá y un colegio en Marinilla. Posee también una Clínica\
    Universitaria (Medellín), un sello editorial y sus emisoras culturales\
    (Radio Bolivariana A.M. y F.M.).",

    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Biblioteca_Central_UPB.jpg/1024px-Biblioteca_Central_UPB.jpg",
    reference: "https://es.wikipedia.org/wiki/Universidad_Pontificia_Bolivariana",
    link: "https://www.upb.edu.co/"
  };
  UPB.add_markers(upb_marker_data);
  UPB.add_interactions(upb_info);
}

function display_error()
{
  alert("¡Error!");
}


