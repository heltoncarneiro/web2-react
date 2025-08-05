import React, { useState } from 'react';
import {  Link, useLocation } from "react-router-dom";
//import clickPrincipal from '../events';


export default function Inserir(){

    const [posts, setPosts] = useState([]);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const location = useLocation()
    

    async function clickInsert(){
   
        await fetch('http://127.0.0.1:3000/api/users', {
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
               //setPosts((posts) => [data, ...posts]);
               setPosts(data);
               setName('');
            })
            .catch((err) => {
               console.log(err.message);
            });       
    }

    //Recebe o evento do formulário
    const handleSubmit = (e) => {
        
         clickInsert();
     };    

    return (
        <>
        <form onSubmit={handleSubmit}>
            Nome:
            <input type="text" value={name} 
                onChange={(e) => setName(e.target.value)} ></input>
                <br/>
            <button type="submit">Cadastrar</button>
            {/* <button><Link to="/">Voltar</Link></button>*/}
            </form>
         <Link to="/" >Voltar</Link>
         </> 
    );
}