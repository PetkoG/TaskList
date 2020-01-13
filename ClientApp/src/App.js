import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Tree from './components/Tree';
import FormContainer from './components/FormContainer';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/tasks' component={Tree} />
        <Route path='/addTask' component={FormContainer} />
    </Layout>
);
