import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ApplicationPeriod.css';

const RoomSelection = () => {
  const location = useLocation();
  const selectedRegion = location.state?.region || '';

  const regionToBuildings = {
    "Pretoria": [
      "Apex Studios", "Brooklyn Studios", "Festival's Edge", "Fountains View", "Hatfield Studios",
      "Horizon Heights", "Kingsway Place", "Peak Studios", "Richmond Central", "Studios@Burnett",
      "The Richmond", "Varsity Studios"
    ],
    "Johannesburg": [
      "Arteria Parktown", "Crescent Studios"
    ]
    

   
    
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
    { name: "Sharing Room", views: 120 },
    { name: "Single Room", views: 90 },
    { name: "Sharing Ensuite", views: 80 },
    { name: "Large Sharing Room", views: 60 },
    { name: "Large Single Room", views: 70 },
  ];

  const buildingRoomTypes = {
    "Apex Studios": [
      "Studio", "Sharing ensuite", "Single Trio Room", "Single Quad Room", "Sharing Quad Room",
      "Deluxe Single Duo Room", "Sharing Paraplegic ensuite", "Single Duo Room"
    ],
    "Brooklyn Studios": [
      "Standard Studio", "Deluxe Studio", "Standard Single Duo", "Deluxe Single Duo",
      "Standard Single Trio", "Deluxe Single Trio", "Studio - Paraplegic"
    ],
    "Festival's Edge": [
      "Sharing Room", "Single Room", "Sharing Ensuite", "Large Sharing Room", "Large Single Room"
    ],
    "Fountains View": [
      "Paraplegic Single Duo Room", "Single Trio Room", "Cluster - Single Room", "Cluster - Sharing Room"
    ],
    "Hatfield Studios": [
      "Studio Plus", "Paraplegic Studio Plus", "Deluxe Studio (A - Block)", "Premium Studio (D - Block)"
    ],
    "Horizon Heights": [
      "Deluxe Studio", "Premium Studio", "Single Duo Room", "Deluxe Single Duo Room",
      "Premium Single Duo Room", "Single Trio Room", "Single Quad Room",
      "Cluster - Sharing room", "Cluster - Single Room"
    ],
    "Kingsway Place": [
      "Single Room"
    ],
    "Peak Studios": [
      "Studio", "Studio with view/balcony", "Deluxe Studio", "Sharing Duo Room",
      "Sharing Duo Room with view", "Deluxe Single Duo Room", "Single Trio Room",
      "Single Duo Room", "Single Duo Room with balcony", "Single Duo Room with view",
      "Paraplegic - Single Duo Room with view", "Paraplegic - Sharing Duo Room with balcony/view"
    ],
    "Richmond Central": [
      "Single Room", "Sharing Room"
    ],
    "Studios@Burnett": [
      "Studio", "Sharing Bunk Room", "Sharing Room", "Single Duo Room",
      "Sharing Bunk in 2 Bed Apartment", "Paraplegic Sharing unit", "Large Sharing Bunk Room"
    ],
    "The Richmond": [
      "Single Room", "Sharing Room"
    ],
    "Varsity Studios": [
      "The Solo", "The Solo Plus", "Dynamic Duo", "Dynamic Duo PLUS"
    ],
    "Arteria Parktown": [
      "Cluster Sharing (8 Bed)", "Deluxe Single Duo", "Deluxe Single Duo(Ground Floor)",
      "Deluxe Single Quad", "Deluxe Single Trio", "Paraplegic Deluxe Studio",
      "Premium Single Duo", "Premium Single Duo(Ground Floor)", "Premium Single Trio",
      "Sharing Quintet", "Single Duo Plus", "Single Duo Plus(Ground Floor)",
      "Single Trio", "Supreme Single Duo", "Supreme Single Duo Plus", "Supreme Single Trio"
    ],
    "Crescent Studios": [
      "Deluxe Single Duo", "Deluxe Single Duo Plus", "Deluxe Single Trio", "Deluxe Single Trio Plus",
      "Premium Single Duo", "Premium Single Trio", "Single Duo", "Single Trio",
      "Single Trio Plus", "Supreme Single Trio"
    ]
  };

  const [building, setBuilding] = useState('');
  const [leasePeriod, setLeasePeriod] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');

  useEffect(() => {
    const buildings = regionToBuildings[selectedRegion] || [];
    if (buildings.length) {
      setBuilding(buildings[0]);
      setSelectedRoomType('');
    }
  }, [selectedRegion]);

  const filteredRooms = roomTypes.filter((room) => {
    const buildingRooms = buildingRoomTypes[building] || [];
    const matchesBuilding = buildingRooms.includes(room.name);
    const matchesType = selectedRoomType ? room.name === selectedRoomType : true;
    return matchesBuilding && matchesType;
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="room-selection-container">
      <h2>Application Period</h2>

      <div className="form-group">
        <label>Select your Building*</label>
        <select
          value={building}
          onChange={(e) => {
            setBuilding(e.target.value);
            setSelectedRoomType('');
          }}
        >
          {(regionToBuildings[selectedRegion] || []).map((b, i) => (
            <option key={i} value={b}>{b}</option>
          ))}
        </select>
      </div>
       <div className="form-group">
        <label>Room Type</label>
        <select
          value={selectedRoomType}
          onChange={(e) => setSelectedRoomType(e.target.value)}
        >
          <option value="">Select Room Type</option>
          {buildingRoomTypes[building]?.map((room, i) => (
            <option key={i} value={room}>{room}</option>
          ))}
        </select>
      </div>


      <div className="form-group">
        <label>Lease Period</label>
        <select value={leasePeriod} onChange={(e) => setLeasePeriod(e.target.value)}>
          <option value="">Select Lease Period</option>
          <option>January - December</option>
          <option>July - December</option>
        </select>
      </div>

     
      <div className="carousel-wrapper">
        <Slider {...settings}>
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, i) => (
              <div key={i} className="slide-wrapper">
                <div className={`room-card ${room.views > 100 ? 'within' : 'outside'}`}>
                  <h4>{room.name}</h4>
                  <p>Currently viewing: {room.views}</p>
                  <span className="badge">
                    {room.views > 100 ? 'Within Affordability Range' : 'Outside Affordability Range'}
                  </span>
                  <button className="info-btn">More Info</button>
                </div>
              </div>
            ))
          ) : (
            <div className="slide-wrapper">
              <div className="room-card">
                <h4>No Available Rooms</h4>
                <p>Please check another building or join the waitlist below.</p>
              </div>
            </div>
          )}
        </Slider>
      </div>

      {filteredRooms.length === 0 && (
        <div className="alert-container">
          <div className="alert">No apartment available</div>
          <div className="warning">The selected building is currently full.</div>
          <p className="question">Would you like to join our waiting list?</p>
          <button className="yes-btn">YES PLEASE</button>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;
