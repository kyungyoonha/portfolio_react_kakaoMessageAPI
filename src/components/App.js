import React from 'react';
import { Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header';
import NavProductPage from './NavProductPage';
import NavBuyerPage from './NavBuyerPage';
import NavOrderPage from './NavOrderPage'; 
import NavOrderFormPage from './NavOrderFormPage';
import ModalDetail from './modalPage/ModalDetail';
import ModalSendProduct from './modalPage/ModalSendProduct';
import ModalSelectOrder from './modalPage/ModalSelectOrder';
import ModalSendOrder from './modalPage/ModalSendOrder';

import history from '../history';

const App = () => {
    const { verified } = useSelector(state => state.auth);
    const RouteIf = ({ auth, component: Component, ...rest}) => {
        return(
            <Route 
                {...rest}
                render={props => {
                    if (!auth){
                        return <h2>접근 권한이 없습니다. 로그인해주세요</h2>
                    }

                    if (Component){
                        return <Component {...props} />
                    }
                }}
            />
        )
    }

    return(
        <div className="ui grid container">
            <Router history={history}>
                <div>
                    <Header />
                    <RouteIf auth={verified} path="/" exact component={NavProductPage} />
                    <RouteIf auth={verified} path="/product" exact component={NavProductPage} />
                    <RouteIf auth={verified} path="/product/send/:id" exact component={ModalSendProduct} />
                    <RouteIf auth={verified} path="/product/detail/:id" exact component={ModalDetail} />

                    <RouteIf auth={verified} path="/order" exact component={NavOrderPage} />
                    <RouteIf auth={verified} path="/order/send/:id" exact component={ModalSendOrder} />
                    <RouteIf auth={verified} path="/order/detail/:id" exact component={ModalDetail} />
                    <RouteIf auth={verified} path="/order/select/:id" exact component={ModalSelectOrder} />
                    <RouteIf auth={verified} path="/order/form/:id" exact component={NavOrderFormPage} />
                    
                    <RouteIf auth={verified} path="/buyer" exact component={NavBuyerPage} />
                </div>
            </Router>
        </div>
    );
};

export default App;

// <td><img src="https://drive.google.com/uc?export=download&id=1kU66r8-2HTPkecWRfSwSnQ5RqGZSB5Ub" style={{ height: '40px'}} alt="fe" /></td>
// https://drive.google.com/open?id=1kU66r8-2HTPkecWRfSwSnQ5RqGZSB5Ub
// https://drive.google.com/uc?export=download&id=1kU66r8-2HTPkecWRfSwSnQ5RqGZSB5Ub