import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Rating } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import '../APIUrl.js';

function FeedBack() {
    const userName = sessionStorage.getItem('user_name');
    
    const feedbackId = Math.floor(Math.random() * 100000);
    const [email, setEmail] = useState(userName);
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [submit, setSubmit] = useState(true);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!description.trim()) {
            errors.description = "Description is required";
            isValid = false;
        }

        if (rating === 0) {
            errors.rating = "Rating is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const feedback = { feedbackId, email, description, rating };
            try {
                const response = await axios.post(global.APIUrl+"/feedback/addfeedback", feedback);
                Swal.fire({
                    title: "Success!",
                    text: "Feedback submitted successfully",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                });                
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } catch (error) {
                console.log(error.message);                
                Swal.fire({
                    title: "Error!",
                    text: "Failed to submit feedback",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                });
                setTimeout(() => {
                    window.location.href = "/FeedBack";
                }, 1000);
            }
        }
    };

    useEffect(() => {
        setSubmit(!validateForm());
    }, [description, rating]);

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "40%" }}>
                    <h3 style={{ marginTop: '40px' }}>Make Your FeedBack</h3>
                    <div className="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    disabled
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={errors.description}
                                    helperText={errors.description}
                                    multiline
                                    rows={4}
                                />
                                <Typography component="legend">Rate your experience:</Typography>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                    size="large"
                                    error={errors.rating}
                                />
                                {errors.rating && <Typography variant="body2" color="error">{errors.rating}</Typography>}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={submit}
                                    sx={{ mt: 2 }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </div>
                </div>
            </center>
            <Footer />
        </div>
    );
}

export default FeedBack;
