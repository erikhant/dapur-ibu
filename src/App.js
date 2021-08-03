import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer } from './parts/Footer';

import { Navbar } from "./parts/Navbar";
import { Article } from './pages/Article';
import { ArticleDetail } from './pages/ArticleDetail';
import { Homepage } from './pages/Homepage';
import { Recipe } from './pages/Recipe';
import { RecipeDetail } from './pages/RecipeDetail';
import { View } from './pages/View';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/resep">
            <Recipe />
          </Route>
          <Route exact path="/artikel">
            <Article />
          </Route>
          <Route exact path="/resep/:key">
            <RecipeDetail />
          </Route>
          <Route path="/artikel/:tag/:key">
            <ArticleDetail />
          </Route>
          <Route path="/resep/kategori/:key">
            <View />
          </Route>
          <Route path="/search/:que">
            <View />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
