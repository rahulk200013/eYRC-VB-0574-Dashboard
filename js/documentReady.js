$(document).ready(function() {
        var table = $('#summary').dataTable( {
            "dom": 'fptBi',
             "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "scrollX": true,
            "bServerSide":false,
            "bProcessing":false,
	        "iDisplayLength" : 5,
            "sAjaxDataProp": "feed.entry",
            "sAjaxSource": "https://spreadsheets.google.com/feeds/list/1MbAE_3DCbLcs5GNl-DymV5Tg9RYqg4fHWecy1sX8Su0/5/public/full?alt=json",
            "aoColumns": [
            { "mDataProp": "gsx$orderid.$t" },
            { "mDataProp": "gsx$item.$t" },
            { "mDataProp": "gsx$priority.$t" },
            { "mDataProp": "gsx$city.$t" },
            { "mDataProp": "gsx$dispatched.$t" },
            { "mDataProp": "gsx$shipped.$t" },
            { "mDataProp": "gsx$orderdateandtime.$t" },
            { "mDataProp": "gsx$dispatchdateandtime.$t" },
            { "mDataProp": "gsx$shippeddateandtime.$t" },
            { "mDataProp": "gsx$timetaken.$t" },
            ]

        } );

        // get table data
        

        var container = L.DomUtil.get('map');

        if(container != null){
        container._leaflet_id = null;
        }
         
        var map = L.map('map', { 
                                tap: !L.Browser.mobile, 
                                zoomControl: false, 
                                zoom: 4,
                                minZoom: 1,
                                maxZoom: 16, 
                                center: [20.5937, 78.9629] }).setView([20.5937, 78.9629], 4); 
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        prevMarkerGroup.addTo(map);
        refreshMap(map);

        getTableData(table);
        createHighcharts();
        setTableEvents(table);

        map.addControl(new L.Control.ZoomMin());

        var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

        L.esri.Geocoding.geosearch({
          position: 'topleft',
          providers: [
            arcgisOnline,
            
          ],
        }).addTo(map);

        var controlSearch = new L.Control.Search({
		position:'topleft',		
		layer: prevMarkerGroup,
		initial: false,
		zoom: 12,
		marker: false,
		textPlaceholder: 'Search by Order ID',
		autoCollapse: true
		});

		map.addControl( controlSearch );

        // Refresh everything every 1 second
        setInterval(refreshTable, 1000, table);
        setInterval(refreshMap, 1000, map);
        setInterval(getTableData, 1000, table);

        


    });

    function refreshTable(table) {
	table.api().ajax.reload(null, false);
    }
