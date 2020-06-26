import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import ProfileUser from './pages/ProfileUser';
import ProfileAdmin from './pages/ProfileAdmin';
import ListarAparelho from './pages/ListarAparelho';
import CadastrarAparelho from './pages/CadastrarAparelho';
import CadastrarTreino from './pages/CadastrarTreino';
import ListarTreino from './pages/ListarTreino';
import ListarUsuario from './pages/ListarUsuario';



import IniciarTreino from './pages/IniciarTreino';
import HistoricoTreino from './pages/HistoricoTreino';
import GerarPagamento from './pages/GerarPagamento';


export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profileuser" component={ProfileUser} />
                <Route path="/profileadmin" component={ProfileAdmin} />
                <Route path="/cadastraraparelho" component={CadastrarAparelho} />
                <Route path="/cadastrartreino" component={CadastrarTreino} />
                <Route path="/listartreino" component={ListarTreino} />
                <Route path="/listaraparelho" component={ListarAparelho} />
                <Route path="/listarusuario" component={ListarUsuario} />
                <Route path="/historicotreino" component={HistoricoTreino} />
                
                <Route path="/iniciartreino" component={IniciarTreino} />
                <Route path="/gerarpagamento" component={GerarPagamento} />
                
            </Switch>
        </BrowserRouter>
    )
    
}