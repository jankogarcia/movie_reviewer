import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './hoc/layout';
import Home from './components/Home/home';
import Movie from './components/Movies/movie';

const Routes = () => {
    return(
        <Layout>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/movie/:id' exact component={Movie} />
            </Switch>
        </Layout>
    );
};

export default Routes;