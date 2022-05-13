import React, { useState, useEffect } from "react";
import axios from './Axios';
import '../Css/DashBoard.css';
import Swal from 'sweetalert2';

function DashBoard(props) {
    const [applicants, setApplicants] = useState([])
    const [currentTitle, setCurrentTitle] = useState('')
    const [updateCount, setUpdateCount] = useState(0)
    const jobs = ["Front-End Developer", "Node.js Developer", "MEAN Stack Developer", "FULL Stack Developer"]

    useEffect(() => {
        axios.get('/users/application-forms')
            .then((response) => {
                const result = response.data
                const newApplicants = result.filter((e) => {
                    return (e.status === 'applied')
                })
                setApplicants(newApplicants)
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: `${err.message}`
                })
            })
    }, [updateCount])

    const handelViewDetails = (id) => {
        axios.get(`/users/application-form/${id}`)
            .then((response) => {
                const result = response.data
                Swal.fire({
                    icon: 'info',
                    title: `${result.name} Profile`,
                    html: (
                        `Contact Number: ${result.phone},
                    Email: ${result.email},
                    Skills: ${result.skills},
                    Experience: ${result.experience}.`
                    )
                })
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: `${err.message}`
                })
            })
    }

    function statusHandle(id, status) {
        Swal.fire({
            title: 'Confirm',
            icon: 'warning',
            text: `Are you sure to ${status.status}`,
            type: 'confirm',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: status.status,
            cancelButtonText: 'Cancel'
        }).then((isConfirm) => {
            if (isConfirm.value) {
                axios.put(`/users/application-form/update/${id}`, status)
                    .then((response) => {
                        response.data && setUpdateCount(updateCount + 1)
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: 'Error',
                            icon: 'error',
                            text: `${err.message}`
                        })
                    })
            }
        })
    }

    const selected = applicants.filter((e) => {
        return e.jobTitle === currentTitle
    })
    return (
        <div className="dash">
            <h1 className='dtitle'>Admin Dashboard</h1>
            {jobs.map((e) => {
                return <button key={e} className="jobTitles" onClick={() => { setCurrentTitle(e) }}>{e}</button>
            })}
            <h1 className='currentTitle'>{currentTitle}</h1>
            {currentTitle && selected.length > 0 && <p className='currentdata'>List of candidates applied for {currentTitle} job.</p>}
            {currentTitle && selected.length > 0 &&
                <table className="customers">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selected.map((ele) => {

                            return (
                                <tr key={ele._id}>
                                    <td>{ele.name}</td>
                                    <td>{ele.skills}</td>
                                    <td>{ele.experience}</td>
                                    <td>{ele.createdAt.slice(0, 10).split("-").reverse().join("-")}</td>
                                    <td><button key='view' onClick={() => { handelViewDetails(ele._id) }} className="viewdetails">View Details</button></td>
                                    <td><button key='shortdetails' onClick={() => { statusHandle(ele._id, { status: "shortlisted" }) }} className="shortlist">ShortList</button>  <button key='reject' onClick={() => { statusHandle(ele._id, { status: "rejected" }) }} className="reject">Reject</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
            {currentTitle && selected.length === 0 && <p className='currentdata'>{currentTitle} no candidates applied for job</p>}
        </div>
    )
}
export default DashBoard
