function backSpace(){
    Chart.defaults.global.defaultFontFamily = 'Quicksand';
	words = document.getElementById("words");
    words.innerHTML = "And your usage of 'delete' seems to be like this";
    document.getElementById("chart1").style.display = "none";
    document.getElementById("chart2").style.display = "none";
    document.getElementById("chart3").style.display = "none";
    document.getElementById("chart4").style.display = "block";
    document.getElementById("chart4").style.height = "400px";

    var response;//to read json
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           response = JSON.parse(xhttp.responseText);//response is the json file
        }
    };
    xhttp.open("GET", "rachel-test.json", true);
    xhttp.send();
  
    var ctx = document.getElementById('chart4').getContext('2d');
    var data = {
        datasets:[{
            data: [{
            x:2.15,
            y:10,
            r:500/15
        },{
            x:2.16,
            y:15,
            r:800/15
        },{
            x:2.17,
            y:5.25,
            r:663/15
        },{
            x:2.18,
            y:0,
            r:0
        }]
     }]
    };

    var options = {
        aspectRatio: 1,
        legend: false,
        tooltips: true,
        elements: {
            point: {
                backgroundColor: 'rgba(246,77,108,0.5)',
                borderColor: 'rgba(246,77,108,0.1)',
            }
        },
        scales:{
            xAxes:[{
                ticks:{
                    stepSize: 0.01,
                }
            }],
            yAxes:[{
                scaleLabel: {
                            display: true,
                            labelString: 'percentage (dalete within all input, %)'
                        },
                ticks:{
                    max:40
                }
            }]
        }
    };

    var chart4 = new Chart(ctx, {
            type: 'bubble',
            data: data,
            options: options
        });
}
