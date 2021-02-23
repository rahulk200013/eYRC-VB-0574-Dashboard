function refreshMap(map){

        // prevMarkerGroup.addTo(map);
        // map.addLayer(prevMarkerGroup);
        // map.removeLayer(markerGroup);  
        // markerGroup.clearLayers(); 
        // same_marker = false;     
        var jsonDataObject =[];

        $.getJSON('https://spreadsheets.google.com/feeds/list/1MbAE_3DCbLcs5GNl-DymV5Tg9RYqg4fHWecy1sX8Su0/5/public/full?alt=json', function(data) {
        for (var i = 0; i < data.feed.entry.length; ++i) {

            var json_data = {
                "City": data.feed.entry[i].gsx$city.$t,
                "OrderID" : data.feed.entry[i].gsx$orderid.$t,
                "Item" : data.feed.entry[i].gsx$item.$t,
                "Priority" : data.feed.entry[i].gsx$priority.$t,
                "Dispatched" : data.feed.entry[i].gsx$dispatched.$t,
                "Shipped" : data.feed.entry[i].gsx$shipped.$t,
                "Latitude": parseFloat(data.feed.entry[i].gsx$latitude.$t),
                "Longitude": parseFloat(data.feed.entry[i].gsx$longitude.$t),
                "OrderDateTime" : data.feed.entry[i].gsx$orderdateandtime.$t,
                "DispatchDateTime" : data.feed.entry[i].gsx$dispatchdateandtime.$t,
                "ShippedDateTime" : data.feed.entry[i].gsx$shippeddateandtime.$t,
                "TimeTaken" : data.feed.entry[i].gsx$timetaken.$t
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
                var marker = L.marker(L.latLng(parseFloat(jsonDataObject[j].Latitude), parseFloat(jsonDataObject[j].Longitude)), {title: 'OID #'+jsonDataObject[j].OrderID});
                marker._leaflet_id = j+1;
                if (jsonDataObject[j].Shipped == "Yes") {
                    marker.setIcon(greenIcon);
                } else if (jsonDataObject[j].Dispatched == "Yes"){
                    marker.setIcon(yellowIcon);
                } else {
                    marker.setIcon(redIcon);
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
                        .setLatLng(marker.getLatLng());
                        if (marker.myJsonData.Shipped == "Yes") {
                            popup.setContent('<b>Order ID: </b>' + marker.myJsonData.OrderID + ', <b>Item: </b>' + marker.myJsonData.Item + '<br><b>City: </b>' + marker.myJsonData.City + '<br>'
                                     + '<b>Dispatched:</b> Yes' + ', <b>Shipped:</b> Yes');
                        } else if (marker.myJsonData.Dispatched == "Yes") {
                            popup.setContent('<b>Order ID: </b>' + marker.myJsonData.OrderID + ', <b>Item: </b>' + marker.myJsonData.Item + '<br><b>City: </b>' + marker.myJsonData.City + '<br>'
                                     + '<b>Dispatched:</b> Yes' + ', <b>Shipped:</b> No');
                        } else {
                            popup.setContent('<b>Order ID: </b>' + marker.myJsonData.OrderID + ', <b>Item: </b>' + marker.myJsonData.Item + '<br><b>City: </b>' + marker.myJsonData.City + '<br>'
                                     + '<b>Dispatched:</b> No' + ', <b>Shipped:</b> No');
                        }
                        // .setContent("Order ID: " + marker.myJsonData.OderID + " || Item: " +   marker.myJsonData.Item)
                        popup.openOn(map);
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