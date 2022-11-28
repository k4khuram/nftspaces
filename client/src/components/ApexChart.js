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
                    sparkline: {
                        enabled: true,
                    }
                },
                fill: {
                    colors: ['#1A73E8', '#B32824'],
                },
                legend: {
                    show: false,
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: this.props.categories,
                    labels: {
                        show: false,
                        formatter: function (value) {
                            var d = new Date(value).toUTCString();
                            return d.replace('GMT','UTC');
                        }
                    }
                },
                yaxis: {
                    labels: {
                        show: false,
                        formatter: function (value) {
                            return "$"+new Intl.NumberFormat('en-IN').format(value);
                        }                      
                    }
                },
                // tooltip: {
                //     x: {
                //         format: 'MMM dd, yyyy, HH:mm',
                //     }
                // },
            },


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
                    height="100"
                />
            </div>
        );
    }
}

export default ApexChart;