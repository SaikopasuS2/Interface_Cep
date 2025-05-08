const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

async function consultarCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
        const response = await axios.get(url);

        const{cep,logradouro, bairro, localidade} = response.data;
        return {cep, logradouro, bairro, localidade};
        
    } catch (error) {
        console.error("Erro ao consultar o CEP:", error.response?.data || error.message);
        return null;
    }
}

app.get('/:cep', async (req, res) => {
    const cep = req.params.cep;

    if (!/^\d{8}$/.test(cep)) {
        return res.status(400).json({ error: 'CEP inválido. Use apenas números (8 dígitos)' });
    }

    const dadosCep = await consultarCep(cep);

    if (!dadosCep || dadosCep.erro) {
        return res.status(404).json({ error: 'CEP não encontrado' });
    }

    return res.status(200).json(dadosCep);
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
