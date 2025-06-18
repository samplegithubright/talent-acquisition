import React, { useState } from 'react'

import { useNavigate } from 'react-router'
import axios from 'axios';
export default function DocumentCollection() {

const navigate=useNavigate();
 const [formData, setFormData] = useState({
    class10: '',
    class12: '',
    graduation: '',
    postGraduation: '',
    resume: '',
    recommendation: '',
    salarySlips: '',
    others: '',
  });
 const [errors, setErrors] = useState({});

 const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
 const validate = () => {
    const newErrors = {};
    if (!formData.class10) newErrors.class10 = "Class 10 Marksheet is required";
    if (!formData.class12) newErrors.class12 = "Class 12 Marksheet is required";
    if (!formData.graduation) newErrors.graduation = "Graduation Marksheet is required";
    if (!formData.resume) newErrors.resume = "Resume/CV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    const handleSubmit =async (e) => {
    e.preventDefault();
    if (!validate()) {
      return false;
    }
      else{
        const response = await axios.post('https://assessments-xhy0.onrender.com/api-docs/upload-file', formData);
    console.log(response.data.fileUrl);
console.log("Form submitted", formData);
navigate('/StatementPurpose');
      }

    
  };
    












  return (
    <div>
<div>
  <h2 className="text-xl font-semibold mb-4">Document Collection</h2>
        <form  className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">Document Collection</h2>

      {[
        { label: "Class 10 Marksheet*", name: "class10", required: true },
        { label: "Class 12 Marksheet*", name: "class12", required: true },
        { label: "Graduation Marksheet*", name: "graduation", required: true },
        { label: "Post Graduation Marksheet", name: "postGraduation" },
        { label: "Resume/CV*", name: "resume", required: true },
        { label: "Recommendation Letter", name: "recommendation" },
        { label: "Salary Slips", name: "salarySlips" },
        { label: "Others", name: "others" },
      ].map(({ label, name, required }) => (
        <div key={name}>
          <label className="block font-medium mb-1">{label}</label>
          <input
            type="file"
            name={name}
            onChange={handleFileChange}
            className="w-full border p-2 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white"
          />
          {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name]}</p>}
        </div>
      ))}
      
       <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-6  py-2 rounded hover:bg-blue-700">
        Next
      </button>
      </form>
</div>






    </div>
  )
}
