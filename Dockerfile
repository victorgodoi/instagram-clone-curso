# Usa a imagem oficial do Node.js na versão LTS com Alpine Linux.
# Alpine é uma distro minimalista (~5MB), o que reduz o tamanho final da imagem.
FROM node:20-alpine

# Define o diretório de trabalho dentro do container.
# Todos os comandos seguintes serão executados a partir deste caminho.
WORKDIR /app

# Copia APENAS os arquivos de manifesto de dependências primeiro.
# Isso aproveita o cache de camadas do Docker: se package.json e
# package-lock.json não mudarem, o `npm install` não rodará novamente.
COPY package.json package-lock.json ./

# Instala as dependências usando o package-lock.json para garantir
# versões exatas. --legacy-peer-deps é necessário por incompatibilidades
# de peer deps em algumas versões do CRA com React 19.
RUN npm ci --legacy-peer-deps

# Copia o restante do código-fonte para dentro do container.
# É feito depois do install para não invalidar o cache quando o código muda.
COPY public/ ./public/
COPY src/ ./src/

# Define a variável de ambiente HOST como 0.0.0.0.
# Por padrão, o dev server do CRA escuta apenas em localhost, o que impede
# o Docker de expor a porta corretamente. Esta variável corrige isso.
ENV HOST=0.0.0.0

# Informa ao Docker que o container escutará na porta 3000 em tempo de execução.
# É apenas documentação — não publica a porta automaticamente.
EXPOSE 3000

# Comando executado quando o container inicia.
# Roda o dev server do Create React App.
CMD ["npm", "start"]
