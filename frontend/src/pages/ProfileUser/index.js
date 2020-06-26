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
    const history = useHistory();
    const idUsuario = localStorage.getItem('idUsuario');
    const email = localStorage.getItem('email'); 
    const [totalizadores, setTotalizadores] = useState([]);

    useEffect(() =>{
      console.log(idUsuario);
      api.get('economiaUser', {
          headers:{
              Authorization: idUsuario,
          }
      }).then(response => {
        console.log("resposta")
        console.log(response.data)
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
            <Link className="button" to="/iniciartreino">Iniciar novo Treino</Link>
            <Link className="button" to="/historicotreino">Histórico de Treinos</Link>
            <Link className="button" to="/gerarpagamento">Gerar Pagamento</Link>

            <h1> 
            <strong>Total economizada de energia pelo Usuário até o momento:   
              <br />
                {Intl.NumberFormat('pt-BR', 
                { style: 'currency', currency: 'BRL'}).format(totalizadores)}
            </strong>
            </h1>
            </body>
        </div>
    );
}
