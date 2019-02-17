function detail5(){
	Chart.defaults.global.defaultFontFamily = 'Quicksand';
    words = document.getElementById("words");
    words.innerHTML = "Your detailed emotional fluctuation looks like:";
    document.getElementById("chart1").style.display = "none";
    document.getElementById("chart2").style.display = "none";
    document.getElementById("chart3").style.display = "block";
    document.getElementById("chart4").style.display = "none";

    var ctx = document.getElementById("chart3");

    var dateFormat = 'MMMM DD YYYY';
    var date = moment('February 14 2019', dateFormat);
    var data = [randomBar(date, 30)];
    var labels = [date];
    while (data.length < 4) {
        date = date.clone().add(1, 'd');
        if (date.isoWeekday() <= 6) {
            data.push(randomBar(date, data[data.length - 1].y));
            labels.push(date);
        }
    }

    var ctx = document.getElementById('chart3').getContext('2d');

    var color = Chart.helpers.color;
    var cfg = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '(index of) anger',
                    backgroundColor: 'rgba(21, 94, 99, 1)',
                    borderColor: 'rgba(21, 94, 99, 1)',
                    data: [0.9, 0.27, 0.05],
                    type: 'line',
                    fill: false
                },{
                    label: 'fear',
                    backgroundColor: 'rgba(204, 50, 201, 1)',
                    borderColor: 'rgba(204, 50, 201, 1)',
                    data: [0.27,0.1,0.26],
                    type: 'line',
                    fill:false
                },{
                    label: 'disgust',
                    backgroundColor: 'rgba(118, 179, 157, 1)',
                    borderColor: 'rgba(118, 179, 157, 1)',
                    data: [0.13,0.36,0.75],
                    type: 'line',
                    fill:false
                },{
                    label: 'joy',
                    backgroundColor: 'rgba(249, 230, 200, 1)',
                    borderColor: 'rgba(249, 230, 200, 1)',
                    data: [1.34,0.24,2.6],
                    type: 'line',
                    fill:false
                },{
                    label: 'sadness',
                    backgroundColor: 'rgba(204, 201, 201, 1)',
                    borderColor: 'rgba(204, 201, 201, 1)',
                    data: [2.5,1.2,0.67],
                    type: 'line',
                    fill:false
                },{
                    label: 'neutral',
                    backgroundColor: 'rgba(246, 77, 108, 1)',
                    borderColor: 'rgba(246, 77, 108, 1)',
                    data: [6.13,8.7,6.58],
                    type: 'line',
                    fill:false
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
                            labelString: 'score (%)'
                        },
                        ticks: {
                            min:0,
                            max:10
                        }
                    }]
                }
            }
    };
    var chart3 = new Chart(ctx, cfg);
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