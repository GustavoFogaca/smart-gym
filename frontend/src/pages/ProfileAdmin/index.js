import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/smart-logo.svg';
import api from '../../services/api';





export default function Profile(){
    const history = useHistory();
    const idUsuario = localStorage.getItem('idUsuario');
    const email = localStorage.getItem('email'); 
    const [totalizadores, setTotalizadores] = useState([]);
    

    
    useEffect(() =>{
      api.get('economiaAdmin', {
          headers:{
              Authorization: idUsuario,
          }
      }).then(response => {
        console.log("resposta")
        let totalizador = response.data;
        totalizador = totalizador[0];
        totalizador = totalizador['SUM(valorEnergiaGerada)'];
        setTotalizadores(totalizador);
      })
  }, [idUsuario]);

  function handleLogout() {
      localStorage.clear()
      history.push('/')    
    }


    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem vindo(a), {email}!</span>

                <button onClick={handleLogout} type="button">
                    Logout
                </button>
            </header>
            <body>
            <Link className="button" to="/cadastraraparelho">Cadastrar Aparelhos</Link>
            <Link className="button" to="/listaraparelho">Listar Aparelhos</Link>
            <Link className="button" to="/cadastrartreino">Cadastrar Treinos</Link>
            <Link className="button" to="/listartreino">Listar Treinos</Link>
            <Link className="button" to="/listarusuario">Listar Usuarios</Link>

            <h1> 
            <strong>Total economizada de energia até o momento:   
              <br />
                {Intl.NumberFormat('pt-BR', 
                { style: 'currency', currency: 'BRL'}).format(totalizadores)}
            </strong>
            </h1>
            </body>
        </div>
    );
}
