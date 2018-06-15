//https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places

let map;
let service;
let infowindow;

function initialize() {
  let pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

  map = new google.maps.Map(document.getElementById("map"), {
    center: pyrmont,
    zoom: 15
  });

  let request = {
    location: pyrmont,
    radius: "500",
    type: ["restaurant"]
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      let place = results[i];
      createMarker(results[i]);
    }
  }
}
