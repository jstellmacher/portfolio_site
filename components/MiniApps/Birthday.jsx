/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
// import { gapi } from 'gapi-script'; // Comment out the gapi import
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Birthday = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [newBirthday, setNewBirthday] = useState({ name: '', date: null });
  const [useGoogleCalendar, setUseGoogleCalendar] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Comment out the gapi initialization and usage
  useEffect(() => {
    // const initClient = () => {
    //   gapi.client.init({
    //     apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    //     clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    //     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    //     scope: 'https://www.googleapis.com/auth/calendar.events',
    //   }).then(() => {
    //     loadBirthdays();
    //   });
    // };
    // initClient();
    // Commenting out loading birthdays on mount
    // loadBirthdays();
  }, []);

  const loadBirthdays = () => {
    // Comment out the Google API call
    // gapi.client.calendar.events.list({
    //   'calendarId': 'primary',
    //   'timeMin': (new Date()).toISOString(),
    //   'showDeleted': false,
    //   'singleEvents': true,
    //   'maxResults': 250,
    //   'orderBy': 'startTime'
    // }).then(response => {
    //   const events = response.result.items;
    //   const birthdayEvents = events.filter(event => event.summary.includes('Birthday'));
    //   setBirthdays(birthdayEvents);
    // });
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateForStorage = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0];
  };

  const addBirthday = () => {
    if (editingIndex !== null) {
      updateBirthday();
    } else {
      if (useGoogleCalendar) {
        // Comment out the Google Calendar API call
        // const event = {
        //   'summary': `${newBirthday.name}&apos;s Birthday`,
        //   'start': {
        //     'date': formatDateForStorage(newBirthday.date),
        //     'timeZone': 'UTC'
        //   },
        //   'end': {
        //     'date': formatDateForStorage(newBirthday.date),
        //     'timeZone': 'UTC'
        //   },
        //   'recurrence': ['RRULE:FREQ=YEARLY'],
        // };

        // gapi.client.calendar.events.insert({
        //   'calendarId': 'primary',
        //   'resource': event
        // }).then(() => {
        //   loadBirthdays();
        //   setNewBirthday({ name: '', date: null });
        //   setEditingIndex(null);
        // });
      } else {
        const newBirthdayEvent = {
          summary: `${newBirthday.name}'s Birthday`,
          start: { date: formatDateForStorage(newBirthday.date) },
          end: { date: formatDateForStorage(newBirthday.date) },
        };
        const updatedBirthdays = [...birthdays, newBirthdayEvent];
        setBirthdays(updatedBirthdays);
        localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
        setNewBirthday({ name: '', date: null });
        setEditingIndex(null);
      }
    }
  };

  const updateBirthday = () => {
    if (useGoogleCalendar) {
      // Comment out the Google Calendar API call
      // const event = birthdays[editingIndex];
      // event.summary = `${newBirthday.name}'s Birthday`;
      // event.start.date = formatDateForStorage(newBirthday.date);
      // event.end.date = formatDateForStorage(newBirthday.date);

      // gapi.client.calendar.events.update({
      //   calendarId: 'primary',
      //   eventId: event.id,
      //   resource: event,
      // }).then(() => {
      //   loadBirthdays();
      //   setNewBirthday({ name: '', date: null });
      //   setEditingIndex(null);
      // });
    } else {
      const updatedBirthdays = [...birthdays];
      updatedBirthdays[editingIndex] = {
        summary: `${newBirthday.name}'s Birthday`,
        start: { date: formatDateForStorage(newBirthday.date) },
        end: { date: formatDateForStorage(newBirthday.date) },
      };
      setBirthdays(updatedBirthdays);
      localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
      setNewBirthday({ name: '', date: null });
      setEditingIndex(null);
    }
  };

  const deleteBirthday = (index) => {
    if (useGoogleCalendar) {
      // Comment out the Google Calendar API call
      // const event = birthdays[index];
      // gapi.client.calendar.events.delete({
      //   calendarId: 'primary',
      //   eventId: event.id,
      // }).then(() => {
      //   loadBirthdays();
      // });
    } else {
      const updatedBirthdays = birthdays.filter((_, i) => i !== index);
      setBirthdays(updatedBirthdays);
      localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
    }
  };

  const editBirthday = (index) => {
    const birthday = birthdays[index];
    setNewBirthday({
      name: birthday.summary.replace("&apos;s Birthday", ''),      
      date: new Date(birthday.start.date),
    });
    setEditingIndex(index);
  };

  return (
    <div className="bg-gray-800 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Friends' Birthdays</h2>
      <ul className="mb-4 space-y-4">
        {birthdays.map((birthday, index) => (
          <li key={index} className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{birthday.summary.replace("'s Birthday", '')}</span>
              <div>
                <button onClick={() => editBirthday(index)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteBirthday(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
              </div>
            </div>
            <div className="bg-white text-gray-800 rounded-lg shadow-md p-3">
              <span className="text-lg font-medium">{formatDate(birthday.start.date)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Friend's name"
          value={newBirthday.name}
          onChange={(e) => setNewBirthday({ ...newBirthday, name: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <DatePicker
          selected={newBirthday.date}
          onChange={(date) => setNewBirthday({ ...newBirthday, date })}
          dateFormat="MMMM d, yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          placeholderText="Select birthday"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button 
          onClick={addBirthday}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingIndex !== null ? 'Update Birthday' : 'Add Birthday'}
        </button>
      </div>
      {!useGoogleCalendar && (
        <p className="text-sm text-gray-400">Note to self for when you update the app: Birthdays are currently stored locally. Set up Google Calendar for cloud storage.</p>
      )}
    </div>
  );
};

export default Birthday;