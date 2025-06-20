import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Layout } from "../layout/Layout";

const TodaysList = () => {
    const [patientRecord, setPatientRecord] = useState([]);
    const user = JSON.parse(localStorage.getItem('user:detail') || '{}');
    const department = user.department || "User";
    const navigate = useNavigate();
    const fetchPatientHistory = async () => {
        try {
            setTimeout(async () => {
                const res = await fetch(`http://localhost:5000/record/patientstoday?department=${department}`, {
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
            }, 100);
        } catch (error) {
            console.error("Error fetching patients data:", error);
            setPatientRecord(resData);
        } finally {
        }
    };

    useEffect(() => {

        fetchPatientHistory();
    }, []);

    return (
        <Layout>
            <div className="min-h-[calc(100vh-140px)] w-4/5 mx-auto rounded-xl p-5 bg-white py-5 ">
                <h2 className="text-2xl text-center font-bold text-[var(--text-primary)] mb-6 mt-5">Today's List</h2>
                {patientRecord.map((entry) => (
                    <div
                        key={entry.FormId}
                        className="border rounded-md mb-4 shadow-sm transition-all"
                    >
                        <div
                            onClick={() => navigate(`/form/${entry.FormId}`)}
                            className="p-4 cursor-pointer bg-[var(--background-color)] hover:bg-blue-100 flex justify-between items-center"
                        >
                            <span className="font-medium">{entry.date ? entry.date.slice(0, 10) : "N/A"} - {entry.patientname} - {entry.phone}</span>
                        </div>

                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default TodaysList
