
  var marker;
  var map;
  var infowindow;
  var Startmar;
  var Endmar;
  var line;
  // Autocomplete sevice var==================
  var directionsService; 
  var directionsDisplay;
  var originAutocomplete;
  var destinationAutocomplete ;
  var placeListener;
  //==========================================
      function initMap() {        
          map = new google.maps.Map(document.getElementById('map'), {
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
        var originInput = document.getElementById('getOnPlace');
        var destinationInput = document.getElementById('getOffPlace');

        GPS();       
        // map listener -> when the center change && the map stop sliding
        map.addListener("idle", function(){ 

          if(marker!=null)
             marker.setMap(null);

          var center = map.getCenter();  // 經緯度===
          //callBear();
          if($('#getOn>.icon').css('color') == 'rgb(255, 165, 0)')                         
              geocodeLatLng(geocoder, map,center,originInput);
          else if($('#getOff>.icon').css('color') == 'rgb(255, 165, 0)' && $('.table').css('height') == '100px') 
              geocodeLatLng(geocoder, map,center,destinationInput);
        });        

        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
        directionsDisplay.setMap(map);

        originAutocomplete = new google.maps.places.Autocomplete(originInput);                        
        setupPlaceChangedListener(originAutocomplete, 'ORIG');//add getOnPlace Lis
             
        destinationAutocomplete=new google.maps.places.Autocomplete(destinationInput);
        setupPlaceChangedListener(destinationAutocomplete, 'DEST');//add getOffPlace Lis

      }

      function lockMap(){
        map.set('draggable',false);
      }

      function unlockMap(){
        google.maps.event.trigger(map, 'resize'); // 超重要之RESIZE大法
        map.set('draggable',true);
      } 

      function callBear(){        
        marker = new google.maps.Marker({
          map: map,
          icon: 'hellocubee-small.png',
          position: {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
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
            //callBear();
          }, function() {
            handleLocationError(true,map.getCenter());
          });
        } else {
          //handleLocationError(false, infoWindow, map.getCenter()); 
          alert('請開啟GPS或定位功能');
        }
      }

      function placeIcon(jd,position){
        var iconjd ;

        if(jd === 'BEAR')
          iconjd = 'hellocubee-small.png';
        else if (jd === 'CAR')
          iconjd = 'car.png';

        var markerI = new google.maps.Marker({
          map: map,
          icon: iconjd,
          position: position
        });
        return markerI;
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

      function geocodeAddress(geocoder,resultsMap,text) { // 地址反查經緯度
        var address = text.value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            if(text.id === "getOnPlace"){
              originPlaceId = results[0].place_id;
            }
            else if (text.id === "getOffPlace"){
              destinationPlaceId = results[0].place_id;
            }
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

      function geocodeLatLng(geocoder, map,center,text) { // 經緯查地址
        var input = center;      
        var latlng = {lat: center.lat(), lng: center.lng()};
        //console.log(text);
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              //console.log(results[0]);
                //window.alert(results[0].formatted_address);  // 這是地址==================
                if(text.id === "getOnPlace"){
                    //text = document.getElementById("getOnPlace");
                    text.value = results[0].formatted_address;
                    originPlaceId = results[0].place_id;
                  }
                else if (text.id === "getOffPlace"){
                    text.value = results[0].formatted_address; 
                    destinationPlaceId = results[0].place_id;
                    //console.log(originPlaceId + " -> " + destinationPlaceId); 
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
        // area limit
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
            });        
      };

      function removeAutocompleteListener(autocomplete){
        google.maps.event.removeListener(placeListener);
      }

      function route() {
        google.maps.event.trigger(map, 'resize'); // 超重要之RESIZE大法
        //marker.setMap(null);
        //console.log(originPlaceId + " -> " + destinationPlaceId); 
        $('#arrow').attr('class','hide');
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
            Startmar = placeIcon('BEAR',response.routes[0].legs[0].start_location);
            Endmar = placeIcon('CAR',response.routes[0].legs[0].end_location);
            //map.setCenter(response.routes[0].bounds.getCenter());

            var lineSymbol = {
              path: 'M 0,-1 0,1',
              scale: 4,
              strokeColor: '#FFFFFF'
            };

            line = new google.maps.Polyline({
              path: google.maps.geometry.encoding.decodePath(response.routes[0].overview_polyline),
              //path: [{lat: 25.0339640, lng: 121.5644720}, {lat: 25.0439640, lng: 121.5744720}],
              strokeColor : '#000000',
              scale: 4,
              strokeOpacity : 1 ,
              icons: [{
                icon: lineSymbol,
                //offset: '100%'
                offset: '0',
                repeat: '20px'
              }],
              map: map
            });

            animateCircle(line);


            var infoString = 
            '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">貼心提醒</h1>'+
            '<div id="bodyContent">'+
            '<p>您的路程長 : <b> '+ response.routes[0].legs[0].distance.text + '</b> 大概需要 <b> ' + response.routes[0].legs[0].duration.text + '</b> 到目的地喔~ </p>'+            
            '</div>'+
            '</div>';

            $('.carinfo-data').html(infoString);

            //console.log(response);

            infowindow = new google.maps.InfoWindow({
              content: infoString
            });


            Startmar.addListener('click', function() {
              infowindow.open(map, Startmar);
            });

            //console.log(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      function animateCircle(line) {
          var count = 0;
          window.setInterval(function() {
            count = (count + 1) % 200;

            var icons = line.get('icons');
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
        }, 100);
      }

      function removeRoute(){
        $('#arrow').attr('class','arrow');
        directionsDisplay.setDirections({routes: []});
        infowindow.close();
        line.setMap(null);
        Startmar.setMap(null);
        Endmar.setMap(null);
      }


