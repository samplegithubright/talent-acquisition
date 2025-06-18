import React, { useState } from 'react'


import axios from 'axios';
import { useNavigate } from 'react-router';




export default function InterviewAvailblity() {
const navigate=useNavigate();

 const [formData, setFormData] = useState({
    email: "",
    location: "",
    interviewDate: "",
    interviewTime: "",
    timeZone: "",
    interviewMedium: "",
  });

  const [errors, setErrors] = useState({});

  const timeZones = [
    "IST (India Standard Time)",
    "PST (Pacific Standard Time)",
    "EST (Eastern Standard Time)",
    "CET (Central European Time)",
    "GMT (Greenwich Mean Time)",
  ];

  const mediums = ["In-Person", "Phone", "Video Call"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    return newErrors;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
     
        const response = await axios.post('https://assessments-xhy0.onrender.com/api-docs/submit', formData);
         console.log("Form submitted:", formData);
      console.log('Response:', response.data);
      alert('All data submit successfully');
     navigate('/');
    }
  };



  return (
    <div className=''>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Interview Availability</h2>

      <div className="mb-4">
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Interview Date</label>
        <input
          type="date"
          name="interviewDate"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.interviewDate}
          onChange={handleChange}
        />
        {errors.interviewDate && <p className="text-red-500 text-sm">{errors.interviewDate}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Interview Time</label>
        <input
          type="time"
          name="interviewTime"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.interviewTime}
          onChange={handleChange}
        />
        {errors.interviewTime && <p className="text-red-500 text-sm">{errors.interviewTime}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Time Zone</label>
        <select
          name="timeZone"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.timeZone}
          onChange={handleChange}
        >
          <option value="">Select Time Zone</option>
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
        {errors.timeZone && <p className="text-red-500 text-sm">{errors.timeZone}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Interview Medium</label>
        <select
          name="interviewMedium"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.interviewMedium}
          onChange={handleChange}
        >
          <option value="">Select Interview Medium</option>
          {mediums.map((medium) => (
            <option key={medium} value={medium}>
              {medium}
            </option>
          ))}
        </select>
        {errors.interviewMedium && <p className="text-red-500 text-sm">{errors.interviewMedium}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>

    </div>
  )
}
