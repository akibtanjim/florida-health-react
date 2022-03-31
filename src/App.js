'use strict';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import PageNotFound from './pages/PageNotFound';
import Details from './pages/Details';

function App() {
  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/facilities/:slug" element={<Details />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}
export default App;
