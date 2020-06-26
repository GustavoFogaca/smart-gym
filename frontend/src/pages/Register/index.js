import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/smart-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function RegisterClient(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [telefone, setTelefone] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            email,
            senha,
            cpf,
            altura,
            peso,
            telefone
        };

        try {
            console.log(email);
            const response = await api.post('usuarios', data);

            if (response.data == true){
                alert(`Email ou CPF já está cadastrado!.`);                
            }else{
                alert(`Usuário Cadastrado com sucesso!`);
                history.push('/');
            }
        } catch (error) {
            alert('Erro durante o cadastro do Usuario!');
        }
        
    }
    return(
        <div className="logon-container">
            
            <img classname="logo" src={logoImg} alt="Smart-Gym"/>
            <section className="form">
                
                <form onSubmit={handleRegister}>
                <h1>REGISTRO</h1>
                    <input placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <br/>
                    <input placeholder="CPF" 
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    />
                    <br/>
                    <input placeholder="Altura" 
                    value={altura}
                    onChange={e => setAltura(e.target.value)}
                    />
                    <br/>
                    <input placeholder="Peso" 
                    value={peso}
                    onChange={e => setPeso(e.target.value)}
                    />
                    <br/>
                    <input placeholder="Telefone" 
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    />
                    <br/>
                    <input placeholder="Senha"
                    type="password" 
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />  
                    <button className="buttonLogin" type="submit">Registrar</button>
                    <Link className="back-link-client" to="/">
                    Voltar
                    </Link>
                </form>
            </section>
        </div>
    )
}