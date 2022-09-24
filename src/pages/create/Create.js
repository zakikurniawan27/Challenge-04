import React from "react";
import { BiBook } from 'react-icons/bi'
import { FiArrowLeft } from 'react-icons/fi'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";


const Create = () =>{
    const [id] = useState('')
    const [tugas, setTugas] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    
    const handleCreate = async() =>{
        try {
            const res = await axios({
                method:'POST',
                url:'http://localhost:3001/todo',
                data:{
                    id: id,
                    task: tugas,
                    complete: false
                }
            })
            setTugas(res.data.id)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async() =>{
        try {
            await axios({
                method:'PUT',
                url:`http://localhost:3001/todo/${params.id}`,
                data:{
                    task: tugas
                }
            })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const handleGetEdit = async() =>{
        try {
            const res = await axios({
                method:'GET',
                url:`http://localhost:3001/todo/${params.id}`
            })
            setTugas(res.data.task)
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(() =>{
        if(params.id){
            handleGetEdit()
        }
    }, [params.id])

    return (
        <div className="bg-white h-screen text-black">
            <h1 className="text-center text-lg font-bold">TodoInput</h1>
            <div className="border-solid border border-gray-300 rounded mx-40 my-2">
                <div className="form-control">
                    <div className="input-group mt-5 ml-5">
                    <button className="btn btn-square bg-cyan-500 border-cyan-500" onClick={() => handleCreate()}>
                        <BiBook className="text-lg text-white"/>
                    </button>
                    <input type="text" placeholder="Input/Edit Todo" 
                        className="input input-bordered bg-white border-solid border-2 border-gray-300 basis-11/12"
                        value={tugas} onChange={(e) => setTugas(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row">
                   {params.id ? (
                    <button type='submit' 
                        className='btn btn-info text-white mt-4 ml-5 mb-3 basis-[95.7142857%]'
                        onClick={() => handleEdit()}
                    >
                        submit update
                    </button>
                   ):(
                    <button type='submit' 
                        className='btn btn-info text-white mt-4 ml-5 mb-3 basis-[95.7142857%]'
                        onClick={() => {tugas ? (
                            handleCreate()
                        ):(
                            alert('Data harap di inputkan')
                        )}}
                    >
                        submit
                    </button>
                   )}
                </div>
            </div>
            <button className="btn btn-ghost ml-40"
                onClick={() => navigate('/')}>
                <FiArrowLeft className="mr-2"/> Back</button>
        </div>
    )
}

export default Create