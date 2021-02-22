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
            series: {
              events: {
                hide: function() {
                  // this.chart.xAxis[0].setExtremes(0, tableData[4]);
                }
              },
              states: {
                inactive: {
                  enabled: false
                },
              }
            },
            column: {
                grouping: false,
                point: {
          events: {
            mouseOver: function() {
              var series = this.series.chart.series,
                point = this;
              Highcharts.each(series, function(ob, j) {
                Highcharts.each(ob.data, function(p, i) {
                  if (p.x === point.x) {
                    p.setState('hover')
                  }
                })
              })
            },
            mouseOut: function() {
              var series = this.series.chart.series,
                point = this;
              Highcharts.each(series, function(ob, j) {
                Highcharts.each(ob.data, function(p, i) {
                  if (p.x === point.x) {
                    p.setState('inactive')
                  }
                })
              })
            }
          }
        },
            }
        }
    });

        chart = Highcharts.chart("chart", {
        // chart: {
        //     scrollablePlotArea: {
        //     minWidth: 2000,
        //     scrollPositionX: 0
        // }
        // },
    title: {
      text: "Time Taken to deliver a package "
    },
    // scrollbar: {
    //   enabled: true,
    //   liveRedraw: true
    // },
    exporting: {
        enabled: true,
        buttons: {
      contextButton: {
        theme: {
          padding: 1
        },
        menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadSVG', 'separator', 'downloadPDF', 'downloadCSV', 'downloadXLS']
      }
    }
    },
    tooltip: {
      formatter: function () {
          text = 'Item: <b>' + this.series.name + '</b><br>' +
                  'Order ID: <b>' + this.x + '</b><br>' +
                  'Time taken: <b>' + this.y + ' s</b><br>';

          // console.log(tableData[0].length);

          for(var i = 0; i < tableData[0].length; i++) {
              if (tableData[0][i] == this.x) {
                  break;
              }
          }

          text += 'City: <b>' + tableData[5][i] + '<b>';

          // if (this.series.name == 'Medicine') {
          //   text += 'City: <b>' + tableData[5][this.point.index] + '<b>';
          // } else if (this.series.name == 'Food') {
          //   text += 'City: <b>' + tableData[5][this.point.index] + '<b>';
          // } else {
          //   text += 'City: <b>' + tableData[5][medicineArray.length + foodArray.length + this.point.index] + '<b>';
          // }
          return text;
          // return 'The value for <b>' + this.x +
          //       '</b><br> is <b>' + this.series.name + '</b>';
      }
    },
    xAxis: [
      {
        max: tableData[4],
        scrollbar: {
            enabled: true
        },
        ordinal: false,
        categories: tableData[0],
        title: {
          text: "Order ID",
          margin: 20,
          style: {
              color: '#000',
              fontWeight: 'bold',
              fontSize: 20
            }
        },
        
        labels: {
            style: {
              color: '#000',
              fontWeight: 'bold'
            }
          }
      }
    ],
    yAxis: [
      {
        // first yaxis
        title: {
          text: "Time Taken (s)",
          margin: 20,
          style: {
              color: '#000',
              fontWeight: 'bold',
              fontSize: 20
            }
        },
        labels: {
            style: {
              color: '#000',
              fontWeight: 'bold'
            }
          }
      }
    ],
    series: [

        {
        maxPointWidth: 50,
        states: {
        hover: {
          color: '#bf0000',
          borderColor: '#000',
          borderWidth: 3
        }
      },
        type: 'column',
        name: "Medicine",
        color: '#ff0000',
        data: tableData[1],
        events: {
            legendItemClick: function(e) {
                e.preventDefault()
            }
        }
      },
      {
        maxPointWidth: 50,
        states: {
        hover: {
          color: '#ffd800',
          borderColor: '#000',
          borderWidth: 3
        }
      },
        type: 'column',
        name: "Food",
        color: "#ffff00",
        data: tableData[2],
        events: {
            legendItemClick: function(e) {
                e.preventDefault()
            }
        }
      },
      {
        maxPointWidth: 50,
        states: {
        hover: {
          color: '#00ab08',
          borderColor: '#000',
          borderWidth: 3
        }
      },
        type: 'column',
        name: "Cloths",
        color: "#4ded30",
        data: tableData[3],
        events: {
            legendItemClick: function(e) {
                e.preventDefault()
            }
        }
      }
    ]
    });
    }

    function getTableData(table) {

        dataArray = [],
        orderIdArray = [],
        cityArray = [],
        medicineOrderIdArray = [],
        foodOrderIdArray = [],
        clothsOrderIdArray = [],
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
        if (data.gsx$timetaken.$t != "") {
            cityArray.push(data.gsx$city.$t);
            orderIdArray.push(data.gsx$orderid.$t);
            // chartDataArray.push([j, data.gsx$cost.$t]);
            if(data.gsx$priority.$t == 'MP'){
                foodArray.push([j, parseFloat(data.gsx$timetaken.$t)]);
                foodOrderIdArray.push(data.gsx$orderid.$t);
            } else if (data.gsx$priority.$t == 'HP'){
                medicineArray.push([j, parseFloat(data.gsx$timetaken.$t)]);
                medicineOrderIdArray.push(data.gsx$orderid.$t);
            } else {
                clothsArray.push([j, parseFloat(data.gsx$timetaken.$t)]);
                clothsOrderIdArray.push(data.gsx$orderid.$t);
            } 

            j = j + 1;
        }
            // console.log(index);
        
    });

  // medicineArray = [];
  // console.log(orderIdArray.length);
  max = medicineArray.length + foodArray.length + clothsArray.length;
  // console.log(max);

  if (prev_max !== max && typeof chart.xAxis !== 'undefined') {
      prev_max = max;
      if (max > 6) {
          max = 6;
      }
      chart.xAxis[0].setExtremes(0, max-1);
      last_max = max;
  }
  if (typeof chart.xAxis !== 'undefined') {
      if (max > 6) {
          max = 6;
      }
      if (last_max !== max){
          chart.xAxis[0].setExtremes(0, max-1);

          last_max = max;
      }
  } else {
    // do nothing
  }
  // console.log(chart.xAxis);
  // chart.xAxis[0].setExtremes(null, max);
  // if (typeof chart.xAxis[0].max !== 'undefined'){
  //     chart.xAxis[0].max = max;
  // }
  // store all data in dataArray

  tableData = dataArray;

  dataArray.push(orderIdArray, medicineArray, foodArray, clothsArray, max, cityArray);
}