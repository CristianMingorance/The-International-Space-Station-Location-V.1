var map = null;
var isMapLoad = false;
var interval = 5000;
let markers = [];

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


function personSpace() {
    let url = "http://api.open-notify.org/astros.json"

    function personsStation(response) {

        let personsOrbit = JSON.parse(response)["people"];
        let names = personsOrbit.name;
        console.log()
        
        for (let i = 0; i < names; i++) {
           
            
        }
     
    }
    httpGetAsync(url, personsStation)
    return;
}
function loadMap() {
    let url = "http://api.open-notify.org/iss-now.json"

    function positionPoint(response) {

        let positionNav = JSON.parse(response)["iss_position"];
        let lat = positionNav.latitude;
        let lon = positionNav.longitude;
        
        if (isMapLoad == false) {  
            initMap(lat, lon);
            isMapLoad = true;
        }
            
        let marker = addMarker(lat, lon, "International Space Station Location ");
        markers.push(marker);
        

    }
    httpGetAsync(url, positionPoint)
    return;
}


function initMap(latitude, longitude) {
    var myLatLng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };
    // myLatLng["lat".parseFloat(latitude)]
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });
}


function addMarker(latitude, longitude, title) {
    var myLatLng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };

/// TODO: cambiar iconos a bola roja

let img = "logo.png";
let img1 = "puntorojo.png"

for (let i = 0; i < markers.length; i++) {
   markers[i].setIcon(img1)
    
}

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: title,
        icon: img
        
    });


    return marker;
}
setInterval(function () {
    loadMap()
}, interval)


loadMap();