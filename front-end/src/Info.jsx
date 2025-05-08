import { useState } from 'react';
import "./style.css";

function Cep(){
const [rua, setRua] = useState("")
const [complemento, setComp] = useState("")
const [bairro, setBairro] = useState("")
const [cidade, setCidade] = useState("")
const [cep, setCep] = useState(``)

function pesquisar() {
    if (!/^\d{8}$/.test(cep)) {
        alert("Digite um CEP válido com 8 números");
        return;
    }

    fetch(`http://localhost:5000/${cep}`)
        .then(res => {
            if (!res.ok) throw new Error("CEP não encontrado");
            return res.json();
        })
        .then(data => {
            setRua(data.logradouro || "Não informado");
            setComp(data.complemento || "Não informado");
            setBairro(data.bairro || "Não informado");
            setCidade(data.localidade || "Não informado");
        })
        .catch(err => {
            alert("Erro ao buscar o CEP: " + err.message);
        });
}

    return(       
        <div className='divMae'>
            <div className='divA'>
                <input type="text" className="botao" placeholder='Digite o seu CEP' value={cep} onChange={(e) => setCep(e.target.value)}/>
                <button className="buttonSearch" onClick={pesquisar}><img src="/search.png" width={25} height={25}/></button>
            </div>
            <div className='divB'>
                <h1>Rua: {rua}</h1>
                <h1>Complemento: {complemento}</h1>
                <h1>Bairro: {bairro}</h1>
                <h1>Cidade: {cidade}</h1></div>
        </div>

    )
}

export default Cep