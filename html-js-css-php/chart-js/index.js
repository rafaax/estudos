let presencial;
let isFetching = false;
var myChart;

const mesesMap = {
  1: 'Jan',
  2: 'Fev',
  3: 'Mar',
  4: 'Abr',
  5: 'Mai',
  6: 'Jun',
  7: 'Jul',
  8: 'Ago',
  9: 'Set',
  10: 'Out',
  11: 'Nov',
  12: 'Dez'
};


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



function geraGrafico2(data, func){
    const ctx = document.getElementById('myChart2');
    // console.log(data);
    
    if(data != null){
    
        var meses = Object.keys(data).map(Number).map((numeroMes) => mesesMap[numeroMes]);;
        var count = Object.values(data);

        
        console.log(meses);
    }
    
    let delayed;

        if(func == true){
        let chartStatus = Chart.getChart("myChart2"); // <canvas> id
        if (chartStatus != undefined) {
            document.querySelector("#chart-line").innerHTML = '<canvas id="myChart2"></canvas>'; //recria o canvas
        }
        // console.log(chartStatus);
    }else{
        myChart2 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Quantidade de reunioes por mes',
                    data: count,
                    borderColor: [
                        'rgb(0, 0, 0)'
                    ],
                    pointStyle: 'star',
                    pointRadius: 5,
                    pointBorderColor: 'rgb(0, 0, 0)',
                    fill: false
                }]
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
                        labels: {
                            usePointStyle: true,
                        },
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
    // console.log(count);
    // console.log(meses)

        
}

async function getPhp(url){
     try { 
        fetch(url, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((response) => {
            // console.log(response);
            if(response.count1 && response.count2){
                const data1 = response.count1;
                const data2 = response.count2;
                geraGrafico(data1, data2, false);
            }else if(response.countArray){
                const count = response.countArray;
                geraGrafico2(count, false)
            }
            

            return response;
        });
    }
    catch (error) {
        console.error("Erro na requisição:", error);
    }
}

function quebraGrafico(atuador){
    geraGrafico(null, null, atuador)
}
function quebraGrafico2(atuador){
    geraGrafico2(null,  atuador)
}

const divElement = document.getElementById('chart');
const divElement2 = document.getElementById('chart-line');
const toggleButton = document.getElementById('grafico_barra');
const toggleButton2 = document.getElementById('grafico_linha');

toggleButton.addEventListener('click', function() {
    if (divElement.style.display === 'none') {
        if (!isFetching) {
            isFetching = true;
            getPhp('fetch.php?type=barra').then(() => {
                isFetching = false;
            });    
            divElement.style.display = 'block';
        }   
    }else{
        divElement.style.display = 'none';
        quebraGrafico(true);
    }
});

toggleButton2.addEventListener('click', function() {
    if (divElement2.style.display === 'none') {
        if (!isFetching) {
            isFetching = true;
            getPhp('fetch.php?type=linha').then(() => {
                isFetching = false;
            });    
            divElement2.style.display = 'block';
        }   
    }else{
        divElement2.style.display = 'none';
        quebraGrafico2(true);
    }
});
