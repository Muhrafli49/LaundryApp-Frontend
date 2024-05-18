import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LaundryLogo from '../assets/laundry-removebg.png';

const Invoice = () => {
    const { id, type } = useParams();
    const [order, setOrder] = useState(null);

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

    const printInvoice = () => {
        window.print();
    };

    if (!order) return <div className='container mx-auto flex justify-center items-center h-screen'>Loading...</div>;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <div className='container mx-auto flex justify-center items-center h-screen'>
            <div className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
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

                    <p className="text-left"><strong>Total:</strong></p>
                    <p className="text-right">Rp. {new Intl.NumberFormat('id-ID').format(order.totalBayarExp || order.totalBayarReg || order.totalBayarStr || 0)}</p>
                    
                    <p className="text-left"><strong>Status:</strong></p>
                    <p className="text-right">{order.status ? 'Selesai' : 'Pending'}</p>
                </div>

                <hr className='my-3' />

                <div className='text-center'>
                    <button
                        onClick={printInvoice}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Print Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
