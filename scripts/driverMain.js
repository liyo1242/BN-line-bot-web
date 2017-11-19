
  var marker;
  var map;
  // sevice var==================
  var directionsService; 
  var directionsDisplay;
  var travelMode = 'DRIVING';
  var originPlaceId = null;
  var destinationPlaceId = null;
  //==========================================
      function initMap() {        
          map = new google.maps.Map(document.getElementById('Dmap'), {
          disableDefaultUI : true,
          center: {lat: 25.0339640, lng: 121.5644720},
          zoom: 17, // Vision size
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

        // GPS();       
        // map listener -> when the center change && the map stop sliding
        map.addListener("idle", function(){ 
          if(marker!=null)
            marker.setMap(null);

          var center = map.getCenter();  // 經緯度===                         
          geocodeLatLng(geocoder, map,center);

        });        

        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);

      }

      function lockMap(){
        map.set('draggable',false);
      }

      function unlockMap(){
        map.set('draggable',true);
      } 

      function callBear(){        
        marker = new google.maps.Marker({
          map: map,
          icon: 'hellocubee-small.png',
          position: {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
        });            
      }

      function lnglatToid(jd,lat,lng){              
        var latlng = {lat: lat, lng: lng};      

        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              if(jd === 'BEAR')
                originPlaceId = results[0].place_id
              else if (jd === 'CAR')                                          
                destinationPlaceId = results[0].place_id
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

      function placeIcon(jd,latp,lngp){
        var iconjd ;

        if(jd === 'BEAR')
          iconjd = 'hellocubee-small.png';
        else if (jd === 'CAR')
          iconjd = 'car.png';

        lnglatToid(jd,latp,lngp);

        marker = new google.maps.Marker({
          map: map,
          icon: iconjd,
          position: {lat: latp, lng: lngp}
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

            map.setZoom(17);            
            map.setCenter(pos);
            callBear();
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

        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
                //window.alert(results[0].formatted_address);  // 這是地址==================                              
              
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
        alert(browserHasGeolocation ?
                              '請開啟GPS或定位功能' :
                              '目前的瀏覽器可能不支援喔');
      }

  // 路線規劃=============================================================   


  // ======================================================================
      

      function route() {
        marker.setMap(null);
        //console.log(originPlaceId + " -> " + destinationPlaceId); 
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
