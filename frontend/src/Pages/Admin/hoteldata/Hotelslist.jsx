import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../config';
import { getAuthToken } from '../../../utils/authUtils';
import { toast } from 'react-toastify';
import './hotelslist.css';

const Hotelslist = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const HotelList = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        setError('Please login first!');
        return;
      }

      const response = await axios.get(`${BASE_URL}/hotel/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("hotel list", response.data);
      setHotels(response.data.hotels || response.data || []);
      setError(null);
    } catch (error) {
  console.log(error);
      setError(error.response?.data?.message || 'Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    HotelList();
  }, []);

  // Filter hotels based on search term and status
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || hotel.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (hotelId) => {
    try {
      const token = getAuthToken();
      const response = await axios.patch(`${BASE_URL}/hotel/approve/${hotelId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      toast.success('Hotel approved successfully!');
      HotelList(); // Refresh the list
    } catch (error) {
      console.error('Error approving hotel:', error);
      toast.error('Failed to approve hotel');
    }
  };

  const handleReject = async (hotelId) => {
    try {
      const token = getAuthToken();
      const response = await axios.patch(`${BASE_URL}/hotel/reject/${hotelId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      toast.success('Hotel rejected successfully!');
      HotelList(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting hotel:', error);
      toast.error('Failed to reject hotel');
    }
  };

  if (loading) {
    return (
      <div className="hotels-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading hotels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hotels-list-container">
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={HotelList}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hotels-list-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="main-card">
              <div className="card-header">
                <div className="header-content">
                  <h3 className="card-title">
                    <i className="fas fa-hotel"></i>
                    Pending Hotels
                  </h3>
                  <div className="hotel-count">
                    <span className="count-number">{filteredHotels.length}</span>
                    <span className="count-label">Hotels</span>
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                {/* Search and Filter Section */}
                <div className="search-filter-section">
                  <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                      type="text"
                      placeholder="Search hotels by name, city, or state..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  
                  <div className="filter-section">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="status-filter"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {filteredHotels.length === 0 ? (
                  <div className="no-hotels">
                    <div className="no-hotels-icon">
                      <i className="fas fa-hotel"></i>
                    </div>
                    <h4>No Hotels Found</h4>
                    <p>
                      {searchTerm || statusFilter !== 'all' 
                        ? 'No hotels match your search criteria.' 
                        : 'No hotels are pending approval yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="hotels-grid">
                    {filteredHotels.map((hotel) => (
                      <div key={hotel._id} className="hotel-card">
                        <div className="hotel-image">
                          {hotel.image ? (
                            <img 
                              src={hotel.image} 
                              alt={hotel.hotelName}
                              className="hotel-img"
                            />
                          ) : (
                            <div className="no-image">
                              <i className="fas fa-hotel"></i>
                              <span>No Image</span>
                            </div>
                          )}
                          <div className="status-badge">
                            <span className={`status ${hotel.status || 'pending'}`}>
                              {hotel.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="hotel-content">
                          <div className="hotel-header">
                            <h4 className="hotel-name">{hotel.hotelName}</h4>
                            <div className="hotel-meta">
                              <span className="hotel-id">ID: {hotel._id.slice(-6)}</span>
                            </div>
                          </div>
                          
                          <div className="hotel-details">
                            <div className="detail-item">
                              <i className="fas fa-map-marker-alt"></i>
                              <span>{hotel.city}, {hotel.state}</span>
                            </div>
                            
                            <div className="detail-item">
                              <i className="fas fa-map-pin"></i>
                              <span>{hotel.pincode}</span>
                            </div>
                            
                            {hotel.GST && (
                              <div className="detail-item">
                                <i className="fas fa-receipt"></i>
                                <span>{hotel.GST}</span>
                              </div>
                            )}
                            
                            {hotel.landmark && (
                              <div className="detail-item">
                                <i className="fas fa-landmark"></i>
                                <span>{hotel.landmark}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="hotel-address">
                            <p>{hotel.street}</p>
                          </div>
                          
                          <div className="hotel-actions">
                            <button className="btn btn-primary btn-sm">
                              <i className="fas fa-eye"></i> View Details
                            </button>
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => handleApprove(hotel._id)}
                            >
                              <i className="fas fa-check"></i> Approve
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleReject(hotel._id)}
                            >
                              <i className="fas fa-times"></i> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotelslist;