import React, { useEffect, useState } from 'react';
import axios from '../../services/index';
import ApexCharts from 'apexcharts';

const Chart = () => {
    const [chartData, setChartData] = useState([0, 0, 0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data from endpoint
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/order/total_pendapatan_pengeluaran');
                const data = response.data.data;
                setChartData([data.totalPendapatan, data.totalPengeluaran, data.netIncome]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            const getChartOptions = () => {
                return {
                    series: chartData,
                    colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
                    chart: {
                        height: 320,
                        width: "100%",
                        type: "donut",
                    },
                    stroke: {
                        colors: ["transparent"],
                        lineCap: "round",
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
                                        label: "Keuntungan", // Ubah label dari "Pendapatan" menjadi "Keuntungan"
                                        fontFamily: "Inter, sans-serif",
                                        formatter: function (w) {
                                            // Gunakan nilai netIncome untuk menampilkan nilai keuntungan
                                            return 'Rp' + chartData[2].toLocaleString('id-ID');
                                        },
                                    },
                                    value: {
                                        show: true,
                                        fontFamily: "Inter, sans-serif",
                                        offsetY: -20,
                                        formatter: function (value) {
                                            return 'Rp' + value.toLocaleString('id-ID');
                                        },
                                    },
                                },
                                size: "70%",
                            },
                        },
                    },
                    grid: {
                        padding: {
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
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
                                return 'Rp' + value.toLocaleString('id-ID');
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
            }
        }
    }, [loading, chartData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col h-screen'>
            <div className="bg-white shadow-md rounded-lg p-6 mt-8">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl lg:text-2xl font-bold">Pemasukan & Pengeluaran</h2>
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
