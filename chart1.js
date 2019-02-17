function overall(){
    Chart.defaults.global.defaultFontFamily = 'Quicksand';
    words = document.getElementById("words");
    words.innerHTML = "Overall, your emotional status went like:";
    document.getElementById("chart1").style.display = "block";
    document.getElementById("chart2").style.display = "none";
    document.getElementById("chart3").style.display = "none";
    document.getElementById("chart4").style.display = "none";

    var ctx = document.getElementById("chart1");

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

    var ctx = document.getElementById('chart1').getContext('2d');

    var color = Chart.helpers.color;
        var cfg = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'score',
                    backgroundColor: 'rgba(246,77,108,1)',
                    borderColor: 'rgba(246,77,108,1)',
                    data: [0.755, -0.082, 0.396],
                    type: 'line',
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
                            labelString: 'unit'
                        },
                        ticks: {
                            min:-1,
                            max:1
                        }
                    }]
                }
            }
        };
        var chart1 = new Chart(ctx, cfg);
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


function changeColor(evt, tabName){
    var tabs = document.getElementsByClassName("nav-item");
    console.log(tabs);
    for (var i = tabs.length - 1; i >= 0; i--) {
        tabs[i].style.border = "none";
    }
    if (tabName === "t1") {
        tabs[0].style.border = "solid white 2px";
        tabs[1].style.border = "none";
        tabs[2].style.border = "none";
        tabs[3].style.border = "none";
    } 
    else if (tabName === "t2") {
        tabs[0].style.border = "none";
        tabs[1].style.border = "solid white 2px";
        tabs[2].style.border = "none";
        tabs[3].style.border = "none";
    }
    else if (tabName === "t3") {
        tabs[0].style.border = "none";
        tabs[1].style.border = "none";
        tabs[2].style.border = "solid white 2px";
        tabs[3].style.border = "none";
    }
    else if (tabName === "t4") {
        tabs[0].style.border = "none";
        tabs[1].style.border = "none";
        tabs[2].style.border = "none";
        tabs[3].style.border = "solid white 2px";
    }

}





