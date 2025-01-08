import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../Components/NAVbAR/NavBar';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure leaflet CSS is imported
import './dashboard.css'

const Dashboard = () => {
  const users = [
    { _id: '67690c36da8ebce58c1d3aaf', name: 'shamal' },
    { _id: '67690c36da8ebce58c1d3aaf', name: 'Ahamed' },
    { _id: '67690c36da8ebce58c1d3aaf', name: 'Chameera' },
    { _id: '67690c36da8ebce58c1d3aaf', name: 'Dasun' },
    { _id: '67690c36da8ebce58c1d3aaf', name: 'Navaneedan'},
  
  ];

  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [locations, setLocations] = useState([]);

  // Handle filter submission
  const handleFilter = async () => {
    if (!selectedUserId || !selectedDate) {
      alert('Please select a user and a date.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/filter-locations', {
        params: {
          userId: selectedUserId,
          date: selectedDate,
        },
      });

      setLocations(response.data.locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      alert('Failed to fetch locations. Please try again.');
    }
  };

  // Sort locations by timestamp to ensure the path is drawn in correct order
  const sortedLocations = [...locations].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div>
      <NavBar />
      <h1 className="dashboard-heading">View Executive Daily Route</h1>
<div className="form-section">
  <div className="form-group">
    <label className="form-label">Select Executive:</label>
    <select
      className="form-select"
      value={selectedUserId}
      onChange={(e) => setSelectedUserId(e.target.value)}
    >
      <option value="">-- Select a User --</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </select>
  </div>
  <div className="form-group">
    <label className="form-label">Select Date:</label>
    <input
      className="form-input"
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  </div>
  <button className="form-button" onClick={handleFilter}>
    Apply Filter
  </button>
</div>
<h2 className="results-heading">Map View:</h2>


      {locations.length > 0 ? (
        <table>
          {/* <thead>
            <tr>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Timestamp</th>
            </tr>
          </thead> */}
          {/* <tbody>
            {locations.map((location) => (
              <tr key={location._id}>
                <td>{location.latitude}</td>
                <td>{location.longitude}</td>
                <td>{new Date(location.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      ) : (
        <p>No locations found for the selected user and date.</p>
      )}

      {/* Map */}
      {locations.length > 0 && (
        <MapContainer
          center={[locations[0].latitude, locations[0].longitude]}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Markers and Polyline */}
          {sortedLocations.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                <strong>Latitude:</strong> {location.latitude} <br />
                <strong>Longitude:</strong> {location.longitude} <br />
                <strong>Timestamp:</strong> {new Date(location.timestamp).toLocaleString()}
              </Popup>
            </Marker>
          ))}

          {/* Polyline to connect the markers */}
          <Polyline
            positions={sortedLocations.map((location) => [
              location.latitude,
              location.longitude,
            ])}
            color="blue"
            weight={4}
          />
        </MapContainer>
      )}
    </div>
  );
};

export default Dashboard;
