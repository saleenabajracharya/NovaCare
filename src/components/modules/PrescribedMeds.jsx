
import React from 'react';
import { Layout } from '../layout/Layout';

const sampleMedicines = [
  { name: 'Paracetamol', quantity: 2, price: 5 },
  { name: 'Amoxicillin', quantity: 1, price: 10 },
  { name: 'Vitamin C', quantity: 3, price: 2 },
];
const consultationFee = 500;

const PrescribedMeds = ({ doctorName, patientName, date }) => {
  const total = sampleMedicines.reduce((sum, med) => sum + med.price * med.quantity, consultationFee);

  return (
    <Layout>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
        <div className="flex p-0 lg:p-2 justify-between ">
            <div className="hidden md:block lg:h-15 md:h-10 lg:w-15 md:w-10" >
                <img src="/images/logo.svg" alt="logo" />
            </div>
            <div className="ms-3 lg:ms-8">
      <h2 className="text-sm md:text-2xl lg:text-3xl font-bold text-center text-[var(--primary-color)] mb-0 lg:mb-2">NovaCare Hospital Pvt. Ltd.</h2>
      <p className="text-[0.6rem] md:text-sm   lg:text-md text-start md:text-center text-[var(--text-primary)] mb-0 lg:mb-8">Baneshwor, Kathmandu</p>
      </div>
      <div className="pt-1 md:pt-6 lg:mt-6">
      <p className="text-[0.6rem] md:text-sm lg:text-md  text-[var(--text-primary)]">Phone: 01-4767895</p>
      <p className="text-[0.6rem] md:text-sm lg:text-md   text-[var(--text-primary)] mb-4">Email: nch@nch.com.np</p>
      </div>
      </div>
      <h1 className="text-xl font-bold mb-4 text-center">Doctor's Medicine Bill</h1>

      <div className="mb-4">
        <p><strong>Doctor:</strong> </p>
        <p><strong>Patient:</strong> </p>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      </div>

      <table className="w-full border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Medicine</th>
            <th className="border px-4 py-2 text-right">Quantity</th>
            <th className="border px-4 py-2 text-right">Price</th>
            <th className="border px-4 py-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {sampleMedicines.map((med, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{med.name}</td>
              <td className="border px-4 py-2 text-right">{med.quantity}</td>
              <td className="border px-4 py-2 text-right">${med.price.toFixed(2)}</td>
              <td className="border px-4 py-2 text-right">
                ${(med.price * med.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-semibold">
            <td colSpan="3" className="border px-4 py-2 text-right">Consultation Fee</td>
            <td className="border px-4 py-2 text-right">${consultationFee.toFixed(2)}</td>
          </tr>
          <tr className="bg-gray-200 font-bold">
            <td colSpan="3" className="border px-4 py-2 text-right">Total</td>
            <td className="border px-4 py-2 text-right">${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <p className="text-sm text-gray-500 text-center">Thank you for your visit!</p>
    </div>
    </Layout>
  );
};

export default PrescribedMeds;
