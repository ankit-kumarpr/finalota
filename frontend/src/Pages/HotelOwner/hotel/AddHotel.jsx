import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import BASE_URL from "../../../config";
import { getAuthToken, getUserData } from "../../../utils/authUtils";
import "./addhotel.css";

const AddHotel = () => {
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState({
    hotelName: "",
    GST: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHotelData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    const token = getAuthToken();
    const userData = getUserData();

    if (!token) {
      toast.error("Please login first!");
      navigate("/");
      return;
    }

    if (userData.role !== "hotelowner") {
      toast.error("Only hotel owners can add hotels!");
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("hotelName", hotelData.hotelName);
      formData.append("GST", hotelData.GST);
      formData.append("street", hotelData.street);
      formData.append("city", hotelData.city);
      formData.append("state", hotelData.state);
      formData.append("pincode", hotelData.pincode);
      formData.append("landmark", hotelData.landmark);
      formData.append("ownerId", userData.userId);

      if (hotelData.image) {
        formData.append("image", hotelData.image);
      }

      const response = await axios.post(`${BASE_URL}/hotel/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Hotel added successfully:", response.data);

      toast.success("Hotel added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form
      setHotelData({
        hotelName: "",
        GST: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        image: null,
      });

      // Navigate back to dashboard
      setTimeout(() => {
        navigate("/hotelowner-dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast.error(error.response?.data?.message || "Failed to add hotel!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-hotel-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Add New Hotel</h3>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/hotelowner-dashboard")}
                >
                  Back to Dashboard
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="hotelName">Hotel Name *</label>
                        <input
                          type="text"
                          id="hotelName"
                          name="hotelName"
                          className="form-control"
                          value={hotelData.hotelName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="GST">GST Number *</label>
                        <input
                          type="text"
                          id="GST"
                          name="GST"
                          className="form-control"
                          value={hotelData.GST}
                          onChange={handleInputChange}
                          placeholder="22AAAAA0000A1Z5"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="street">Street Address *</label>
                    <textarea
                      id="street"
                      name="street"
                      className="form-control"
                      rows="3"
                      value={hotelData.street}
                      onChange={handleInputChange}
                      placeholder="Enter complete street address"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="form-control"
                          value={hotelData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="state">State *</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className="form-control"
                          value={hotelData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="pincode">Pincode *</label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          className="form-control"
                          value={hotelData.pincode}
                          onChange={handleInputChange}
                          pattern="[0-9]{6}"
                          title="Please enter 6 digit pincode"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="landmark">Landmark</label>
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      className="form-control"
                      value={hotelData.landmark}
                      onChange={handleInputChange}
                      placeholder="Nearby landmark (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Hotel Image *</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                    <small className="form-text text-muted">
                      Upload a clear image of your hotel (JPG, PNG, GIF)
                    </small>
                    {hotelData.image && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(hotelData.image)}
                          alt="Preview"
                          style={{
                            maxWidth: "200px",
                            maxHeight: "150px",
                            objectFit: "cover",
                          }}
                          className="img-thumbnail"
                        />
                      </div>
                    )}
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Adding Hotel..." : "Add Hotel"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={() => navigate("/hotelowner-dashboard")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotel;
