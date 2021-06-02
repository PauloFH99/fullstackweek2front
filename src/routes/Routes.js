import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CadastrarInvestimentos from '../pages/CadastrarInvestimento';
import ListarInvestimentos from '../pages/ListarInvestimentos';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ListarInvestimentos}/>
                <Route exact path="/cadastrar-investimento" component={CadastrarInvestimentos}/>
                <Route exact path="/listar-investimentos" component={ListarInvestimentos}/>
            </Switch>
        </BrowserRouter>
    );
}