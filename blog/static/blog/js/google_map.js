let map;

window.initMap = function () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.4023915935913966, lng: 127.10117976630573 },
    zoom: 10,
    mapTypeControl: false
  });

  const marker = new google.maps.Marker({
    position: { lat: 37.4023915935913966, lng: 127.10117976630573 },
    map: map 
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "구름스퀘어"
  });

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
};
