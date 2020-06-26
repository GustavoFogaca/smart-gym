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
    const [aparelhos, setAparelhos] = useState([]);

    const history = useHistory();
    const idUsuario = localStorage.getItem('idUsuario');
    const email = localStorage.getItem('email'); 
    
    
  
    
    useEffect(() =>{
        api.get('aparelhos', {
            headers:{
                Authorization: idUsuario,
            }
        }).then(response => {
          console.log("resposta")
          setAparelhos(response.data);
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
                <Link className="button" to="/cadastraraparelho">Cadastrar Aparelho</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Aparelhos cadatrados:</h1>
            <ul>
                {aparelhos.map(aparelho => (
                    <li key={aparelho.idAparelho}>
                    <strong>{aparelho.nomeAparelho}</strong>
                    <strong>Modelo: {aparelho.modelo}</strong>
                    
                    
                    <strong>Consumo de Energia:   
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(aparelho.ConsumoEnergia)}
                    </strong>
                    
                </li>   
                ))}    
            </ul>
           
        </div>
    );
}
