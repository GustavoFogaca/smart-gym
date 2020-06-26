import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function RegisterProduct(){
    const [nomeAparelho, setNomeAparelho] = useState('');
    const [modelo, setModelo] = useState('');
    const [consumoEnergia, setConsumoEnergia] = useState('');
    
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            nomeAparelho,
            modelo,  
            consumoEnergia,

        };
        try {
            console.log("called product post");
            console.log(data);
            const response = await api.post('aparelhos', data);
           
            if (response.data == true){
                alert(`Aparelho já está cadastrado!.`);
                
            }
            else{
                console.log(response.data);
                alert(`Aparelho Cadastrado com sucesso!`);
                history.push('/profileadmin');
            }

        } catch (error) {
            alert('Erro durante o cadastro do Aparelho!');
            
        }
        
    }
    return(
        <div className="register-product-container">
            <div className="content">
                <form onSubmit={handleRegister}>
                <Link className="button" to="ProfileAdmin">Home</Link>
                <Link className="button" to="/listaraparelho">Listagem de Aparelhos</Link>
                

                    <h1>CADASTRO DE APARELHOS</h1>
      
                    <input placeholder="Nome do Aparelho" 
                    value={nomeAparelho}
                    onChange={e => setNomeAparelho(e.target.value)}
                    />


                    <input placeholder="Modelo do Aparelho"
                    value={modelo}
                    onChange={e => setModelo(e.target.value)}
                    />
          

                    <input placeholder="Consumo de Energia" type="number" 
                    value={consumoEnergia}
                    onChange={e => setConsumoEnergia(e.target.value)}
                    />
                    <button className="buttonRegisterProducer" type="submit">Cadastrar</button>                   
                </form>
                
            </div>
        </div>
    )
}