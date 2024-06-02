import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/index';
import LaundryLogo from '../assets/laundry-removebg.png';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Invoice = () => {
    const { id, type } = useParams();
    const [order, setOrder] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const fetchOrderDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/invoice/${type}/${id}`);
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }, [id, type]);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const printInvoice = () => {
        window.print();
    };

    const downloadInvoiceAsPDF = () => {
        const invoiceElement = document.getElementById('invoice');
        html2canvas(invoiceElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`invoice_${id}.pdf`);
        });
    };

    const downloadInvoiceAsJPG = () => {
        const invoiceElement = document.getElementById('invoice');
        html2canvas(invoiceElement).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');
            link.download = `invoice_${id}.jpg`;
            link.click();
        });
    };

    if (!order) return <div className='container mx-auto flex justify-center items-center h-screen'>Loading...</div>;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-yellow-50"> 
            <div className='container mx-auto flex flex-col justify-center items-center h-screen '>
                <div id="invoice" className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mb-4">
                    <div className="flex justify-center items-center mb-4">
                        <img src={LaundryLogo} alt="Logo" className="h-12 w-12 mr-4" />
                        <h1 className="text-xl md:text-2xl font-bold">Bingo Laundry</h1>
                    </div>
                    <div className='mb-3 text-center'>
                        <p>Jl. Bobosan Timur No.316 RT.06/RW.01 Kel. Purwanegara</p>
                        <p>WA : 085747855881</p>
                    </div>
                    <hr className='my-3' />
                    <div className='grid grid-cols-2 gap-2'>
                        <p className="text-left"><strong>No Order:</strong></p>
                        <p className="text-right">{order.noOrderExp || order.noOrderReg || order.noOrderStr}</p>
                        
                        <p className="text-left"><strong>Nama:</strong></p>
                        <p className="text-right">{order.namaPelangganExp || order.namaPelangganReg || order.namaPelangganStr}</p>
                        
                        <p className="text-left"><strong>Jenis Paket:</strong></p>
                        <p className="text-right">{order.paketExp || order.paketReg || order.paketStr}</p>
                        
                        <p className="text-left"><strong>Berat (Kg):</strong></p>
                        <p className="text-right">{order.beratExp || order.beratReg || order.beratStr}</p>
                        
                        <p className="text-left"><strong>Tgl Order:</strong></p>
                        <p className="text-right">{formatDate(order.tglOrderExp || order.tglOrderReg || order.tglOrderStr)}</p>
                        
                        <p className="text-left"><strong>Est Selesai:</strong></p>
                        <p className="text-right">{formatDate(order.tglSelesaiExp || order.tglSelesaiReg || order.tglSelesaiStr)}</p>

                        <hr className='col-span-2 my-3' />

                        <p className="text-left"><strong>Keterangan:</strong></p>
                        <p className="text-right">{order.keteranganExp || order.keteranganReg || order.keteranganStr}</p>

                        <p className="text-left"><strong>Total:</strong></p>
                        <p className="text-right">Rp. {new Intl.NumberFormat('id-ID').format(order.totalBayarExp || order.totalBayarReg || order.totalBayarStr || 0)}</p>
                        
                        <p className="text-left"><strong>Status:</strong></p>
                        <p className="text-right">{order.status ? 'Selesai' : 'Pending'}</p>
                    </div>

                    <hr className='my-3' />
                    <h4 className="font-bold text-center">Terimakasih,</h4>
                    <p className="text-center">{currentTime.toLocaleDateString('id-ID')} {currentTime.toLocaleTimeString('id-ID')}</p>
                </div>
                <div className='text-center flex flex-col-5'>
                    <button
                        onClick={printInvoice}
                        className="bg-blue-500 text-white font-bold py-2 px-4 m-2 rounded hover:bg-blue-700"
                    >
                        Print Invoice
                    </button>
                    <button
                        onClick={downloadInvoiceAsPDF}
                        className="bg-green-500 text-white font-bold py-2 px-4 m-2 rounded hover:bg-green-700"
                    >
                        Download as PDF
                    </button>
                    <button
                        onClick={downloadInvoiceAsJPG}
                        className="bg-red-500 text-white font-bold py-2 px-4 m-2  rounded hover:bg-red-700"
                    >
                        Download as JPG
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
