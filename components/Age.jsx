import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [age, setAge] = useState(null);

  const calculateAge = (e) => {
    e.preventDefault();
    
    if (!birthDate) return;

    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      const daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays += daysInLastMonth;
      ageMonths--;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Age Calculator</h2>
      <form onSubmit={calculateAge} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="birthdate">
            Enter your birthdate:
          </label>
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            dateFormat="MMMM d, yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Select your birthdate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Calculate Age
          </button>
        </div>
      </form>
      {age && (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Your age is:</h3>
          <p className="text-lg text-gray-800">
            {age.years} years, {age.months} months, and {age.days} days
          </p>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;