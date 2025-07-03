import { Layout } from "../layout/Layout"
import { useForm } from "react-hook-form"
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import PrescribedMeds from "./PrescribedMeds";
import { confirmAlert } from 'react-confirm-alert';

const getToday = () => new Date().toISOString().split("T")[0];
const PatientForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const location = useLocation();
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [medRecord, setMedRecord] = useState([]);
  const [meds, setMeds] = useState([
    { medicineName: '', medicineType: '', price: '', quantity: '', totalPrice: '' }
  ]);


  const user = JSON.parse(localStorage.getItem('user:detail') || '{}');
  const isDoc = user?.role === "doctor";
  const isPharma = user?.role === "pharma" ;
  const email = user.email || "User";
  const { FormId } = useParams();




  const handleCancel = () => {
    reset();
    navigate('/');
  };

  useEffect(() => {
    if (!FormId && location.pathname === "/form") {
      reset({ date: getToday() });
    }
  }, [location.pathname, reset, FormId]);


  useEffect(() => {
    if (FormId) {
      debugger;
      const fetchPatientData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/record/patient/${FormId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) throw new Error("Failed to fetch patient data");
          debugger;
          const data = await res.json();
          const mappedData = {
            patientId: data.patientid,
            patientName: data.patientname,
            gender: data.gender,
            age: data.age,
            address: data.address,
            phone: data.phone,
            doctorId: data.doctor_id,
            reason: data.department,
            symptoms: data.symptoms,
            date: data.date?.split("T")[0],
            email: data.email,
          };

          Object.entries(mappedData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              setValue(key, value);
            }
          });

          setDoctorId(data.doctor_id);
          if (data.department) {
            await handleDepartmentChange({ target: { value: data.department } });
          }

          if (data.doctor_name) {
            setTimeout(() => {
              setValue("doctorName", data.doctor_name);
            }, 50);
          }
          if (data.prescribedmeds && Array.isArray(data.prescribedmeds)) {
            const medRows = data.prescribedmeds.map(med => ({
              id: med.id,
              medicineName: med.medicineName || '',
              medicineType: med.medicineType || '',
              price: med.price !== null ? med.price.toString() : '',
              quantity: med.quantity !== null ? med.quantity.toString() : '',
              totalPrice: med.totalPrice !== null ? med.totalPrice.toString() : '',
            }));

            setMeds(medRows);
          } else {
            setMeds([]);
          }

        } catch (err) {
          console.error("Error fetching patient by ID:", err);
        }
      };

      fetchPatientData();
    }
  }, [FormId, setValue]);

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
                  navigate("/todays-list");                
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

  const newPatient = () => {
    const date = new Date();
    const yyyyMMdd = date.toISOString().split("T")[0].replace(/-/g, "");
    const random = Math.floor(100 + Math.random() * 900);
    const generatedId = `PID-${yyyyMMdd}-${random}`;
    setPatientId(generatedId);
    setValue("patientId", generatedId);
  }

  const phoneValue = watch("phone");


  useEffect(() => {

    register("phone", { required: "Phone number is required" });
  }, [register]);

  const handleDepartmentChange = async (e) => {
    const selectedDepartment = e.target.value;
    setValue("reason", selectedDepartment);

    const token = localStorage.getItem('user:token');

    try {
      const res = await fetch(
        `http://localhost:5000/data/department/${encodeURIComponent(selectedDepartment)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setDoctors(data);
      } else {
        console.error("Expected array, got:", data);
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("An error occurred while fetching doctors");
      setDoctors([]);
    }
  };

  const handleDoctorChange = async (e) => {
    debugger;
    const selectedDoctor = e.target.value;
    setValue("doctorName", selectedDoctor);

    const token = localStorage.getItem('user:token');

    try {
      const res = await fetch(
        `http://localhost:5000/data/doctor/${encodeURIComponent(selectedDoctor)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data) {
        setDoctorId(data.UserId);
        setValue("doctorId", data.UserId);

      } else {
        console.error("error", data);
        setDoctorId("");
        setValue("doctorId", "");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("An error occurred while fetching doctors");
      setDoctorId("");
    }

  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem('user:token');
    const updatedData = {
      ...data, email: email,
      prescribedMeds: meds.filter(
        (med) =>
          med.medicineName || med.medicineType || med.price || med.quantity || med.totalPrice
      )
    };

    try {
      const url = FormId
        ? `http://localhost:5000/record/patient/${FormId}`
        : `http://localhost:5000/record/patient`;

      const method = FormId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const resText = await res.text();
      const resData = resText ? JSON.parse(resText) : {};

      if (res.status === 400) {
        toast.error("Invalid input");
      } else if (res.status === 201 || res.status === 204 || res.status === 200) {

        reset();
        if (FormId) {
          toast.success("Patient Record Updated!");
          setTimeout(() => {
            navigate("/todays-list");
          }, 1000);
        } else {
          toast.success("Patient Record Added!");
          setTimeout(() => {
            navigate("/form");
          }, 500);
        }

      } else {
        toast.error(resData.message || "Unexpected server response");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };




  return (
    <Layout>

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-1 md:p-6 lg:p-6 max-w-7xl mx-auto bg-white rounded-xl shadow"
        >
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
          <h2 className="text-sm md:text-xl lg:text-xl font-bold text-center text-[var(--primary-color)] mb-5">OPD Registration</h2>

          {/* Row 1 */}
          <div className="flex space-x-4 space-y-3">

            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Date</label>
              <input
                type="date"
                {...register("date")}
                className="mt-1 w-full border-none focus:border-none rounded-md p-2 bg-gray-100"
                readOnly
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)] ">Patient Id *
                <button type="button" className={`${isDoc ? `bg-gray-300` : `bg-gray-500`} px-3  rounded-lg  ms-2 text-white`} disabled={isDoc ? true : undefined} onClick={newPatient}>New</button>
              </label>
              <input
                type="text"
                {...(isDoc && { readOnly: true })}
                {...register("patientId", { required: "Patient Id is required" })}
                className={`mt-1 w-full  ${isDoc ? `border-none focus:border` : `border`} rounded-md p-2 `}
              />
              {errors.patientId && <p className="text-red-500 text-sm">{errors.patientId.message}</p>}


            </div>
          </div>

          {/* Row 2 */}
          <div className="flex space-x-4 space-y-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Patient Name *</label>
              <input
                type="text"
                {...register("patientName", { required: "Patient name is required" })}
                className="mt-1 w-full border rounded-md p-2"
              />
              {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName.message}</p>}

            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Gender *</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="mt-1 w-full border rounded-md p-2 bg-white"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>

          </div>

          {/* Row 3 */}
          <div className="flex space-x-4 space-y-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Age *</label>
              <input
                type="number"
                {...register("age", { required: "Age is required" })}
                className="mt-1 w-full border rounded-md p-2"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Address*</label>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                className="mt-1 w-full border rounded-md p-2"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>

          </div>

          {/* Row 4 */}
          <div className="flex space-x-4 space-y-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Contact Number*</label>
              <PhoneInput
                defaultCountry="NP"
                value={phoneValue}
                onChange={(value) => setValue("phone", value)}
                placeholder="Enter phone number"
                className="mt-1 w-full border rounded-md p-2"
              />

              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div className="w-1/2 ">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Reason for Visit </label>
              <select
                {...register("reason", { required: "Reason is required" })}
                onChange={handleDepartmentChange}
                className="mt-1 w-full border rounded-md p-2 bg-white"
              >
                <option value="">Select a department</option>
                <option>General Medicine</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
                <option>Cardiologist</option>
                <option>Dermatologist</option>
                <option>ENT</option>
                <option>Gynecologist</option>
                <option>Opthalmologist</option>
                <option>Hepatologist</option>
                <option>Nephrologist</option>
              </select>
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
            </div>

          </div>

          {/* Row 5 */}
          <div className=" flex space-x-4 space-y-3 ">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Doctor Name *</label>
              <select
                {...register("doctorName", { required: "Doctor name is required" })}
                className="mt-1 w-full border rounded-md p-2 bg-white"
                onChange={handleDoctorChange}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.fullname}>
                    {doctor.fullname}
                  </option>
                ))}
              </select>
              {errors.doctorName && <p className="text-red-500 text-sm">{errors.doctorName.message}</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Symptoms</label>
              <input
                type="text"
                {...register("symptoms")}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>



          </div>

          <input
            type="text"
            {...register("doctorId")}
            value={doctorId}
            readOnly
            hidden
            className="mt-1 w-full border rounded-md p-2 text-sm text-black bg-gray-100"
          />

          {(isDoc || isPharma) && (<div><label className="block text-sm font-medium text-[var(--text-primary)]">Doctor's suggestion </label>
            <textarea type="datetime-local" {...register("description")} className="mt-1 w-full border rounded-md p-2" />


          </div>)}

          {(isDoc || isPharma)&& (<div className="py-5">
            <PrescribedMeds rows={meds} setRows={setMeds} setMedRecord={setMedRecord} />

          </div>)}

          {/* Submit */}
          <div className=" pt-8 flex gap-3 items-center justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[var(--primary-color)] text-white font-semibold rounded hover:bg-[#085a9d]"
            >
              Save
            </button>

            {FormId ? (
              <button
                type="button"
                onClick={() => handleDelete(FormId)}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
              >
                Delete
              </button>) : 
              (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-[var(--text-primary)] font-semibold rounded hover:bg-gray-400"
            >
              Cancel
            </button>)}
          </div>
        </form>


        <ToastContainer position="top-center" autoClose={1500} />
      </div>
    </Layout>
  )
}

export default PatientForm
