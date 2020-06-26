import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {FiPlus} from 'react-icons/fi'



export default function RegisterProduct(){
    const [nomeTreino, setNomeTreino] = useState('');
    const [duracaoTreino, setDuracaoTreino] = useState('');
    const [valorEnergiaGerada, setValorEnergiaGerada] = useState('');
    const [selectValue, setSelectValue] = useState('');  

    const idUsuario = localStorage.getItem('idUsuario');
    const [aparelhos, setAparelhos] = useState([]);
    const [aparelhoAgrup, setAparelhoAgrup] = useState([]);
    

    const history = useHistory();

        
    useEffect(() =>{
        api.get('aparelhos', {
            headers:{
                Authorization: idUsuario,
            }
        }).then(response => {
            setAparelhos(response.data);
        })
    }, [idUsuario]);

    function handleAdd(e) {
        e.preventDefault()
        console.log(selectValue);
        if (selectValue != 1){
            var idx = aparelhoAgrup.indexOf(selectValue);
            if(idx == -1){
                console.log(idx);
                aparelhoAgrup.push(selectValue);
                console.log(aparelhoAgrup);
                }
            else{
                alert("Aparelho já está incluso no treino!")  
            }
        }
        
        alert(selectValue)  
    }
    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            nomeTreino,
            duracaoTreino,
            valorEnergiaGerada,
            aparelhoAgrup

        };
        try {   
            const response = await api.post('treinos', data, {
                headers:{
                    Authorization: idUsuario,
                }
            });

            if (response.data == true){
                alert(`Treino já foi Cadastrado.`);
                
            }
            else{
                alert(`Treino Cadastrado com sucesso! Você será redirecionado a tela inicial.`);
                history.push('/profileAdmin');
            }

        } catch (error) {
            alert('Erro durante o cadastro do Treino!');
            
        }
        
    }
    return(
        <div className="register-product-container">
            <div className="content">
                
                <form onSubmit={handleRegister}>


                <Link className="button" to="/profileAdmin">Home</Link>
                <Link className="button" to="/cadastraraparelho">Cadastrar Aparelhos</Link>

                    <h1>CADASTRO TREINOS</h1>
      
                    <input placeholder="Nome do Treino:" 
                    value={nomeTreino}
                    onChange={e => setNomeTreino(e.target.value)}
                    />


                    <input placeholder="Duração Treino (minutos)"  type="number"
                    value={duracaoTreino}
                    onChange={e => setDuracaoTreino(e.target.value)}
                    />
                    
                    <input placeholder="Energia Gerada (R$):" 
                    value={valorEnergiaGerada}
                    onChange={e => setValorEnergiaGerada(e.target.value)}
                    />
                    
 
                    <div>
                        <select className="button" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                        <option value="" disabled>Selecione o Aparelho:</option>
                        
                        {
                        aparelhos.map(function(aparelho) {
                        return <option key={aparelho.idAparelho} 
                        value={aparelho.idAparelho}>{aparelho.nomeAparelho}</option>;
                        })
                        }
                    </select>
                    
                    <button classname="button" onClick={handleAdd} type="button" >
                    ADICIONAR
                    </button>

                    </div>

                    <button className="buttonRegisterKit" type="submit">Cadastrar Treino</button>                   
                </form>
                
            </div>
        </div>
    )
}