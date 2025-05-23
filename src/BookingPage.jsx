import React, { useState } from 'react';
import './BookingPage.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BookingPage() {
  const [region, setRegion] = useState('');
  const [property, setProperty] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    contact: '',
    email: '',
    date: '',
    time: '',
  });

  const buildingOptions = {
    Johannesburg: ['Arteria Parktown', 'Crescent Studios', 'Horizon Heights', 'Kingsway Place', 'Richmond Central', 'The Richmond', 'Apex Studios'],
    'Cape Town': ['Peak Studios'],
    Pretoria: ['Varsity Studios', 'Festivals Edge', 'Brooklyn Studios', 'Studios@Burnett', 'Hatfield Studios', 'Fountains View'],
  };

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRoom) {
      alert('Please select a room type.');
      return;
    }
    alert(`Booking submitted for room type "${selectedRoom}"! Confirmation will be sent via Email & WhatsApp.`);
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
        {/* Region and Building */}
        <div className="form-group">
          <label>Select your Region*</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} required>
            <option value="" disabled>Select a region</option>
            <option value="Johannesburg">Johannesburg</option>
            <option value="Cape Town">Cape Town</option>
            <option value="Pretoria">Pretoria</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select your Building*</label>
          <select value={property} onChange={(e) => setProperty(e.target.value)} required>
            <option value="" disabled>Select a building</option>
            {region &&
              buildingOptions[region].map((building) => (
                <option key={building} value={building}>{building}</option>
              ))}
          </select>
        </div>

        {/* Room Type Carousel */}
        <div className="form-group full-width">
          <label>Select Room Type*</label>
          <Slider {...sliderSettings}>
            {roomTypes.map((room, idx) => (
              <div
                className={`carousel-card ${selectedRoom === room.name ? 'selected' : ''}`}
                key={idx}
                onClick={() => setSelectedRoom(room.name)}
              >
                <h3>{room.name}</h3>
                <p>Currently viewing: {room.views}</p>
                <button type="button">MORE INFO</button>
              </div>
            ))}
          </Slider>
        </div>

        {/* User Info */}
        <div className="form-group">
          <label>First Name*</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Surname*</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Contact No.*</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Select Date*</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Select Time*</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>

        <div className="form-group full-width">
          <button type="submit">Book Viewing</button>
        </div>
      </form>
    </div>
  );
}