import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './Calendar.css'

const Calendar = () => {
    const [showapp, setShowapp] = useState([])

    const [appointment, setAppoint] = useState({
        procName: '',
        petName: '',
        date: '',
        appID: '',
        userID: '',
        status: ''
    });

    const navigate = useNavigate()

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:3009/calendar`); // Replace with your API endpoint
                setShowapp(response.data);
            } catch (error) {
                console.error('Error fetching to do list:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleChange = (e) => {
        setAppoint({ ...appointment, [e.target.name]: e.target.value });
    };
    const handleCheck = async (e) => {
        e.preventDefault();

        try {
            const updatedAppointment = { ...appointment, status: !appointment.status ? '' : 'completed' };
            await axios.put(`http://localhost:3009/appointment/:appid`, appointment); // Replace with your API endpoint
            console.log("app" + appointment);
            navigate("/calendar")
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeDate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3009/calendar`, appointment); // Replace with your API endpoint
            navigate("/calendar")
            console.log("app" + appointment);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = async (e) => {
        navigate("/calendar")
    }
    return (
        <div className="Today">
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>To Do List</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <main>
            {showapp.map(app => (

                    <div className="appointment" key={app.appID}>
                        {app.userID && <h2>{app.procName}</h2>}
                        <span>for {app.petName}</span>
                        <div className="changing-box">
                            <input type='date' name="date" onChange={handleChange} />
                            <div class="CancelAndSubmit">
                                <button id="cancel" class="button" onClick={handleClick}>Cancel</button>
                                <button id="submit" class="button" type="submit" name="submit"
                                    onClick={handleChangeDate}>Save Changes</button>
                                <div class='checkbox-wrapper-31'><input type='checkbox' checked={appointment.status === 'complete'} onClick={handleCheck} /><svg viewBox='0 0 35.6 35.6'><circle class='background' cx='17.8' cy='17.8' r='17.8'></circle><circle class='stroke' cx='17.8' cy='17.8' r='14.37'></circle><polyline class='check' points='11.78 18.12 15.55 22.23 25.17 12.87'></polyline></svg></div>

                            </div>
                        </div>
                    </div>

                ))}
                <div className="changing-box">
                    <input type='date' name="date" onChange={handleChange} />
                    <div class="CancelAndSubmit">
                        <button id="cancel" class="button" onClick={handleClick}>Cancel</button>
                        <button id="submit" class="button" type="submit" name="submit"
                            onClick={handleChangeDate}>Save Changes</button>
                        <div class='checkbox-wrapper-31'><input type='checkbox' checked={appointment.status === 'complete'} onClick={handleCheck} /><svg viewBox='0 0 35.6 35.6'><circle class='background' cx='17.8' cy='17.8' r='17.8'></circle><circle class='stroke' cx='17.8' cy='17.8' r='14.37'></circle><polyline class='check' points='11.78 18.12 15.55 22.23 25.17 12.87'></polyline></svg></div>

                    </div>
                </div>
            </main>
            <nav class="navigate">
                <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                <Link to="/home"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
            </nav>
        </div>
    )
}

export default Calendar;