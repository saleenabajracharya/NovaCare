import { Layout } from "../layout/Layout"
import { useForm } from "react-hook-form"
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const PatientForm = ({isDoc = true}) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm();

      const navigate = useNavigate();
      const [phoneValue, setPhoneValue] = useState("");
      const [patientId, setPatientId] = useState("");

      const handleCancel = () => {
        reset();
        navigate('/');
      };

      useEffect(() => {
        const date = new Date();
        const yyyyMMdd = date.toISOString().split("T")[0].replace(/-/g, "");
        const random = Math.floor(100 + Math.random() * 900);
        const generatedId = `PID-${yyyyMMdd}-${random}`;
        setPatientId(generatedId);
        setValue("patientId", generatedId); 
      }, [setValue]);

      const onSubmit = (data) => {
        console.log("Form Data:", { ...data, phoneNumber: phoneValue });
        alert("Form submitted successfully!");
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
          <label className="block text-sm font-medium text-[var(--text-primary)] ">Patient Id *</label>
          <input
            type="text"
            value={patientId}
            readOnly
            {...register("patientId")}
            className="mt-1 w-full border border-none rounded-md p-2 focus:border-none"
          />
         
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Patient Name *</label>
          <input
            type="text"
            {...register("patientName", { required: "Patient name is required", min: 0 })}
            className="mt-1 w-full border rounded-md p-2"
          />
           
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex space-x-4 space-y-3">
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
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Age *</label>
          <input
            type="tel"
            {...register("contact", { required: "Contact number is required" })}
            className="mt-1 w-full border rounded-md p-2"
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex space-x-4 space-y-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Address</label>
          <input
            type="text"
            {...register("address")}
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Contact Number*</label>
          <PhoneInput
                    defaultCountry="NP"
                    value={phoneValue}
                    onChange={setPhoneValue}
                    placeholder="Enter phone number"
                    {...register("phoneValue", { required: "Phone number is required" })}
                    className="mt-1 w-full border rounded-md p-2"
                  />

{errors.phoneValue && <p className="text-red-500 text-sm">{errors.phoneValue.message}</p>}
        </div>
      </div>

      {/* Row 4 */}
      <div className="flex space-x-4 space-y-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Doctor Name *</label>
          <input
            type="text"
            {...register("doctorName", { required: "Doctor name is required" })}
            className="mt-1 w-full border rounded-md p-2"
          />
          {errors.doctorName && <p className="text-red-500 text-sm">{errors.doctorName.message}</p>}
        </div>
        <div className="w-1/2 ">
          <label className="block text-sm font-medium text-[var(--text-primary)]">Reason for Visit </label>
          <select
            {...register("reason")}
            className="mt-1 w-full border rounded-md p-2 bg-white"
          >
            <option value="">Select a department</option>
            <option>General Medicine</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>ENT</option>
            <option>Gynecology</option>
            <option>Opthamology</option>
            <option>Hepatology</option>
            <option>Nephrology</option>
          </select>

        </div>
      </div>

      {/* Row 5 */}
      <div className=" flex space-x-4 space-y-3 "> 
      <div className="w-1/2">
        <label className="block text-sm font-medium text-[var(--text-primary)]">Appointment Time *</label>
        <input
          type="datetime-local"
          {...register("appointment", { required: "Appointment time is required" })}
          className="mt-1 w-full border rounded-md p-2"
        />
        {errors.appointment && (
          <p className="text-red-500 text-sm">{errors.appointment.message}</p>
        )}
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

      {/* Row 6*/}
      {isDoc && (<div>
        <label className="block text-sm font-medium text-[var(--text-primary)]">Doctor's suggestion </label>
        <textarea
          type="datetime-local"
          {...register("suggestion")}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>)}

      {/* Submit */}
      <div className=" pt-8 flex gap-3 items-center justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-[var(--primary-color)] text-white font-semibold rounded hover:bg-[#085a9d]"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-300 text-[var(--text-primary)] font-semibold rounded hover:bg-gray-400" 
        >
          Cancel
        </button>
      </div>
    </form>
    </div>
    </Layout>
  )
}

export default PatientForm
