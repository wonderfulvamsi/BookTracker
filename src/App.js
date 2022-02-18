import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import HighlightsList from "./components/highlights-list.component";
import EditHighlight from "./components/edit-highlight.component";
import CreateHighlight from "./components/create-highlight.component";
import CreateBook from "./components/create-book.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={HighlightsList} />
      <Route path="/edit/:id" component={EditHighlight} />
      <Route path="/create" component={CreateHighlight} />
      <Route path="/book" component={CreateBook} />
      </div>
    </Router>
  );
}

export default App;
