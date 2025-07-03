import React, { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { confirmAlert } from 'react-confirm-alert';
import { toast , ToastContainer} from 'react-toastify';
import { useSelector } from "react-redux";

const NEPAL_OFFSET_MINUTES = 5 * 60 + 45; // 345 minutes

const formatDateNepal = (dateString) => {
  if (!dateString) return "N/A";

  // Parse date string into JS Date object (assumed to be UTC)
  const date = new Date(dateString);

  // Adjust date by Nepal timezone offset
  const nepalDate = new Date(date.getTime() + NEPAL_OFFSET_MINUTES * 60000);

  // Return YYYY-MM-DD format
  return nepalDate.toISOString().slice(0, 10);
};

const PatientHistory = () => {
  const [openId, setOpenId] = useState(null);
  const [patientRecord, setPatientRecord] = useState([]);
  const searchQuery = useSelector((state) => state.search.query);



  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const res = await fetch("http://localhost:5000/record/patients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch patient history");

        const resData = await res.json();
        setPatientRecord(resData);
      } catch (error) {
        console.error("Error fetching patients data:", error);
        setPatientRecord([]);
      }
    };

    fetchPatientHistory();
  }, []);

  const toggleDetails = (FormId) => {
    setOpenId(openId === FormId ? null : FormId);
  };

  const handleDelete = (FormId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this data?',
      buttons: [
        {
          label: 'Yes',
          className: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
          onClick: async () => {
            try {
              const res = await fetch(`http://localhost:5000/record/patients/${FormId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },

              });

              if (res.ok) {
                toast.success('Patient record deleted successfully!');
                setPatientRecord(prevUsers => prevUsers.filter(user => user.FormId !== FormId));
              } else {
                toast.error('Failed to delete record');
              }
            } catch (error) {
              console.error('Error deleting record:', error);
            }
          }
        },
        {
          label: 'No',
          className: 'bg-[var(--primary-color))] text-white px-4 py-2 rounded hover:bg-blue-200',
          onClick: () => { }
        }
      ]
    });
  };

  // Case-insensitive filter
const filteredRecords = patientRecord.filter((entry) => {
  const lowerQuery = searchQuery.toLowerCase();
  return (
    entry.patientname?.toLowerCase().includes(lowerQuery) ||
    entry.patientid?.toString().toLowerCase().includes(lowerQuery) ||
    entry.phone?.toString().toLowerCase().includes(lowerQuery)
  );
});


  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)] w-4/5 mx-auto rounded-xl p-5 bg-white py-5">
        <h2 className="text-2xl text-center font-bold text-[var(--text-primary)] mb-6 mt-5">Patient History</h2>

        {filteredRecords.map((entry) => (
          <div key={entry.FormId} className="border rounded-md mb-4 shadow-sm transition-all">
            <div
              onClick={() => toggleDetails(entry.FormId)}
              className="p-4 cursor-pointer bg-[var(--background-color)] hover:bg-blue-100 flex justify-between items-center"
            >
              <span className="font-medium">
                {entry.created_Date ? formatDateNepal(entry.created_Date) : "N/A"}- {entry.patientname} - {entry.phone}
              </span>
              <span className="text-[var(--primary-color)]">
                {openId === entry.FormId ? <RxCross2 size={26} onClick={() => handleDelete(entry.FormId)} /> : <FaCaretDown size={26} />}
              </span>
            </div>

            {openId === entry.FormId && (
              <div className="p-4 bg-gray-50">
                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Patient ID:</label>
                    <input type="text" value={entry.patientid} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Patient Name:</label>
                    <input type="text" value={entry.patientname} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Gender:</label>
                    <input type="text" value={entry.gender} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Age:</label>
                    <input type="number" value={entry.age} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Address:</label>
                    <input type="text" value={entry.address} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Contact Number:</label>
                    <input type="text" value={entry.phone} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Doctor Name:</label>
                    <input type="text" value={entry.doctor_name} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Reason for Visit:</label>
                    <input type="text" value={entry.department} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Appointment Date:</label>
                    <input type="text" value={entry.date} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label className="font-medium block">Symptoms:</label>
                    <input type="text" value={entry.symptoms} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>

                  <div className="w-full">
                    <label className="font-medium block">Doctor's Suggestion:</label>
                    <textarea value={entry.description} disabled className="w-full border p-2 rounded bg-gray-100" />
                  </div>
                </div>

                {entry.prescribedmeds?.length > 0 && entry.prescribedmeds[0]?.medicineName && (
                  <div className="mt-6">
                    <h3 className="text-md font-semibold mb-2">Prescribed Medicines</h3>
                    <table className="w-full table-auto border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Medicine Name</th>
                          <th className="border px-2 py-1">Type</th>
                          <th className="border px-2 py-1">Price</th>
                          <th className="border px-2 py-1">Quantity</th>
                          <th className="border px-2 py-1">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entry.prescribedmeds.map((medicine, idx) => (
                          <tr key={idx}>
                            <td className="border px-2 py-1">{medicine.medicineName}</td>
                            <td className="border px-2 py-1">{medicine.medicineType}</td>
                            <td className="border px-2 py-1">{medicine.price}</td>
                            <td className="border px-2 py-1">{medicine.quantity}</td>
                            <td className="border px-2 py-1">{medicine.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <ToastContainer position="top-center" autoClose={1500} />

      </div>
    </Layout>
  );
};

export default PatientHistory;
