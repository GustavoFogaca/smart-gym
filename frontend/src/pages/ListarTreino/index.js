import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/smart-logo.svg';
import {FiPower} from 'react-icons/fi'
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';


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
    const [treinos, setTreinos] = useState([]);

    const history = useHistory();
    const idUsuario = localStorage.getItem('idUsuario');
    const email = localStorage.getItem('email'); 
    
    
  
    
    useEffect(() =>{
        api.get('treinos', {
            headers:{
                Authorization: idUsuario,
            }
        }).then(response => {
          setTreinos(response.data);
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
                <Link className="button" to="/cadastrartreino">Cadastrar Treinos</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Treinos cadatrados:</h1>
            <ul>
                {treinos.map(treino => (
                    <li key={treino.idTreino}>
                    <strong>{treino.nomeTreino}</strong>
                    <strong>Duração: {treino.duracaoTreino} minutos.</strong>
                    <strong>Energia Gerada:   
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(treino.valorEnergiaGerada)}
                    </strong>
                    
                    
                </li>   
                ))}
                    
            </ul>
           
        </div>
    );
}
