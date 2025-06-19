import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
export default function StatementPurpose() {
const navigate=useNavigate();
 const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
  });

  const [errors, setErrors] = useState({});

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (countWords(value) <= 300) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required.';
      } else if (countWords(value) > 300) {
        newErrors[key] = 'Answer must not exceed 300 words.';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!validate()) {
      
      return false;
    }else{
        const response = await axios.post('https://assessments-xhy0.onrender.com/api-docs/submit', formData,{
          headers:{
            'Content-Type':'application/json',
          },
        });
      console.log('Response:', response.data);
      console.log('Submitted Data:', formData);
      navigate('/InterviewAvailblity')
    }
  };



  return (
    <div className=''>
       <form  className="space-y-6 p-6  rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-white">Statement of Purpose</h2>

      {[
        {
          name: 'q1',
          label: '1. Tell me about a time you were asked to do something you had never done before. How did you react? What did you learn?',
        },
        {
          name: 'q2',
          label: '2. Tell me about the last time something significant didn’t go according to plan at work. What was your role? What was the outcome?',
        },
        {
          name: 'q3',
          label: '3. What are the three things that are most important to you in a job?',
        },
      ].map(({ name, label }) => (
        <div key={name}>
          <label className="block font-semibold mb-2 text-white">{label}</label>
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            rows={6}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your answer here (Max 300 words)"
          />
          <div className="text-sm text-gray-500 mt-1">
            Word count: {countWords(formData[name])}/300
          </div>
          {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
        </div>
      ))}

    
        <button
        type="submit" onClick={handleSubmit}
        className="px-6 py-2 ml-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
       Next
      </button>
    </form>
    </div>
  )
}
