import React, { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { FaCaretDown, FaCaretUp  } from "react-icons/fa";

const PatientHistory = () => {
    debugger;
  const [openId, setOpenId] = useState(null);
  const [patientRecord, setPatientRecord] = useState([]);

   useEffect(() => {
    const fetchPatientHistory = async () => {
    try {
      setTimeout(async () => {
        const res = await fetch(`http://localhost:5000/record/patients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetching patient history");
        }

        const resData = await res.json();
        setPatientRecord(resData);
      }, 200);
    } catch (error) {
      console.error("Error fetching patients data:", error);
        setPatientRecord(resData);
    } finally {
    }
  };
    fetchPatientHistory();
  }, []);

  const toggleDetails = (patientId) => {
    setOpenId(openId === patientId ? null : patientId);
  };

  return (
    <Layout>
    <div className="min-h-[calc(100vh-140px)] w-4/5 mx-auto rounded-xl p-5 bg-white py-5 ">
      <h2 className="text-2xl text-center font-bold text-[var(--text-primary)] mb-6 mt-5">Patient History</h2>
      {patientRecord.map((entry) => (
        <div
        key={entry.FormId}
          className="border rounded-md mb-4 shadow-sm transition-all"
        >
          <div
            onClick={() => toggleDetails(entry.patientid)}
            className="p-4 cursor-pointer bg-[var(--background-color)] hover:bg-blue-100 flex justify-between items-center"
          >
            <span className="font-medium">{entry.date ? entry.date.slice(0, 10) : "N/A"} - {entry.patientname} - {entry.phone}</span>
            <span className="text-[var(--primary-color)]">{openId === entry.patientid ? <FaCaretUp size={26} />
  : <FaCaretDown size={26}/>}</span>
          </div>

          {openId === entry.patientid && (
            <div className="p-4 bg-gray-50" >
              <div className="flex space-x-4 space-y-3">
              <div className="w-1/2">
                <label className="font-medium   block">PatientID:</label>
                <input
                  type="text"
                  disabled
                  value={entry.patientid}
                  readOnly
                  className="w-full border p-2 rounded bg-gray-100"
                />
                </div>
                <div className="w-1/2">
                <label className="font-medium   block">Patient Name:</label>
                <input
                  type="text"
                  value={entry.patientname}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />
                </div>
              </div>
              <div className="flex space-x-4 space-y-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Gender:</label>
          <select
            className="mt-1 w-full border rounded-md p-2 bg-white"
            disabled
            value={entry.gender?.toLowerCase() || ""}
            >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            </select>


        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Age:</label>
          <input
            value={entry.age}
            disabled
            type="number"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
      </div>
      <div className="flex space-x-4 space-y-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Address:</label>
          <input
            type="text"
            value={entry.address}
            disabled
            className="mt-1 w-full border rounded-md p-2 hover:border-black"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Contact Number:</label>
          <input
            type="text"
            value={entry.phone}
            disabled
            className="mt-1 w-full border rounded-md p-2 hover:border-black"
          />
        </div>
      </div>
      <div className="flex space-x-4 space-y-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Doctor Name</label>
          <input
            type="text"
            value={entry.doctor_name}
            disabled
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Reason for visit:</label>
          <input
            type="text"
            value={entry.department}
            disabled
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
      </div>
      <div className="flex space-x-4 space-y-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Appointment date:</label>
          <input
            type="text"
            value={entry.date}
            disabled
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Symptom:</label>
          <input
            type="text"
            value={entry.symptoms}
            disabled
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)]">Doctor's suggestion </label>
        <textarea
        value={entry.symptoms}
        disabled
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>
            </div>
          )}
        </div>
      ))}
    </div>
    </Layout>
  );
};

export default PatientHistory;
