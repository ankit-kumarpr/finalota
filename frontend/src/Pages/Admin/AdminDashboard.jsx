import React from 'react';
import './admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Admin Dashboard</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="info-box">
                      <span className="info-box-icon bg-primary">
                        <i className="fas fa-hotel"></i>
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Total Hotels</span>
                        <span className="info-box-number">0</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-box">
                      <span className="info-box-icon bg-success">
                        <i className="fas fa-users"></i>
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Hotel Owners</span>
                        <span className="info-box-number">0</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-box">
                      <span className="info-box-icon bg-warning">
                        <i className="fas fa-calendar-check"></i>
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Total Bookings</span>
                        <span className="info-box-number">0</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-box">
                      <span className="info-box-icon bg-info">
                        <i className="fas fa-chart-line"></i>
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Revenue</span>
                        <span className="info-box-number">₹0</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row mt-4">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">
                        <h5>Recent Hotel Registrations</h5>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Hotel Name</th>
                                <th>Owner</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan="5" className="text-center text-muted">
                                  No hotels registered yet
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-header">
                        <h5>Quick Actions</h5>
                      </div>
                      <div className="card-body">
                        <div className="list-group">
                          <a href="#" className="list-group-item list-group-item-action">
                            <i className="fas fa-plus me-2"></i>
                            Add New Admin
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <i className="fas fa-hotel me-2"></i>
                            Manage Hotels
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <i className="fas fa-users me-2"></i>
                            View All Users
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <i className="fas fa-chart-bar me-2"></i>
                            Generate Reports
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <i className="fas fa-cog me-2"></i>
                            System Settings
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5>System Overview</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <h6>Platform Statistics</h6>
                            <ul className="list-unstyled">
                              <li><i className="fas fa-check text-success me-2"></i>Total Hotels: 0</li>
                              <li><i className="fas fa-check text-success me-2"></i>Active Users: 0</li>
                              <li><i className="fas fa-check text-success me-2"></i>Total Bookings: 0</li>
                              <li><i className="fas fa-check text-success me-2"></i>Revenue Generated: ₹0</li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <h6>Recent Activity</h6>
                            <div className="activity-feed">
                              <div className="activity-item">
                                <i className="fas fa-info-circle text-info me-2"></i>
                                <span>System initialized successfully</span>
                                <small className="text-muted d-block">Just now</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
