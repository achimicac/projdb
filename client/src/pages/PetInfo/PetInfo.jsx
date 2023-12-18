import React, { useEffect } from 'react';
import { useState } from 'react';
import './PetInfo.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";


const PetInfo = () => {
    const navigate = useNavigate();

    const {petid} = useParams();
        function filterTable() {
        /*const dropdown = document.querySelector("#status");
        let selectValue = dropdown.value;
        const table = document.querySelector("#vaccine-table");
        let rows = table.getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
            let row = rows[i];
            let status = row.cells[0].className;

            if (selectValue === "all" || status === selectValue) {
                row.style.display = "";
            }
            else {
                row.style.display = "none";
            }
        }*/
    }


    // State for the second set of data
    const [pets, setPet] = useState([]);
    const [vaccines, setVaccine] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        // Fetch data from the first path
        const fetchPet = async () => {
            try {
                const response = await axios.get(`http://localhost:3009/petprofile/${petid}`);
                
                setPet(response.data);
            } catch (error) {
                console.error('Error fetching pet data:', error);
            }
        };

        // Fetch data from the second path
        const fetchVaccine = async () => {
            try {
                const response = await axios.get(`http://localhost:3009/petprofile/27/vaccine`);
                setVaccine(response.data);
            } catch (error) {
                console.error('Error fetching vaccine data:', error);
            }
        };

        // Call the functions to fetch data when the component mounts
        fetchPet();
        fetchVaccine();
    }, []);


    return (
        <div className="petInfo">
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Your pet's information</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            
            <body>
                {pets.map(pet => (

                    <div className="Tnfo" key={pet.petID}>
                        {pet.petID && <img src={pet.petpfp} />}
                        <div class="text">
                            <h1>{pet.petName}</h1>
                            <table>
                                <tr>
                                    <th>Type :</th>
                                    <td id="Type">{pet.petType}</td>
                                </tr>
                                <tr>
                                    <th>DoB :</th>
                                    <td id="DoB">{pet.showbd}</td>
                                </tr>
                                <tr>
                                    <th>Age :</th>
                                    <td id="Age">{pet.petAge}</td>
                                </tr>
                            </table>
                        </div>
                        <a href={`/petprofile/${pet.petID}/edit`}><i class="fa-solid fa-pen-to-square"></i></a>
                    </div>

                ))}

                <div class="vaccinelist">

                    <div class="HeaderVacc">
                        <h2>Vaccination</h2>
                        <form action="">
                            <div class="select" onChange={filterTable()}>
                                <select id="status" >
                                    <option value="all">All</option>
                                    <option value="info">info</option>
                                    <option value="success">success</option>
                                    <option value="danger">danger</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    {vaccines.map(vaccine => (
                        <table id="vaccine-table" key={vaccine.vacID}>
                            <tr>
                                <th>Vaccine</th>
                                <th>Status</th>
                            </tr>
                            {(() => {
                                if (vaccine.status === 'success') {
                                    return (
                                        <tr key={vaccine.vacID} className="Completed">
                                            <td>{vaccine.vacName}</td>
                                            {/*<td>{vaccine.disease}</td>*/}
                                            <td> Completeed </td>
                                        </tr>
                                    );
                                } else if (vaccine.status === 'info') {
                                    return (
                                        <tr key={vaccine.vacID} className="Incomplete">
                                            <td>{vaccine.vacName}</td>
                                            {/*<td>{vaccine.disease}</td>*/}
                                            <td> Incomplete </td>
                                        </tr>
                                    );
                                } else if (vaccine.status === 'danger') {
                                    return (
                                        <tr key={vaccine.vacID} className="ongoing">
                                            <td>{vaccine.vacName}</td>
                                            {/*<td>{vaccine.disease}</td>*/}
                                            <td> Next </td>
                                        </tr>
                                    );
                                } else {
                                    return null; // Handle other cases or provide a default
                                }
                            })()}
                        </table>
                    ))}


                    <a href={`/petprofile/${pets.petID}/record`}><i class="fa-solid fa-book-medical fa-4x"></i></a>
                </div>
            </body>
            <nav className="navigate">
                <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                <Link to="/home"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
            </nav>
        </div>
    )
}

export default PetInfo;