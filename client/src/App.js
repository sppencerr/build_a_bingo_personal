import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import MegaMenu from "./components/MegaMenuNav";
import Footer from "./components/Footer";

import Explore from "./pages/Explore";

import Create from "./pages/Create";
import MyBingoLists from './pages/MyBingoLists';
import List from './components/BingoList/List';
import MyBingoCards from './pages/MyBingoCards';
import Card from './components/BingoCard/Card';

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import "./App.css";
import "./Bingo/Bingo";
import Game from "./Bingo/Bingo";
import "./Bingo/Bingo.css";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// list id for testing purposes only
const parentListId = "63b5f71b6d5c4f0f31c89700";

function App() {
  return (
    <div className="bg-gradient-to-br from-[#6ee073] to-[#E07863] via-blue-600 min-h-screen">
      <div>
        <ApolloProvider client={client}>
          <Router>
            <div className="App">
              <MegaMenu />
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />

                <Route path='/' element={<Explore />} />

                <Route path='/list/:id' element={<List />} />
                <Route path='/card/:id' element={<Card />} />

                <Route path='/mylists/' element={<MyBingoLists />} />
                <Route path='/mycards/' element={<MyBingoCards />} />
                <Route path='/new' element={<Create />} />
                <Route path='/play' element={<Game />} />

              </Routes>
            </div>
          </Router>
          <Footer />
        </ApolloProvider>
      </div>
    </div>
  );
}

export default App;
