$(document).ready(function() {
        var table = $('#summary').dataTable( {
            "dom": '<"pull-left"f><"pull-right"p>t',
            "bServerSide":false,
            "bProcessing":false,
	    "iDisplayLength" : 5,
            "sAjaxDataProp": "feed.entry",
            "sAjaxSource": "https://spreadsheets.google.com/feeds/list/1aeLFuBTE06Rk-U-W2C8vdmDrGOwObwTPd1swfs2glVU/1/public/full?alt=json",
            "aoColumns": [
            { "mDataProp": "gsx$orderid.$t" },
            { "mDataProp": "gsx$item.$t" },
            { "mDataProp": "gsx$priority.$t" },
            { "mDataProp": "gsx$quantity.$t" },
            { "mDataProp": "gsx$city.$t" },
            { "mDataProp": "gsx$cost.$t" },
            ]

        } );

        // get table data
        

        var container = L.DomUtil.get('map');

        if(container != null){
        container._leaflet_id = null;
        }
         
        var map = L.map('map', { tap: !L.Browser.mobile }).setView([20.5937, 78.9629], 4); 
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // marker.addTo(map);
        // marker.clearLayers();
        prevMarkerGroup.addTo(map);
        refreshMap(map);
        // refreshMarker();
        // addMarker();

        getTableData(table);
        // refreshData();
        // console.log(tableData);
        createHighcharts();
        setTableEvents(table);
        // Fetch every 1 second
        setInterval(refreshTable, 1000, table);
        setInterval(refreshMap, 1000, map);
        setInterval(getTableData, 1000, table);
        // setInterval(setTableEvents, 1000, table);
        // setInterval(createHighcharts, 1000);
        // setInterval(refreshMarker, 5000);

        


    });

    function refreshTable(table) {
	table.api().ajax.reload(null, false);
    }
