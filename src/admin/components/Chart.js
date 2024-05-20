import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const Chart = () => {
    useEffect(() => {
        const options = {
            series: [
                {
                    name: "Pemasukan",
                    data: [1500, 1418, 1456, 1526, 1356, 1256],
                    color: "#1A56DB",
                },
                {
                    name: "Pengeluaran",
                    data: [643, 413, 765, 412, 1423, 1731],
                    color: "#FF0000",
                },
            ],
            chart: {
                type: 'area',
                height: '100%',
                width: '100%',
                fontFamily: 'Inter, sans-serif',
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            legend: {
                show: false,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: '#1C64F2',
                    gradientToColors: ['#1C64F2', '#FF0000'],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 6,
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: 0,
                },
            },
            xaxis: {
                categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
                labels: {
                    formatter: function (value) {
                        return '$' + value;
                    },
                },
            },
        };

        const chartElement = document.getElementById('data-series-chart');
        if (chartElement && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(chartElement, options);
            chart.render();
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
                            <div id="data-series-chart" className="h-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;
