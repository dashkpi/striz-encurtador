const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// URLs de redirecionamento
const redirectUrls = {
  'tlg-1': 'https://telegram.momentosdolucas.com/?utm_campaign=WHATSAPP&utm_source=DIA-1&utm_medium=TESTE-A',
  'tlg-2': 'https://telegram.momentosdolucas.com/?utm_campaign=WHATSAPP&utm_source=DIA-1&utm_medium=TESTE-B'
};

// Servir arquivos estáticos da pasta atual
app.use(express.static(path.join(__dirname)));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rotas de redirecionamento
Object.keys(redirectUrls).forEach(route => {
  app.get(`/${route}`, (req, res) => {
    res.redirect(redirectUrls[route]);
  });
});

// Rota para as páginas de redirecionamento originais (mantendo compatibilidade)
app.get('/tlg-1/index.html', (req, res) => {
  res.redirect(redirectUrls['tlg-1']);
});

app.get('/tlg-2/index.html', (req, res) => {
  res.redirect(redirectUrls['tlg-2']);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Redirecionamentos disponíveis:');
  Object.keys(redirectUrls).forEach(route => {
    console.log(`- http://localhost:${PORT}/${route}`);
  });
});