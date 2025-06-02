import React, { useState } from 'react';
import './AdminSide.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [bookings, setBookings] = useState([
    { id: 1, name: 'John Doe', region: 'Pretoria', property: 'Hatfield Studios', status: 'Pending', notes: '' },
    { id: 2, name: 'Jane Smith', region: 'Johannesburg', property: 'Apex Studios', status: 'In Progress', notes: '' },
    { id: 3, name: 'Lerato Mokoena', region: 'Cape Town', property: 'Peak Studios', status: 'Completed', notes: '' },
    { id: 4, name: 'Sam Luthuli', region: 'Pretoria', property: 'Varsity Studios', status: 'Pending', notes: '' },
  ]);

  const [unavailableDates, setUnavailableDates] = useState([]);
  const [unavailableTimes, setUnavailableTimes] = useState({});

  const handleStatusChange = (id, status) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleNoteChange = (id, note) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, notes: note } : b))
    );
  };

  const newBookings = bookings.filter(b => b.status === 'Pending');

  return (
    <div className="booking-container">
      <h1>Viewing Schedule</h1>
      <hr />

     
      <div className="admin-tabs">
        <button onClick={() => setActiveTab('dashboard')}>📋 Scheduled Viewings</button>
        <button onClick={() => setActiveTab('unavailable')}>📆 Unavailable Times</button>
      </div>


      {activeTab === 'dashboard' && (
        <>
         
          <div className="form-group full-width">
            <h3 onClick={() => setShowNotifications(!showNotifications)} style={{ cursor: 'pointer' }}>
              🔔 Notifications {showNotifications ? '▲' : '▼'}
            </h3>

            {showNotifications && (
              <div className="notifications-list" style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
                {newBookings.length === 0 ? (
                  <p>No new bookings.</p>
                ) : (
                  <ul style={{ paddingLeft: '20px' }}>
                    {newBookings.map((b) => (
                      <li key={b.id}>
                        <strong>{b.name}</strong> booked at <em>{b.property}</em> ({b.region})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Calendar View */}
          <div className="form-group full-width">
            <h3>Select a Viewing Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="date-picker-input"
            />
          </div>

          {/* Booking Table */}
          <div className="form-group full-width">
            <h3>Viewing Bookings</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#ccc', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Name</th>
                  <th style={{ padding: '10px' }}>Region</th>
                  <th style={{ padding: '10px' }}>Property</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Update</th>
                  <th style={{ padding: '10px' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    style={{
                      borderBottom: '1px solid #ddd',
                      backgroundColor: b.status === 'Cancelled' ? '#ffe5e5' : 'transparent',
                    }}
                  >
                    <td style={{ padding: '10px' }}>{b.name}</td>
                    <td style={{ padding: '10px' }}>{b.region}</td>
                    <td style={{ padding: '10px' }}>{b.property}</td>
                    <td style={{ padding: '10px', color: b.status === 'Cancelled' ? 'red' : 'inherit' }}>
                      {b.status}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <select value={b.status} onChange={(e) => handleStatusChange(b.id, e.target.value)}>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <textarea
                        rows="2"
                        style={{ width: '100%', padding: '5px', borderRadius: '6px' }}
                        placeholder="Log notes..."
                        value={b.notes}
                        onChange={(e) => handleNoteChange(b.id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

     
{activeTab === 'unavailable' && (
  <div className="form-group full-width">
    <h3>Select Unavailable Dates</h3>
    <DatePicker
      selected={null}
      onChange={(date) => {
        const formatted = date.toDateString();
        if (!unavailableDates.includes(formatted)) {
          setUnavailableDates([...unavailableDates, formatted]);
        }
      }}
      dateFormat="MMMM d, yyyy"
      className="date-picker-input"
      placeholderText="Click to select date"
      inline
    />

    <h4>Set Time Slots (24hr format)</h4>
    {unavailableDates.map((date) => (
      <div key={date} style={{ marginBottom: '10px' }}>
        <strong>{date}</strong>
        <input
          type="text"
          placeholder="e.g. 09:00-11:00"
          onBlur={(e) => {
            const times = e.target.value;
            setUnavailableTimes(prev => ({ ...prev, [date]: times }));
          }}
          style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px' }}
          defaultValue={unavailableTimes[date] || ''}
        />
      </div>
    ))}

   
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={() => {
          // For now, just alert the saved data or send to API here
          alert(`Saved unavailable dates:\n${JSON.stringify({ unavailableDates, unavailableTimes }, null, 2)}`);
        }}
        style={{ marginRight: '10px', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
      >
        Save
      </button>
      <button
        onClick={() => {
          setUnavailableDates([]);
          setUnavailableTimes({});
        }}
        style={{ padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
      >
        Clear
      </button>
    </div>

    <hr />
    <h4>Unavailable Schedule</h4>
    <ul>
      {unavailableDates.map(date => (
        <li key={date}>
          {date} - {unavailableTimes[date] || 'No time set'}
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
}
