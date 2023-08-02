let presencial;
let isFetching = false;
var myChart;

function geraGrafico(data, data2, func){
    const ctx = document.getElementById('myChart');
    if(data != null  && data2 != null){
        data = [
            parseInt(data.presencial),  parseInt(data.remoto) , parseInt(data.compromisso_pessoal)
        ];
        data2 = [
            parseInt(data2.presencial),parseInt(data2.remoto), parseInt(data2.compromisso_pessoal)
        ];
    }
    
    let delayed;

    if(func == true){
        let chartStatus = Chart.getChart("myChart"); // <canvas> id
        if (chartStatus != undefined) {
            document.querySelector("#chart").innerHTML = '<canvas id="myChart"></canvas>'; //recria o canvas
        }
        // console.log(chartStatus);
    }else{

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Presencial', 'Remoto', 'Compromisso Pessoal'],
                datasets: [{
                    label: 'Menor que meio dia',
                    data: data,
                    backgroundColor: [
                        'rgb(255, 255, 255)'
                    ],
                        borderColor: [
                        'rgb(0, 0, 0)'
                    ],
                    borderWidth: 3
                },
                {
                    label: 'Maior que meio dia',
                    data: data2,
                    backgroundColor: [
                        'rgb(202, 202, 202)'
                    ],
                        borderColor: [
                        'rgb(0, 0, 0)'
                    ],
                    borderWidth: 3
                }
                ]
            },
            options: {
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        }
                        return delay;
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Reunioes Engeline'
                    }
                }   
            }
        });
    }
}
