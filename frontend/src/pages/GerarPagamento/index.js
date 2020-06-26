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
    const mensalidade = 100;
    const [totalizadores, setTotalizadores] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [cpf, setCpf] = useState();
    

    useEffect(() =>{
      console.log(idUsuario);
      api.get('economiaUser', {
          headers:{
              Authorization: idUsuario,
          }
      }).then(response => {
        let totalizador = response.data;
        totalizador = totalizador[0];
        totalizador = totalizador['SUM(valorEnergiaGerada)'];
        if(totalizador > 30){
          console.log(totalizador);
          totalizador = 30;
        }
        console.log(totalizador);
        setTotalizadores(totalizador);
      })
  }, [idUsuario]);

useEffect(() =>{
    api.get('usuarios', {
        headers:{
            Authorization: idUsuario,
        }
    }).then(response => {
      let cpf = response.data;
      cpf = cpf[0];
      cpf = cpf['cpf'];
      setCpf(cpf);
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

                <Link className="button" to="/profileuser">Home</Link>
                <button onClick={handleLogout} type="button">
                    Logout
                </button>
                
            </header>
            <body>
            
<br />
<br />
<br />

<br />
<br />
<br />


            <h1> 
            <strong>Valores para efetuar Pagamento:</strong>
              <br />
              <strong>Email: {email}</strong>
              <br />
              <strong>CPF: {cpf}</strong>
              <br />
              <strong>Mensalidade:</strong>
              {Intl.NumberFormat('pt-BR', 
                { style: 'currency', currency: 'BRL'}).format(mensalidade)}
              <br />
              
              <strong>Valor total de desconto (Max. 30%):</strong>
              
                {Intl.NumberFormat('pt-BR', 
                { style: 'currency', currency: 'BRL'}).format(mensalidade - totalizadores)}
            
            </h1>
            </body>
        </div>
    );
}
