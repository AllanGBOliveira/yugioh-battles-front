# Use a imagem base do Node.js mais recente
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de pacotes para o diretório de trabalho do contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código da aplicação para o diretório de trabalho do contêiner
COPY . .

# Exponha a porta na qual a aplicação vai rodar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm","run", "dev"]