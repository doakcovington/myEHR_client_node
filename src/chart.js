console.log("chart.js");

class Chart {
    constructor(chart) {
        this.id = chart.id;
        this.name = chart.name;
        this.pcp = chart.pcp;
        this.dob = chart.dob;
        Chart.all.push(this);
    }

    renderChart() {
        return `
            <div class="row" data-record-id=${this.id}>
            <div class="col-sm-4">Name: ${this.name}</div>
            <div class="col-sm-4">Date of Birth: ${formatDate(this.dob)}</div>
            <div class="col-sm-4">Primary Care Provider: ${this.pcp}</div>
            </div>
        `
    }
}

Chart.all = [];