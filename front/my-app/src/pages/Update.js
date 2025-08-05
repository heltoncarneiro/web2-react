import React, { useEffect, useState } from 'react';
import {  Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function Update(){

   const navigate = useNavigate();
   const location = useLocation()
   const [posts, setPosts] = useState([]);
   const [name, setName] = useState('');
   const{id} = location.state || {};


   async function clickUpdate(e){
   
        await fetch(`http://127.0.0.1:3000/api/users/edit/${id}`, {
            method: 'POST',
            body: JSON.stringify({
               name: name
            }),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((data) => {
               setPosts((posts) => [data, ...posts]);
               setName('');
            })
            .catch((err) => {
               console.log(err.message);
            }); 
                
    }

      
    const handleSubmit = (e) => {
           clickUpdate(name);
           navigate('/'); 
        };    

    async function carregaId(){
            if(id != null && name == '' && location.state!=null){
            await fetch(`http://127.0.0.1:3000/api/users/${id}`)
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                setName(data.name);
             }) 
             .catch((err) => {
                console.log(err.message);
             });
            }
     }  

   
    return (
        <div class="container" onLoad={carregaId()}>
            <form onSubmit={handleSubmit}>
            <div class="row">
                <div class="col-2">Nome</div>
                <div class="col-6">
                    <input type="text" class="form-control"  value={name} 
                        onChange={(e) => setName(e.target.value)} ></input></div>
                <div class="col-2"></div>
                <div class="col-2"></div>
                
            </div>
            <div class="row">
                <div class="col-2"><button type="submit">Alterar</button></div>
                <div class="col-2"><button><Link to="/">Voltar</Link></button></div>
                <div class="col-2"></div>
                <div class="col-2"></div>
                
            </div>
            </form>
        </div>
    );
}