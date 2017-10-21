// This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          // mapTypeControl: false,
          // scaleControl:false,
          disableDefaultUI : true,
          center: {lat: 25.0339640, lng: 121.5644720},
          zoom: 13,
          gestureHandling:'cooperative',
          styles: [
  		  {
    		featureType: "landscape",
    		elementType: "labels",
    		stylers: [	{ "visibility": "off" }	]
  		  },
          {
            featureType: 'transit.line',
            elementType: 'geometry ',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{"color": "#BDD2D4"}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{"color": "#C5C3E2"}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.business',
            elementType: 'geometry',
            stylers: [{"color": "#F2F2F2"}]
          },
          {
            featureType: 'poi.government',
            elementType: 'geometry',
            stylers: [{"saturation": -100 }]
          },
          {
            featureType: 'poi.place_of_worship',
            elementType: 'geometry',
            stylers: [{"saturation": -100 }]
          },
          {
            featureType: 'poi.sports_complex',
            elementType: 'geometry',
            stylers: [{"saturation": -100 }]
          },
          {
            featureType: 'poi.school',
            elementType: 'geometry',
            stylers: [{"color": "#F2F2F2" }]
          },
          {
            featureType: 'poi.medical',
            elementType: 'geometry',
            stylers: [{"saturation": -100 }]
          },
          {
            featureType: 'landscape.natural.landcover',
            elementType: 'geometry.fill',
            stylers: [{"color": "#F2F2F2" }]
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [{"color": "#F2F2F2" }]
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.stroke',
            stylers: [{"color": "#E6E6E6" }]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{visibility: 'off'}]
          }
          ]
        });

        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        map.addListener("dragend", function(){   

        	var center = map.getCenter();  // 這是經緯度=====================================
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
            	 // window.alert(results[0].formatted_address);  // 這是地址==================
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
        //================================================================================
        var originInput = document.getElementById('on-the-place');
        var destinationInput = document.getElementById('get-off-location');
		//================================================================================
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

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        // 範圍限界
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

	