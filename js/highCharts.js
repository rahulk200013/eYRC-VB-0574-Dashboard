function setTableEvents(table) {
        // console.log(draw);
  // listen for page clicks
  table.api().on("page", () => {
    draw = true;
  });

  // listen for updates and adjust the chart accordingly
  table.api().on("draw", () => {
    if (draw) {
        // console.log("False");
      draw = false;
    } else {
        // console.log("True");
      getTableData(table);
      chart.series[0].setData(tableData[1]);
      chart.series[1].setData(tableData[2]);
      chart.series[2].setData(tableData[3]);
      chart.xAxis[0].categories = tableData[0];
    }
  });
}


    function createHighcharts() {
    Highcharts.setOptions({
        plotOptions: {
            column: {
                grouping: false
            }
        }
    });

        chart = Highcharts.chart("chart", {
        chart: {
            scrollablePlotArea: {
            minWidth: 1000,
            scrollPositionX: 0
        }
        },
    title: {
      text: "Time Taken to deliver a package "
    },
    xAxis: [
      {
        ordinal: false,
        categories: tableData[0]
      }
    ],
    yAxis: [
      {
        // first yaxis
        title: {
          text: "Cost"
        }
      }
    ],
    series: [
        {
        type: 'column',
        name: "Medicine",
        color: "red",
        data: tableData[1]
      },
      {
        type: 'column',
        name: "Food",
        color: "yellow",
        data: tableData[2]
      },
      {
        type: 'column',
        name: "Cloths",
        color: "green",
        data: tableData[3]
      }
    ]
    });
    }

    function getTableData(table) {

        const dataArray = [],
        orderIdArray = [],
        costArray = [],
        nameArray = [],
        medicineArray = [],
        foodArray = [],
        clothsArray = [];

        // loop table rows
        var j = 0;

        // console.log(table.api().row(0));

        table.api().rows({ search: "applied" }).every(function() {
        // console.log("Inside function"); 
        const data = this.data();
        // console.log(data);
        orderIdArray.push(data.gsx$orderid.$t);
        // chartDataArray.push([j, data.gsx$cost.$t]);
        if(data.gsx$priority.$t == 'MP'){
            foodArray.push([j, parseFloat(data.gsx$cost.$t)]);
        } else if (data.gsx$priority.$t == 'HP'){
            medicineArray.push([j, parseFloat(data.gsx$cost.$t)]);
        } else {
            clothsArray.push([j, parseFloat(data.gsx$cost.$t)]);
        } //
        // console.log(index);
        j = j + 1;
    });

  // store all data in dataArray
  dataArray.push(orderIdArray, medicineArray, foodArray, clothsArray);

  tableData = dataArray;

}