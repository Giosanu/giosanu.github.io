// This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap',
          disableDefaultUI: true
        });
        
      var infoWindow = new google.maps.InfoWindow;
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

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

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
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
            
            placesList.innerHTML += '<div id="row"><div id="options"><img id="heart" src="heart.svg" onclick="alert(\'Added ' + place.name +' to your favorites list!\')" class="add" padding-right="10" width="40" height="40"/><img src="marker.svg" onclick="'+ map.setCenter(place.formatted_address) +'" class="add"  width="40" height="40"/><img src="'+ place.icon+'" id= "placeType" class="add" onclick="alert(\'' + place.formatted_address +'\')" width="40" height="40"/></div><button class="flex-item" onclick="direction()">'  +  place.name + '</button><br><div>';
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

        

      
function left() 
{
    document.getElementById("rightArrow").style.display="none";
    document.getElementById("leftArrow").style.display="block";
    document.getElementById("left-panel").style.left="-10%";
    document.getElementById("leftButt").style.display="none";  
    document.getElementById("rightButt").style.display="block";
};

function right() 
{
    document.getElementById("rightArrow").style.display="block";
    document.getElementById("leftArrow").style.display="none";
    document.getElementById("left-panel").style.left="-54.5%";
    document.getElementById("rightButt").style.display="none";
    document.getElementById("leftButt").style.display="block";
};


$('#places').bind('wheel DOMMouseScroll', function(e) {
    var scrollTo = 0;
    alert('as');
    e.preventDefault();
    if (e.type == 'wheel') {
        alert('as');
    }
    else if (e.type == 'DOMMouseScroll') {
        scrollTo = 40 * e.originalEvent.detail;
        alert("d"+e.originalEvent.detail);
    }
    $(this).scrollTop(scrollTo + $(this).scrollTop());
});