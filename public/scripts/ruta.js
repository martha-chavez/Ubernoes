var map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

//Ubicacion
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
    L.Routing.control({
    waypoints: [
        L.latLng(coords),
        L.latLng(19.705711, -101.190867)
    ],
    routeWhileDragging: true
}).addTo(map);
       
});

//Ruta principal




