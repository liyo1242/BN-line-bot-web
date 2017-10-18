function initMap() {
        // Styles a map in night mode.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.674, lng: -73.945},
          zoom: 12,
          gestureHandling: 'cooperative',
          mapTypeId: 'roadmap',
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
	            {
	              featureType: 'administrative.locality',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#d59563'}]
	            },
	            {
	              featureType: 'poi',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#d59563'}]
	            },
	            {
	              featureType: 'poi.park',
	              elementType: 'geometry',
	              stylers: [{color: '#263c3f'}]
	            },
	            {
	              featureType: 'poi.park',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#6b9a76'}]
	            },
	            {
	              featureType: 'road',
	              elementType: 'geometry',
	              stylers: [{color: '#38414e'}]
	            },
	            {
	              featureType: 'road',
	              elementType: 'geometry.stroke',
	              stylers: [{color: '#212a37'}]
	            },
	            {
	              featureType: 'road',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#9ca5b3'}]
	            },
	            {
	              featureType: 'road.highway',
	              elementType: 'geometry',
	              stylers: [{color: '#746855'}]
	            },
	            {
	              featureType: 'road.highway',
	              elementType: 'geometry.stroke',
	              stylers: [{color: '#1f2835'}]
	            },
	            {
	              featureType: 'road.highway',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#f3d19c'}]
	            },
	            {
	              featureType: 'transit',
	              elementType: 'geometry',
	              stylers: [{color: '#2f3948'}]
	            },
	            {
	              featureType: 'transit.station',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#d59563'}]
	            },
	            {
	              featureType: 'water',
	              elementType: 'geometry',
	              stylers: [{color: '#17263c'}]
	            },
	            {
	              featureType: 'water',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#515c6d'}]
	            },
	            {
	              featureType: 'water',
	              elementType: 'labels.text.stroke',
	              stylers: [{color: '#17263c'}]
	            }
          ]
        });

        var input = document.getElementById('pac-input');

        var searchBox = new google.maps.places.SearchBox(input);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];

        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

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

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }

            });
           map.fitBounds(bounds);
        });

         var infoWindow = new google.maps.InfoWindow({map: map});
         // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
}      

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}
      