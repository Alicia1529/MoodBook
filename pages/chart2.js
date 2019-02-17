function chat(){
	Chart.defaults.global.defaultFontFamily = 'Quicksand';
	words = document.getElementById("words");
    words.innerHTML = "Over the past 2 weeks, you have been talking to...";
    document.getElementById("chart1").style.display = "none";
    document.getElementById("chart2").style.display = "block";
    document.getElementById("chart3").style.display = "none";
    document.getElementById("chart4").style.display = "none";

    var ctx = document.getElementById("chart2");
    var response;//to read json
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           response = JSON.parse(xhttp.responseText);//response is the json file
        }
    };
    xhttp.open("GET", "rachel-test.json", true);
    xhttp.send();

    var dateFormat = 'MMMM DD YYYY';
    var date = moment('February 14 2019', dateFormat);
    var data = [randomBar(date, 30)];
    var labels = [date];
    while (data.length < 4) {
        date = date.clone().add(1, 'd');
        if (date.isoWeekday() <= 6) {
            data.push(randomBar(date, data[data.length - 1].y));
            labels.push(date);
            console.log(date.isoWeekday());
        }
    }

    var ctx = document.getElementById('chart2').getContext('2d');

    var color = Chart.helpers.color;
        var cfg = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'number',
                    backgroundColor: 'rgba(246,77,108,1)',
                    borderColor: 'rgba(246,77,108,1)',
                    data: [0, 10, 6],
                    type: 'bar',
                    fill: false
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        ticks: {
                            source: 'labels'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'number of people'
                        },
                        ticks: {
                            min:0,
                            max:20
                        }
                    }]
                }
            }
        };
        var chart2 = new Chart(ctx, cfg);

    
}

function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

function randomBar(date, lastClose) {
    var open = randomNumber(lastClose * 0.95, lastClose * 1.05);
    var close = randomNumber(open * 0.95, open * 1.05);         
    return {
        t: date.valueOf(),
        y: close
    };
}

function newDate(days) {
    return moment().add(days, 'd').toDate();
}

function newDateString(days) {
    return moment().add(days, 'd').format(timeFormat);
}