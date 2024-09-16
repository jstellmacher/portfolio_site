import React, { useState } from 'react';
import { FaCalculator, FaClock, FaDollarSign } from 'react-icons/fa';
import { BsArrowLeftRight } from 'react-icons/bs';

const HourlySalary = () => {
  const [hourlyRate, setHourlyRate] = useState('');
  const [annualSalary, setAnnualSalary] = useState('');
  const [isHourlyToAnnual, setIsHourlyToAnnual] = useState(true);

  const handleConversion = () => {
    if (isHourlyToAnnual) {
      const salary = hourlyRate * 40 * 52;
      setAnnualSalary(salary.toFixed(2));
    } else {
      const hourly = annualSalary / 52 / 40;
      setHourlyRate(hourly.toFixed(2));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        <FaCalculator className="inline-block mr-2" />
        Salary Converter
      </h1>
      <div className="flex items-center justify-center mb-4">
        <span className={`mr-2 ${isHourlyToAnnual ? 'font-bold' : ''} text-gray-700`}>Hourly</span>
        <button
          onClick={() => setIsHourlyToAnnual(!isHourlyToAnnual)}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <BsArrowLeftRight />
        </button>
        <span className={`ml-2 ${!isHourlyToAnnual ? 'font-bold' : ''} text-gray-700`}>Annual</span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 font-semibold">
          {isHourlyToAnnual ? (
            <>
              <FaClock className="inline-block mr-2" />
              Hourly Rate:
            </>
          ) : (
            <>
              <FaDollarSign className="inline-block mr-2" />
              Annual Salary:
            </>
          )}
        </label>
        <input
          type="number"
          value={isHourlyToAnnual ? hourlyRate : annualSalary}
          onChange={(e) => isHourlyToAnnual ? setHourlyRate(e.target.value) : setAnnualSalary(e.target.value)}
          className="w-full p-2 border rounded text-gray-800"
          placeholder={isHourlyToAnnual ? "Enter hourly rate" : "Enter annual salary"}
        />
      </div>
      <button
        onClick={handleConversion}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Convert
      </button>
      {(isHourlyToAnnual ? annualSalary : hourlyRate) && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2 text-gray-800">Result:</h2>
          <p className="text-gray-700">
            {isHourlyToAnnual
              ? `$${hourlyRate}/hour = $${annualSalary}/year`
              : `$${annualSalary}/year = $${hourlyRate}/hour`}
          </p>
          <h3 className="font-bold mt-4 mb-2 text-gray-800">Calculation:</h3>
          <p className="text-gray-700">
            {isHourlyToAnnual
              ? `$${hourlyRate} × 40 hours/week × 52 weeks/year = $${annualSalary}/year`
              : `$${annualSalary} ÷ 52 weeks/year ÷ 40 hours/week = $${hourlyRate}/hour`}
          </p>
        </div>
      )}
    </div>
  );
};

export default HourlySalary;
