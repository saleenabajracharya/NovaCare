import React from 'react';
import { FaPlus } from 'react-icons/fa';

const PrescribedMeds = ({ rows, setRows }) => {
  const handleAddRow = () => {
    setRows([...rows, { medicineName: '', medicineType: '', price: '', quantity: '', totalPrice: '' }]);
  };


  const handleChange = (index, field, value) => {
  const updated = [...rows];
  updated[index][field] = value;

  const price = parseFloat(updated[index].price) || 0;
  const quantity = parseFloat(updated[index].quantity) || 0;
  updated[index].totalPrice = price * quantity;

  setRows(updated);
};




  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold text-center text-[var(--text-primary)] mb-4">Medicines</h2>
           <div className="overflow-x-auto md:overflow-x-scroll lg:overflow-x-scroll">
  <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">S.N.</th>
            <th className="border p-2">Medicine Name</th>
            <th className="border p-2">Medicine Type</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
            <th className="border p-2 text-center">Add</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.medicineName}
                  onChange={(e) => handleChange(index, 'medicineName', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.medicineType}
                  onChange={(e) => handleChange(index, 'medicineType', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={row.price}
                  onChange={(e) => handleChange(index, 'price', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={row.totalPrice}
                  onChange={(e) => handleChange(index, 'totalPrice', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2 text-center">
                {index === rows.length - 1 && (
                  <button onClick={handleAddRow} className="text-[var(--primary-color)] hover:text-blue-400">
                    <FaPlus />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default PrescribedMeds;
