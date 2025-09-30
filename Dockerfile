# Imagem base com Node
FROM node:18-slim

# Instala dependências do Chrome para o Puppeteer rodar
RUN apt-get update && apt-get install -y \
    wget gnupg unzip fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 \
    libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnss3 libx11-xcb1 libxcomposite1 \
    libxdamage1 libxfixes3 libxrandr2 libxshmfence1 libxkbcommon0 libxss1 libxtst6 \
    && rm -rf /var/lib/apt/lists/*

RUN npm i -g tsx

# Cria pasta do app
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta configurada no Express
EXPOSE 3030

# Comando de inicialização
CMD ["npm", "start"]
