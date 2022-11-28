import React from 'react';
import Chart from "react-apexcharts";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'Market Caps',
                data: this.props.caps
            }, {
                name: 'Volume',
                data: this.props.volumes
            }],
            options: {
                chart: {
                    type: 'area',
                    toolbar: {
                        show: false
                    },
                },
                stroke: {
                    curve: 'smooth',
                    width: [1, 1],
                    colors: ['#7655e0', '#9a42a1']
                },
                markers: {
                    size: 0,
                    colors: ['#7655e0', '#c940c9'],
                    strokeWidth: 1,
                    strokeOpacity: 0.9,
                    fillOpacity: 1,
                    shape: "circle",
                    radius: 2,
                },
                fill: {
                    colors: ['#1A73E8', '#c940c9'],
                },
                legend: {
                    show: false,
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    type: 'datetime',
                    categories: this.props.categories,
                    labels: {
                        show: true,
                        style: {
                            cssClass: ['label-white']
                        },
                        format: 'HH:mm'
                    },
                },
                yaxis: {
                    labels: {
                        show: false,
                        formatter: function (value) {
                            return "$"+new Intl.NumberFormat('en-IN').format(value);
                        },
                    },
                },
                tooltip: {
                    enabled: true,
                    x: {
                        show: true,
                        formatter: function (value) {
                            var d = new Date(value).toUTCString();
                            return d.replace('GMT','UTC');
                        }
                    },
                    marker: {
                        show: true,
                        fillColors: ['#7655e0', '#c940c9'],
                    },
                },
            }
        };
    }



    render() {
        return (
            <div id="chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="area"
                    width="500"
                    height="200"
                />
            </div>
        );
    }
}

export default ApexChart;