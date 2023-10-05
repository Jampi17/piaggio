let mapa;
let geocoder;

function initMap() {
    // Inicializa el mapa
    mapa = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -9.1900, lng: -75.0152 }, // Centro en Perú
        zoom: 6, // Nivel de zoom inicial
    });

    // Inicializa el geocodificador
    geocoder = new google.maps.Geocoder();
}

function buscarUbicacion() {
    const ubicacion = document.getElementById('location-input').value;

    // Geocodifica la ubicación ingresada
    geocoder.geocode({ 'address': ubicacion }, function (results, status) {
        if (status === 'OK') {
            // Centra el mapa en la ubicación encontrada
            mapa.setCenter(results[0].geometry.location);

            // Crea un marcador en la ubicación encontrada
            new google.maps.Marker({
                map: mapa,
                position: results[0].geometry.location,
                title: ubicacion
            });
        } else {
            alert('No se pudo encontrar la ubicación: ' + status);
        }
    });
}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

window.initMap = initMap;

/*colores de motos*/
const colores = document.querySelectorAll('.color');
const imagen = document.querySelector('.modelo_imagenes img');

colores.forEach(color => {
    color.addEventListener('click', () => {
        const imagenSrc = color.getAttribute('data-image-src');
        imagen.src = imagenSrc;
    });
});
