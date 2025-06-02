import React, { useState } from 'react';
import './BookingPage.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HelpBot from './HelpBot';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingPage() {
  const [region, setRegion] = useState('');
  const [property, setProperty] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Date and time as Date objects
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    contact: '',
    email: '',
    date: null,
    time: null,
  });

  const buildingOptions = {
    Johannesburg: ['Arteria Parktown', 'Crescent Studios', 'Horizon Heights', 'Kingsway Place', 'Richmond Central', 'The Richmond', 'Apex Studios'],
    'Cape Town': ['Peak Studios'],
    Pretoria: ['Varsity Studios', 'Festivals Edge', 'Brooklyn Studios', 'Studios@Burnett', 'Hatfield Studios', 'Fountains View'],
  };

  const regionOptions = [
    { value: 'Johannesburg', label: 'Johannesburg' },
    { value: 'Cape Town', label: 'Cape Town' },
    { value: 'Pretoria', label: 'Pretoria' },
  ];

  const getPropertyOptions = (region) =>
    buildingOptions[region]?.map((building) => ({
      value: building,
      label: building,
    })) || [];

  const roomTypes = [
    { name: 'Premium Single Duo', views: 13 },
    { name: 'Cluster- Sharing Room', views: 346 },
    { name: 'Cluster-Single Room', views: 176 },
    { name: 'Premium Studio', views: 26 },
    { name: 'Single Duo Room', views: 45 },
    { name: 'Single Quad Room', views: 247 },
    { name: 'Deluxe Studio ', views: 16 },
    { name: 'Single Trio Room', views: 118 },
    { name: 'Deluxe Single Duo Room', views: 36 },
    { name: 'Premium Single Duo Room', views: 13 },
    { name: 'Cluster Sharing Room', views: 346 },
  ];

  const buildingRoomTypes = {
    'Arteria Parktown': ['Premium Single Duo', 'Cluster- Sharing Room'],
    'Crescent Studios': ['Cluster-Single Room', 'Premium Studio'],
    'Horizon Heights': ['Single Duo Room'],
    'Kingsway Place': ['Single Quad Room'],
    'Richmond Central': ['Deluxe Studio '],
    'The Richmond': ['Single Trio Room'],
    'Apex Studios': ['Deluxe Single Duo Room'],
    'Peak Studios': ['Premium Single Duo Room'],
    'Varsity Studios': ['Cluster Sharing Room'],
    'Festivals Edge': ['Premium Single Duo', 'Deluxe Studio '],
    'Brooklyn Studios': ['Single Duo Room'],
    'Studios@Burnett': ['Cluster Sharing Room'],
    'Hatfield Studios': ['Deluxe Single Duo Room'],
    'Fountains View': ['Premium Studio'],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRoom) {
      alert('Please select a room type.');
      return;
    }
    if (!formData.date) {
      alert('Please select a date.');
      return;
    }
    if (!formData.time) {
      alert('Please select a time.');
      return;
    }

    const dateString = formData.date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeString = formData.time.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    alert(`Booking submitted for room type "${selectedRoom}" on ${dateString} at ${timeString}! Confirmation will be sent via Email & WhatsApp.`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="booking-container">
      <h1>Book a Viewing</h1>
      <hr />

      <form onSubmit={handleSubmit} className="booking-form-2col">

        {/* Region and Building Selection */}
        <div className="form-group" data-help-section="region-selection">
          <label>Select your Region*</label>
          <Select
            options={regionOptions}
            value={regionOptions.find((opt) => opt.value === region)}
            onChange={(selectedOption) => {
              setRegion(selectedOption.value);
              setProperty('');
              setSelectedRoom(null);
            }}
            placeholder="Select a region"
            styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
            required
          />
        </div>

        <div className="form-group" data-help-section="building-selection">
          <label>Select your Building*</label>
          <Select
            options={getPropertyOptions(region)}
            value={getPropertyOptions(region).find((opt) => opt.value === property)}
            onChange={(selectedOption) => {
              setProperty(selectedOption.value);
              setSelectedRoom(null);
            }}
            placeholder="Select a building"
            isDisabled={!region}
            styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
            required
          />
        </div>

        {/* Room Carousel */}
        <div className="form-group full-width" data-help-section="room-carousel">
          <label>Select Room Type*</label>
          {property ? (
            <Slider {...sliderSettings}>
              {(buildingRoomTypes[property] || []).map((roomName, idx) => {
                const room = roomTypes.find((r) => r.name === roomName);
                return (
                  <div
                    className={`carousel-card ${selectedRoom === room.name ? 'selected' : ''}`}
                    key={idx}
                    onClick={() => setSelectedRoom(room.name)}
                  >
                    <h3>{room.name}</h3>
                    <p>Currently viewing: {room.views}</p>
                    <button type="button">MORE INFO</button>
                  </div>
                );
              })}
            </Slider>
          ) : (
            <p>Please select a building to view room types.</p>
          )}
        </div>

        {/* User Info Fields */}
        <div className="form-group" data-help-section="name">
          <label>First Name*</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group" data-help-section="surname">
          <label>Surname*</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </div>

        <div className="form-group" data-help-section="contact">
          <label>Contact No.*</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>

        <div className="form-group" data-help-section="email">
          <label>Email*</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Date and Time Picker */}
        <div className="form-group" data-help-section="date">
          <label>Select Date*</label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            placeholderText="Select a date"
            required
          />
        </div>

        <div className="form-group" data-help-section="time">
          <label>Select Time*</label>
          <DatePicker
            selected={formData.time}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Select a time"
            required
          />
        </div>

        <div className="form-group full-width" data-help-section="submit">
          <button type="submit">Book Viewing</button>
        </div>
      </form>

      {/* HelpBot Component */}
      <HelpBot />
    </div>
  );
}
