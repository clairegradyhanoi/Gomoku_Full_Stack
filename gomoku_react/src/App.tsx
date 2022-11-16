import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Login, GameLog, Game, Games, SignUp } from './pages'
import { Header, UserProvider } from './components'
import './App.css';

function App() {
  return (
    <UserProvider>
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="login" element={ <Login /> }/>
        <Route path="sign-up" element={ <SignUp /> }/>
        <Route path="game" element={ <Game /> }/>
         <Route path="games" element={ <Games /> }/>
         <Route path="game-log" element={ <GameLog /> }/> 
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </main> 
    </UserProvider>
  );
}

export default App;
