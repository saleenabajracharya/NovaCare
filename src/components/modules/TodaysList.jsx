import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Layout } from "../layout/Layout";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
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

const TodaysList = () => {
  const [patientRecord, setPatientRecord] = useState([]);
  const user = JSON.parse(localStorage.getItem('user:detail') || '{}');
  const department = user.department || "User";
  const isPharma = user.role || "User";;
  const navigate = useNavigate();
    const searchQuery = useSelector((state) => state.search.query);
  

  const fetchPatientHistory = async () => {
    try {
      setTimeout(async () => {
        const res = await fetch(`http://localhost:5000/record/patientstoday?department=${department}&role=${isPharma}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch patient history");
        }

        const resData = await res.json();
        setPatientRecord(resData);
      }, 100);
    } catch (error) {
      console.error("Error fetching patients data:", error);
      setPatientRecord([]);
    }
  };

  useEffect(() => {
    fetchPatientHistory();
  }, []);

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
      <div className="min-h-[calc(100vh-140px)] w-4/5 mx-auto rounded-xl p-5 bg-white py-5 ">
        <h2 className="text-2xl text-center font-bold text-[var(--text-primary)] mb-6 mt-5">Today's List</h2>
        {filteredRecords.map((entry) => (
          <div
            key={entry.FormId}
            className="border rounded-md mb-4 shadow-sm transition-all"
          >
            <div
              onClick={() => navigate(`/form/${entry.FormId}`)}
              className="p-4 cursor-pointer bg-[var(--background-color)] hover:bg-blue-100 flex justify-between items-center"
            >
              <span className="font-medium">
                {entry.created_Date ? formatDateNepal(entry.created_Date) : "N/A"}- {entry.patientname} - {entry.phone}
              </span>
            </div>
          </div>
        ))}
        <ToastContainer position="top-center" autoClose={1500} />

      </div>
    </Layout>
  );
};

export default TodaysList;
