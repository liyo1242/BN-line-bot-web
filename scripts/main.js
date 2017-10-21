// This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          center: {lat: 25.0339640, lng: 121.5644720},
          zoom: 13,
          gestureHandling:'cooperative'
        });

        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        
        map.addListener("dragend", function(){

        	var center = map.getCenter();
        	geocodeLatLng(geocoder, map, infowindow,center);
		});

        new AutocompleteDirectionsHandler(map);
      }

      function geocodeLatLng(geocoder, map, infowindow,center) {
        var input = center;      
        var latlng = {lat: center.lat(), lng: center.lng()};

        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
            	window.alert(results[0].formatted_address);  // 這是地址
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

       /**
        * @constructor
       */
      function AutocompleteDirectionsHandler(map) {  // 路線規劃
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'DRIVING';
        var originInput = document.getElementById('on-the-place');
        var destinationInput = document.getElementById('get-off-location');

        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      // AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
      //   var radioButton = document.getElementById(id);
      //   var me = this;
      //   radioButton.addEventListener('click', function() {
      //     me.travelMode = mode;
      //     me.route();
      //   });
      // };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };

	