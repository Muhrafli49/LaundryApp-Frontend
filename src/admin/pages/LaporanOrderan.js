import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from '../../services/index';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import 'tailwindcss/tailwind.css';

const getChartOptions = (seriesData) => {
  return {
    series: seriesData,
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -25
        },
      },
    },
    labels: ["Paket Laundry Express", "Paket Laundry Reguler", "Paket Laundry Setrika"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };
}

const LaporanOrderan = () => {
    const [seriesData, setSeriesData] = useState([0, 0, 0]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/invoice/total_order');
                const { totalExp, totalReg, totalStr } = response.data;
                setSeriesData([totalExp, totalReg, totalStr]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching order totals:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartOptions = getChartOptions(seriesData);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-row flex-1">
                <Sidebar />
                <div className="flex-1 p-6 overflow-auto">
                    <div className="container mx-auto">
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <div className="card-body">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-3xl lg:text-4xl mb-5">Rekapan Orderan</h2>
                                </div>
                                {isLoading ? (
                                    <div className="flex justify-center">
                                        <p>Loading...</p>
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <div className="w-full">
                                            <ApexCharts 
                                                options={chartOptions} 
                                                series={chartOptions.series} 
                                                type="pie" 
                                                height={chartOptions.chart.height}
                                                width={chartOptions.chart.width}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LaporanOrderan;
