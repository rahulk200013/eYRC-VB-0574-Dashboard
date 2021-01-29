function refreshMap(map){

        // prevMarkerGroup.addTo(map);
        // map.addLayer(prevMarkerGroup);
        // map.removeLayer(markerGroup);  
        // markerGroup.clearLayers(); 
        // same_marker = false;     
        var jsonDataObject =[];

        $.getJSON('https://spreadsheets.google.com/feeds/list/1aeLFuBTE06Rk-U-W2C8vdmDrGOwObwTPd1swfs2glVU/1/public/full?alt=json', function(data) {
        for (var i = 0; i < data.feed.entry.length; ++i) {

            var json_data = {
                "City": data.feed.entry[i].gsx$city.$t,
                "OrderID" : data.feed.entry[i].gsx$orderid.$t,
                "Item" : data.feed.entry[i].gsx$item.$t,
                "Latitude": parseFloat(data.feed.entry[i].gsx$latitude.$t),
                "Longitude": parseFloat(data.feed.entry[i].gsx$longitude.$t)
            };
            jsonDataObject.push(json_data);
            
            var greenIcon = L.icon({
                iconUrl: 'images/green_marker.png',

                iconSize:     [36, 36], // size of the icon
                iconAnchor:   [18, 36], // point of the icon which will correspond to marker's location
            });
            var redIcon = L.icon({
                iconUrl: 'images/red_marker.png',

                iconSize:     [36, 36], // size of the icon
                iconAnchor:   [18, 36], // point of the icon which will correspond to marker's location
            });
            var yellowIcon = L.icon({
                iconUrl: 'images/yellow_marker.png',

                iconSize:     [36, 36], // size of the icon
                iconAnchor:   [18, 36], // point of the icon which will correspond to marker's location
            });

            for (var j = 0; j < jsonDataObject.length; j++) {
                var marker = L.marker(L.latLng(parseFloat(jsonDataObject[j].Latitude), parseFloat(jsonDataObject[j].Longitude)));
                marker._leaflet_id = j+1;
                if (jsonDataObject[j].OrderID == 789) {
                    marker.setIcon(redIcon);
                } else if (jsonDataObject[j].OrderID == 123){
                    marker.setIcon(greenIcon);
                } else {
                    marker.setIcon(yellowIcon);
                }
                marker.on('mouseover', onHover_Marker);
                marker.on('click', onHover_Marker);
                marker.on('mouseout', function (e) {
                    map.closePopup();
                }); 
                // Attach the corresponding JSON data to your marker:
                marker.myJsonData =jsonDataObject[j];
                

               if (prevMarkerGroup.getLayer(j+1)){
                    prevMarkerGroup.getLayer(j+1).setLatLng(L.latLng(parseFloat(jsonDataObject[j].Latitude), parseFloat(jsonDataObject[j].Longitude)));
                    prevMarkerGroup.getLayer(j+1).setIcon(marker.getIcon());
                    prevMarkerGroup.getLayer(j+1).myJsonData =jsonDataObject[j];
                } else {
                    prevMarkerGroup.addLayer(marker);
                }

                function onHover_Marker(e) {
                        var marker = e.target;
                        popup = L.popup({
                                    offset: [1, -12]
                                })
                        .setLatLng(marker.getLatLng())
                        .setContent('<b>Order ID: </b>' + marker.myJsonData.OrderID + ', <b>Item: </b>' + marker.myJsonData.Item + '<br><b>City: </b>' + marker.myJsonData.City + '<br>'
                                     + '<b>Dispatched:</b> Yes' + ', <b>Shipped:</b> Yes')
                        // .setContent("Order ID: " + marker.myJsonData.OderID + " || Item: " +   marker.myJsonData.Item)
                        .openOn(map)
                    }
                

                    
                
                }
                // map.removeLayer(markerGroup);
                // markerGroup.addTo(map);
                // prevMarkerGroup.clearLayers();
                // prevMarkerGroup.clearLayers();
                // prevMarkerGroup = markerGroup;
                // markerGroup.clearLayers();
            }
        });
    }