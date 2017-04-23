// This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
      var map;
      
  var markers = [];
      var pos;
      var infoWindow;
      
var directionsDisplay;
var directionsService;
      function initAutocomplete() {
        
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer();
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap',
          disableDefaultUI: true
        });
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow = new google.maps.InfoWindow;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
        var placesList = document.getElementById('places');
        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          
  directionsDisplay.setMap(null);
          var places = searchBox.getPlaces();
          placesList.innerHTML = "";
          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
            //put info in cells

            placesList.innerHTML += '<div id="row"><div id="options"><img id="heart" src="heart.svg" onclick="alert(\'Added ' + parse(place.name) +' to your favorites list!\')" class="add" padding-right="10" width="40" height="40"/><img src="marker.svg" onclick="fo(\''+ parse(place.name) + ' \',\''+parse(place.name) + ' ' + place.formatted_address +'\')" class="add"  width="40" height="40"/><img src="'+ place.icon+'" id= "placeType" class="add" onclick="alert(\'' + place.formatted_address +'\')" width="40" height="40"/></div><button onclick="calcRoute(\''+parse(place.name) + ' ' + place.formatted_address +'\')" class="flex-item" onclick="direction()">'  +  parse(place.name) + '</button><br><div>';
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
          
          left();
        });
      }
  var geocoder; 
function parse(placeName){
  placeName = placeName.split('\'').join("");
    return placeName.split('\"').join("");
}
function fo(name, place){
  directionsDisplay.setMap(null);
   markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': place}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        
        infoWindow.setPosition(results[0].geometry.location);
        infoWindow.setContent(name + 'here.');
       var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        markers.push(marker);
        infoWindow.open(map,marker);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    
  if (document.documentElement.clientWidth<726){
      right();
  }
}
function calcRoute(end) {
   infoWindow.close();
   markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
  directionsDisplay.setMap(map);
  directionsService.route({
          origin: pos,
          destination: end,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
        infoWindow.setContent('You are here.');
        infoWindow.setPosition(pos);
        infoWindow.open(map);
        right();
}
function left() 
{
    document.getElementById("rightArrow").style.display="none";
    document.getElementById("leftArrow").style.display="block"; 
    if (document.documentElement.clientWidth<726){
      document.getElementById("left-panel").style.left="-18%";
    }
    if (document.documentElement.clientWidth>726){
            if (document.documentElement.clientHeight<1000){
         document.getElementById("menuID").style.left="none";
      }
    document.getElementById("left-panel").style.left="-17%";
    }
    if (document.documentElement.clientHeight<600){
      document.getElementById("hidden-menu").style.display="none";
    }
    if (document.documentElement.clientWidth<726){
      document.getElementById("pac-input").style.display="none";
    }
};

function right() 
{
  //alert(document.documentElement.clientHeight);
    document.getElementById("rightArrow").style.display="block";
    
    document.getElementById("pac-input").style.display="block";
    document.getElementById("leftArrow").style.display="none";
    if (document.documentElement.clientWidth<726){
      document.getElementById("left-panel").style.left="-108%";
    }
    if (document.documentElement.clientWidth>726){
      if (document.documentElement.clientHeight<800){
         document.getElementById("menuID").style.display="block";
      }
      document.getElementById("left-panel").style.left="-53%";
    }
    document.getElementById("hidden-menu").style.display="initial";
};
