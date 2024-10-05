import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { differenceInDays, format, parse, isValid } from 'date-fns';
import { FaTrash, FaPlus } from 'react-icons/fa';

const BirthdayCountdown = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    const savedBirthdays = Cookies.get('birthdays');
    if (savedBirthdays) {
      setBirthdays(JSON.parse(savedBirthdays));
    }
  }, []);

  useEffect(() => {
    Cookies.set('birthdays', JSON.stringify(birthdays), { expires: 365 });
  }, [birthdays]);

  const addBirthday = () => {
    if (newTitle && newDate) {
      const parsedDate = parse(newDate, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) {
        const newBirthday = { title: newTitle, date: newDate };
        setBirthdays([...birthdays, newBirthday]);
        setNewTitle('');
        setNewDate('');
      } else {
        alert('Please enter a valid date');
      }
    }
  };

  const removeBirthday = (index) => {
    const updatedBirthdays = birthdays.filter((_, i) => i !== index);
    setBirthdays(updatedBirthdays);
  };

  const calculateDaysUntil = (birthdayDate) => {
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
    
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    return differenceInDays(nextBirthday, today);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Birthday Countdown</h1>
      
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Birthday Title"
          className="flex-grow p-2 border rounded text-gray-700"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="p-2 border rounded text-gray-700"
        />
        <button
          onClick={addBirthday}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300"
        >
          <FaPlus />
        </button>
      </div>

      <div className="space-y-4">
        {birthdays.map((birthday, index) => {
          const birthdayDate = parse(birthday.date, 'yyyy-MM-dd', new Date());
          const daysUntil = calculateDaysUntil(birthdayDate);
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{birthday.title}</h2>
                <p className="text-gray-600">{format(birthdayDate, 'MMMM d, yyyy')}</p>
                <p className="text-gray-700 font-bold">
                  {daysUntil === 0
                    ? "It's today!"
                    : `${daysUntil} day${daysUntil !== 1 ? 's' : ''} until birthday`}
                </p>
              </div>
              <button
                onClick={() => removeBirthday(index)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                <FaTrash />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BirthdayCountdown;