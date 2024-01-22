# Use a imagem oficial do Node.js como base
FROM node:20

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de configuração e dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte
COPY . .

# Execute o comando para construir o projeto (substitua "build" pelo comando correto)
RUN npm run build

# Exponha as portas utilizadas pelos seus aplicativos
EXPOSE 80
EXPOSE 3000

# Instale o json-server globalmente
RUN npm install -g json-server

# Comando para iniciar o json-server e o aplicativo (substitua pelos comandos corretos)
CMD ["sh", "-c", "json-server --watch src/db.json --port 3000 & npx serve -s dist -l 80"]
