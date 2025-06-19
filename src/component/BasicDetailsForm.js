import React, { useState } from 'react'
import {useNavigate} from "react-router"
import axios from 'axios';




export default function BasicDetailsForm() {
  const navigate=useNavigate();
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    return newErrors;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Submit logic here (e.g., API call)
      const response = await axios.post('https://assessments-xhy0.onrender.com/api-docs/submit', formData,{
headers:{
  'Content-Type':'application/json',
},
      });
    console.log(response.data);
    console.log('form submitting',formData);
      
      navigate('/DocumentCollection')
    }
  };



  return (
    <div className='mt-8'>
        <form  className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Basic Details</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
    </div>
  )
}
