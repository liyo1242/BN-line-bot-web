
  var marker;
  var map;
    var directionsService; 
    var directionsDisplay;
    var originAutocomplete;
    var destinationAutocomplete ;
    var placeListener;
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
        stylers: [  { "visibility": "off" } ]
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

        var originInput = document.getElementById('getOnPlace');
        var destinationInput = document.getElementById('getOffPlace');

        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);

        originInput.addEventListener("click", function(){
            if(decideStep == 0){ // 沒有雞沒有鴨
              originAutocomplete = new google.maps.places.Autocomplete(originInput);
              originPlaceId = null ;
              destinationPlaceId = null ;          
              setupPlaceChangedListener(originAutocomplete, 'ORIG');
            }else if(decideStep == 1){// 輸入完上車 未輸入下車
              removeAutocompleteListener(originAutocomplete);
              destinationPlaceId = null ;
            }else if (decideStep == 2){// 輸入完上車 輸入完下車
              //rm getOffPlace Lis
            }
        });

        //destinationInput.addEventListener("mouse", function(){});

        destinationInput.addEventListener("click", function(){
            if(decideStep == 0){ // 沒有雞沒有鴨
              originPlaceId = null ;
              destinationPlaceId = null ; 
              //add getOnPlace Lis
            }else if(decideStep == 1){// 輸入完上車 未輸入下車
              //rm getOnPlace Lis
              destinationPlaceId = null ;
              //add getOffPlace Lis
              destinationAutocomplete=new google.maps.places.Autocomplete(destinationInput);
              setupPlaceChangedListener(destinationAutocomplete, 'DEST');
            }else if (decideStep == 2){// 輸入完上車 輸入完下車
              removeAutocompleteListener(destinationAutocomplete);
              //rm getOffPlace Lis

            }
        });
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
               if(decideStep==0){
               text.value = results[0].formatted_address;
               originPlaceId = results[0].place_id;
              }else if (decideStep == 1){
               text.value = results[0].formatted_address;
               destinationPlaceId = results[0].place_id;
               console.log(originPlaceId + " -> " + destinationPlaceId);               
              }
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
// ========================================================================
      
      function handleLocationError(browserHasGeolocation,pos) {
        //infoWindow.setPosition(pos);
        alert(browserHasGeolocation ?
                              '請開啟GPS或定位功能' :
                              '目前的瀏覽器可能不支援喔');
      }

  // 路線規劃==============================================================
  // ======================================================================
      
      var travelMode = 'DRIVING';
      var originPlaceId = null;
      var destinationPlaceId = null;

  // ======================================================================
      function setupPlaceChangedListener(autocomplete, mode) {
        // 範圍限界
        autocomplete.bindTo('bounds', map);
        placeListener = autocomplete.addListener('place_changed', function() {
          
              var place = autocomplete.getPlace();
              if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
              }

              if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
              } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17); 
              }

              if (mode === 'ORIG') {
                originPlaceId = place.place_id;
              } else {
                destinationPlaceId = place.place_id;
              }
              route();            
            });        
      };

      function removeAutocompleteListener(autocomplete){
        google.maps.event.removeListener(placeListener);
      }

      //AutocompleteDirectionsHandler.prototype.route =
      function route() {
        console.log(originPlaceId + " -> " + destinationPlaceId); 
        if (!originPlaceId || !destinationPlaceId) {
          return;
        }
        directionsService.route({
          origin: {'placeId':originPlaceId},
          destination: {'placeId': destinationPlaceId},
          travelMode: travelMode
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };

      function removeRoute(){
        directionsDisplay.setDirections({routes: []});
      }
