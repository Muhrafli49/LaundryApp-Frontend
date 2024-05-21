import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const Chart = () => {
    useEffect(() => {
        const getChartOptions = () => {
            return {
                series: [0, 0, 0],
                colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
                chart: {
                    height: 320,
                    width: "100%",
                    type: "donut",
                },
                stroke: {
                    colors: ["transparent"],
                    lineCap: "",
                },
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                name: {
                                    show: true,
                                    fontFamily: "Inter, sans-serif",
                                    offsetY: 20,
                                },
                                total: {
                                    showAlways: true,
                                    show: true,
                                    label: "Pendapatan",
                                    fontFamily: "Inter, sans-serif",
                                    formatter: function (w) {
                                        const sum = w.globals.seriesTotals.reduce((a, b) => {
                                            return a + b;
                                        }, 0);
                                        return '$' + sum + 'k';
                                    },
                                },
                                value: {
                                    show: true,
                                    fontFamily: "Inter, sans-serif",
                                    offsetY: -20,
                                    formatter: function (value) {
                                        return '$' + value + 'k';
                                    },
                                },
                            },
                            size: "80%",
                        },
                    },
                },
                grid: {
                    padding: {
                        top: -2,
                    },
                },
                labels: ["PEMASUKAN", "PENGELUARAN", "PENDAPATAN"],
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    position: "bottom",
                    fontFamily: "Inter, sans-serif",
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return '$' + value + 'k';
                        },
                    },
                },
                xaxis: {
                    labels: {
                        formatter: function (value) {
                            return value;
                        },
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                },
            };
        };

        const chartElement = document.getElementById('donut-chart');
        if (chartElement && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(chartElement, getChartOptions());
            chart.render();

            // Get all the checkboxes by their class name
            const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');

            // Function to handle the checkbox change event
            function handleCheckboxChange(event, chart) {
                const checkbox = event.target;
                if (checkbox.checked) {
                    switch (checkbox.value) {
                        case 'pemasukan':
                            chart.updateSeries([35.1, 0, 22.4]);
                            break;
                        case 'pengeluaran':
                            chart.updateSeries([0, 23.5, 2.4]);
                            break;
                        case 'pendapatan':
                            chart.updateSeries([15.1, 22.5, 4.4]);
                            break;
                        default:
                            chart.updateSeries([0, 0, 0]);
                    }

                } else {
                    chart.updateSeries([0, 0, 0]);
                }
            }

            // Attach the event listener to each checkbox
            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', (event) => handleCheckboxChange(event, chart));
            });
        }
    }, []);

    return (
        <div className='flex flex-col h-screen'>
            <div className="bg-white shadow-md rounded-lg p-6 mt-8">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl lg:text-2xl">Pemasukan & Pengeluaran</h2>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full h-80 overflow-hidden">
                            <div id="donut-chart" className="h-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;
