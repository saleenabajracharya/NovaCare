import React, { useState } from "react";
import { Layout } from "../layout/Layout";
import { FaCaretDown, FaCaretUp  } from "react-icons/fa";

const patientHistories = [
  {
    patientId: 1,
    patientName: "Salina Bajracharya",
    phoneNumber: 9863034062,
    age: 25,
    gender: "female",
    address: "Naikap",
    date: "2025-04-01",
    doctor: "Dr. Smith",
    reason: "",
    symptoms: "Fever, Cough",
    diagnosis: "Flu",
    prescription: "Paracetamol, Rest",
  },
  {
    patientId: 2,
    patientName: "Rohan Manandhar",
    phoneNumber: 9845748362,
    age: 24,
    gender: "male",
    date: "2025-03-15",
    doctor: "Dr. Brown",
    symptoms: "Headache",
    diagnosis: "Migraine",
    prescription: "Ibuprofen",
  },
];

const PatientHistory = () => {
    debugger;
  const [openId, setOpenId] = useState(null);

  const toggleDetails = (patientId) => {
    setOpenId(openId === patientId ? null : patientId);
  };

  return (
    <Layout>
    <div className="min-h-[calc(100vh-140px)] w-4/5 mx-auto rounded-xl p-5 bg-white py-5 ">
      <h2 className="text-2xl text-center font-bold text-[var(--text-primary)] mb-6 mt-5">Patient History</h2>
      {patientHistories.map((entry) => (
        <div
        key={entry.patientId}
          className="border rounded-md mb-4 shadow-sm transition-all"
        >
          <div
            onClick={() => toggleDetails(entry.patientId)}
            className="p-4 cursor-pointer bg-[var(--background-color)] hover:bg-blue-100 flex justify-between items-center"
          >
            <span className="font-medium">{entry.date} - {entry.patientName} - {entry.phoneNumber}</span>
            <span className="text-[var(--primary-color)]">{openId === entry.patientId ? <FaCaretUp size={26} />
  : <FaCaretDown size={26}/>}</span>
          </div>

          {openId === entry.patientId && (
            <div className="p-4 bg-gray-50" >
              <div className="flex space-x-4 space-y-3">
              <div className="w-1/2">
                <label className="font-medium   block">PatientID:</label>
                <input
                  type="text"
                  disabled
                  value={entry.patientId}
                  readOnly
                  className="w-full border p-2 rounded bg-gray-100"
                />
                </div>
                <div className="w-1/2">
                <label className="font-medium   block">Patient Name:</label>
                <input
                  type="text"
                  value={entry.patientName}
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
            value={entry.gender}
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
            value={entry.phoneNumber}
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
            value={entry.doctor}
            disabled
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Reason for visit:</label>
          <input
            type="text"
            value={entry.reason}
            disabled
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
      </div>
      <div className="flex space-x-4 space-y-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Appointment Time:</label>
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
        value={entry.prescription}
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
