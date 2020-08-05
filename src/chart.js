console.log("chart.js");

class Chart {
    constructor(id, chartAttributes) {
        this.id = id;
        this.name = chartAttributes.name;
        this.pcp = chartAttributes.pcp;
        this.dob = chartAttributes.dob;
        Chart.all.push(this);
    }

    renderChart() {
        return `
            <div class="row" data-record-id=${this.id}>
            <div class="col-sm-4" style="background-color:lavender;">Name: ${this.name}</div>
            <div class="col-sm-4" style="background-color:lavenderblush;">Date of Birth: ${formatDate(this.dob)}</div>
            <div class="col-sm-4" style="background-color:lavender;">Primary Care Provider: ${this.pcp}</div>
            </div>
        `
    }
}

Chart.all = [];