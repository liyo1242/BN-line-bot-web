
		var marker;
		var map;
      function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
          // mapTypeControl: false,
          // scaleControl:false,
          disableDefaultUI : true,
          center: {lat: 25.0339640, lng: 121.5644720},
          zoom: 17,
          clickableIcons: false,        
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
        //var infowindow = new google.maps.InfoWindow;
        //var infoWindow = new google.maps.InfoWindow({map: map});
        //  獲取當前GPS======================================================================
		
		GPS();
       
        //===================================================================================

        map.addListener("idle", function(){ 
        	if(marker!=null)
        		marker.setMap(null);

        	var center = map.getCenter();  // 經緯度===
        	marker = new google.maps.Marker({
          	map: map,
            icon: 'hellocubee-small.png',
          	//draggable: true,
        	  //animation: google.maps.Animation.DROP,
         	position: {lat: center.lat(), lng: center.lng()}
        });              	
        	geocodeLatLng(geocoder, map,center);

		});

        new AutocompleteDirectionsHandler(map);
      }  

      function GPS(){
      	 if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            if(marker!=null)
            marker.setMap(null);
            marker = new google.maps.Marker({
          	map: map,
            icon: 'hellocubee-small.png',
         	position: pos
        	});

            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');

            map.setCenter(pos);

          }, function() {
            handleLocationError(true,map.getCenter());
          });
        } else {
          //handleLocationError(false, infoWindow, map.getCenter()); 
          alert('請開啟GPS或定位功能');
        }
      }

      //Animation================================================ 動畫目前沒用
      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }      
	  //=========================================================

      function geocodeLatLng(geocoder, map,center) {
        var input = center;      
        var latlng = {lat: center.lat(), lng: center.lng()};

        var text;

        if (decideStep == 0){
           text = document.getElementById("getOnPlace");
        } else if (decideStep == 1){
           text = document.getElementById("getOffPlace");
        } else {

        }


        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
            	  //window.alert(results[0].formatted_address);  // 這是地址==================
               text.setAttribute("value",results[0].formatted_address);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

	// 路線規劃==============================================================
      function AutocompleteDirectionsHandler(map) {  
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'DRIVING';
        //================================================================================
        var originInput = document.getElementById('getOnPlace');
        var destinationInput = document.getElementById('getOffPlace');
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
	// ========================================================================
      
      function handleLocationError(browserHasGeolocation,pos) {
        //infoWindow.setPosition(pos);
        alert(browserHasGeolocation ?
                              '請開啟GPS或定位功能' :
                              '目前的瀏覽器可能不支援喔');
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

	