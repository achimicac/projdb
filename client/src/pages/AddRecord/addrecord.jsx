import React from 'react';
import { useState } from 'react';
import '../AddRecord/styleaddrecord.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

const Addrecord = () => {

    const navigate = useNavigate();
    const { petid } = useParams();

    const [pet, setPet] = useState({
      procName: "",
      date: "",
      petType: "",
      forGender: "",
    });

    const [file, setFile] = useState(null)
    axios.defaults.withCredentials = true;


    const handleChange = (e) => {
        const { name , value, files } = e.target;

        if (name === 'petPfp') {
            const reader = new FileReader();
            const file = files[0];

            reader.onloadend = () => {
                setPet({
                    ...pet,
                    [name]: {
                        file,
                        dataUrl: reader.result,
                    },
                });
            };
            if (file) {
                reader.readAsDataURL(file);
            } 
        } else {
            setPet({
                ...pet,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            procName: pet.procName,
            date: pet.date,
            petType: pet.petType,
            forGender: pet.forGender,
        };
        console.log(data)
        
        try{
            const respet = await axios.post("http://localhost:3009/petprofile/${petid}/record/addrecord", data, {
                withCredentials: true,
            })
            if(respet.data.status === "error") {
                alert(respet.data.error)
            } else {
                alert(respet.data.success)
                navigate(`/petprofile/${petid}/record`)
            }
        }
        catch(err){console.error(err)}
    }

    return (
        <div className='addpetrecord'>
        <Helmet>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Add Pet Record</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
            <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
        </Helmet>
        <div class="back">
                <a href="/home"><Link to='/home'><i class="fa-solid fa-chevron-left fa-3x"></i></Link></a>
        </div>
        
        <main>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div class="textinfo">
                    <label for="name">Record</label>
                    <input id="name" type="text" placeholder="Name" name="petName" value={pet.petName} onChange={ handleChange }/>

                    <label for="DoB">Date:</label>
                    <input id="DoB" type="date" name="petDoB" value={pet.petDoB} onChange={ handleChange }/>
                    <div class="CancelAndSubmit">
                        <button id="cancel" class="button">Cancel</button>
                        <button id="submit" className="button" type="submit" name="submit" variant="primary">Submit</button>
                    </div>
                </div>
            </form>
        </main>

        <nav class="navigate">
            <Link to="/articles"><a href="/articles"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
            <Link to="/home"><a href="/home"><i class="fa-solid fa-house fa-2x"></i></a></Link>
            <Link to="/calendar"><a href="/calendar"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
        </nav>
        </div>
    )
}

export default Addrecord;