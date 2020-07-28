
console.log("We Don't Go To Ravenholm")
const endPoint = "http://localhost:3000/api/v1/records"

//load DOM
document.addEventListener('DOMContentLoaded', () => {
    getChart();
    getRecords();
  
    let createRecordForm = document.querySelector('.container-fluid')
    createRecordForm.addEventListener('submit', (e) => createFormHandler(e))
    
    let selectRecord = document.querySelector('#table-body')
    console.log(selectRecord)
    selectRecord.addEventListener('click', (e) => {
    (e.target.classList.contains('btn'))
        console.log(e)
    const id = (e.target.dataset.recordId)
    if(id){
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`${endPoint}/${id}`,options)
        .then(res => {
            res.json()
        })
        .then(() => e.target.parentElement.parentNode.remove());
    }
    })
});

function getChart(){
    const chartEndPoint = "http://localhost:3000/api/v1/charts"
    
    fetch(chartEndPoint)
    .then(response => response.json())
    .then(chart => {
        chart.data.forEach(chart => {
            const chartMarkup = `
            <div class="row">
                <div class="col-sm-4" style="background-color:lavender;">Name: ${chart.attributes.name}</div>
                <div class="col-sm-4" style="background-color:lavenderblush;">Date of Birth:</div>
                <div class="col-sm-4" style="background-color:lavender;">Primary Care Provider: ${chart.attributes.pcp}</div>
            </>`
            document.querySelector('.container-fluid').innerHTML += chartMarkup
        })
    })
}

function getRecords(){
    fetch(endPoint)
    .then(response => response.json())
    .then(records => { //gets the records data 
        //console.log(records)
        records.data.forEach(record => { //data is the object key for the array value
            let newRecord = new Record(record.id, record.attributes) //creates new instance of Record class 
            document.querySelector('#table-body').innerHTML += newRecord.renderRecord()
        })
    })
}

function createFormHandler(e){
    e.preventDefault(); //prevents page refresh on form submit
    const temperatureInput = document.querySelector('#validationDefault02').value
    const pulseInput = document.querySelector('#validationDefault03').value
    const painInput = document.querySelector('#validationDefault04').value
    const commentsInput = document.querySelector('#input-comments').value
    const chartInput = document.querySelector('#charts').value
    const chartId = parseInt(chartInput)
    postRecord(temperatureInput, pulseInput, painInput, commentsInput, chartInput, chartId)
}

function postRecord(temperature, pulse, pain, comments, chart_id) {
    console.log(temperature, pulse, pain, comments, chart_id)

    let bodyData = {temperature, pulse, pain, comments, chart_id}

    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(record => {
        console.log(record);
        const recordData = record.data
        let newRecord = new Record(recordData.id, recordData.attributes) //creates new instance of Record class 
        document.querySelector('#table-body').innerHTML += newRecord.renderRecord()
    })
    // .catch((error) => {
    //     console.log(error);
    // })
}

// function deleteRecord(record){
//     const recordId = e.target.dataset.recordId
//     fetch(`${endPoint}/${recordId}`, {
//         method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(record => e.target.parentElement.remove());
// }
