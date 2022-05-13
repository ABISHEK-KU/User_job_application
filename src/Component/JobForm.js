import React, { useState } from "react";
import axios from './Axios';
import '../Css/JobForm.css'

function JobForm(props) {
    const jobTitles = ["Front-End Developer", "Node.js Developer", "MEAN Stack Developer", "FULL Stack Developer"]
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [contact, setContact] = useState('')
    const [job, setJob] = useState('')
    const [experience, setExperience] = useState('')
    const [skill, setSkill] = useState('')

    function handelChange(e) {
        const data = e.target.value
        console.log(e.target.name, data)
        if (e.target.name === 'fullname') {
            setName(data)
        } else if (e.target.name === 'mail') {
            setMail(data)
        } else if (e.target.name === 'contact') {
            setContact(data)
        } else if (e.target.name === 'job') {
            setJob(data)
        } else if (e.target.name === 'experience') {
            setExperience(data)
        } else if (e.target.name === 'skills') {
            setSkill(data)
        }
    }

    function handelSubmit(e) {
        e.preventDefault()
        const formData = {
            'name': name,
            'email': mail,
            'phone': contact,
            'skills': skill,
            'jobTitle': job,
            'experience': experience
        }
        console.log(formData)
        axios.post('/users/application-form', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.errors)
                } else {
                    alert('successfully uploaded your application')
                }
            })
            .catch((err) => {
                alert(err.message)
            })
        setName('')
        setMail('')
        setContact('')
        setJob('')
        setExperience('')
        setSkill('')
    }

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <label>Full Name</label>
                <input type='text' name='fullname' value={name} placeholder="Your name.." onChange={handelChange} />
                <hr />
                <label>Email</label>
                <input type='text' name='mail' value={mail} placeholder="example@email.com" onChange={handelChange} />
                <hr />
                <label>Contact Number</label>
                <input type='number' name='contact' value={contact} placeholder="+91 9988776655" onChange={handelChange} />
                <hr />
                <label>Applying For Job</label>
                <select name='job' value={job} onChange={handelChange}>
                    <option value=''>----select----</option>
                    {jobTitles.map((e) => {
                        return <option key={e} value={e}>{e}</option>
                    })}
                </select>
                <hr />
                <label>Experience</label>
                <input type='text' value={experience} name='experience' placeholder="Experience(2year 3months)" onChange={handelChange} />
                <hr />
                <label>Technical Skills</label>
                <textarea name='skills' value={skill} placeholder="Technical Skills" onChange={handelChange}></textarea>
                <input type='submit' value='Send Application' />
            </form>
        </div>
    )
}
export default JobForm