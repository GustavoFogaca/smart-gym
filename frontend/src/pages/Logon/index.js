import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/smart-logo.svg';
import api from '../../services/api'

export default function Logon() {
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const history = useHistory();



    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            email,
            senha,
        };
        try {
                const response = await api.post('sessoes', data);
                
                if(response.data == null){
                    alert('Email ou senha incorreta!')
                }
                else{    
                    localStorage.setItem('idUsuario', response.data[0].idUsuario);
                    localStorage.setItem('email', response.data[0].email);
                    if(response.data[0].admin == 0){
                        history.push('/profileuser');
                    }
                    else{
                        history.push('/profileadmin');
                    }
                    
                }
             
        } catch (error) {
            alert('Falha no login Usuário, tente novamente.')
        }
        }
    
    return(
        <div className="logon-container">
            <img classname="logo" src={logoImg} alt="Smart-Gym"/>
            <section className="form">
                
                <form onSubmit={handleLogin}>
                    <input placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <br/>
                    <input placeholder="Senha"
                    type="password" 
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />  
                    <button className="buttonLogin" type="submit">Entrar</button>
                    <Link className="back-link-client" to="/register">
                    Registro
                    </Link>
                </form>
            </section>
        </div>
    )
}