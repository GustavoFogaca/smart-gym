import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/smart-logo.svg';
import {FiPower} from 'react-icons/fi'
import {FiShoppingCart} from 'react-icons/fi'
import {FiMaximize2} from 'react-icons/fi'
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Profile(){
    const [usuarios, setUsuarios] = useState([]);

    const history = useHistory();
    const idUsuario = localStorage.getItem('idUsuario');
    const email = localStorage.getItem('email'); 
    
    
  
    
    useEffect(() =>{
        api.get('usufull', {
            headers:{
                Authorization: idUsuario,
            }
        }).then(response => {
          setUsuarios(response.data);
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
                <Link className="button" to="ProfileAdmin">Home</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Usuarios Cadastrados:</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.idUsuario}>
                    <strong>{usuario.email}</strong>
                    <strong>CPF: {usuario.cpf}</strong>
                    <strong>Altura: {usuario.altura}</strong>
                    <strong>Peso: {usuario.peso}</strong>
                    <strong>Telefone: {usuario.telefone}</strong>
                    
                </li>   
                ))}    
            </ul>
           
        </div>
    );
}

