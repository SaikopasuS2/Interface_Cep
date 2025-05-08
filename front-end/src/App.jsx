import { useState } from 'react'
import Cep from "./Info"
import './style.css'

function App() {
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
        <main className='main'>
          <Cep/>
        </main>
    </div>
  );
}

export default App;
