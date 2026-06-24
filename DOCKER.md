# Docker — Instagram Clone

Guia completo para executar o projeto com Docker.

---

## Arquivos criados

| Arquivo | Propósito |
|---|---|
| `Dockerfile` | Define como construir a imagem do projeto |
| `.dockerignore` | Lista arquivos que NÃO devem ser copiados para dentro da imagem |
| `docker-compose.yml` | Simplifica a execução do container com configurações prontas |

---

## Explicação do Dockerfile

```dockerfile
FROM node:20-alpine
```
Define a imagem base. `node:20-alpine` usa o Node.js 20 LTS sobre o Alpine Linux — uma distro minimalista que gera imagens menores sem abrir mão do essencial.

```dockerfile
WORKDIR /app
```
Define `/app` como diretório de trabalho dentro do container. Todos os comandos seguintes partem desse caminho.

```dockerfile
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
```
Copia apenas os manifests de dependências **antes** do código-fonte. Isso é uma prática de cache de camadas: se `package.json` não mudar, o Docker reutiliza a camada do `npm install` sem reinstalar tudo.

`npm ci` é preferível ao `npm install` em containers porque instala exatamente as versões do `package-lock.json`, garantindo builds reproduzíveis.

```dockerfile
COPY public/ ./public/
COPY src/ ./src/
```
Copia o código-fonte depois do install. Assim, alterar um arquivo `.js` não invalida o cache do `npm install`.

```dockerfile
ENV HOST=0.0.0.0
```
Por padrão, o dev server do Create React App escuta apenas em `localhost`. Dentro de um container, isso impede o Docker de expor a porta corretamente. Esta variável faz o servidor aceitar conexões de qualquer origem.

```dockerfile
EXPOSE 3000
```
Documenta que o container usa a porta 3000. Não publica a porta automaticamente — isso é feito no `docker run` ou no `docker-compose.yml`.

```dockerfile
CMD ["npm", "start"]
```
Comando executado quando o container inicia. Roda o dev server do CRA.

---

## Explicação do docker-compose.yml

O `docker-compose.yml` é um atalho: em vez de digitar um longo comando `docker run` com todas as flags, você declara as configurações em um arquivo e usa `docker compose up`.

**Volumes:**
- `./src:/app/src` e `./public:/app/public` — bind mounts que sincronizam o código local com o container em tempo real (hot reload funciona).
- `/app/node_modules` — volume anônimo que protege o `node_modules` instalado dentro do container. Sem isso, o bind mount acima sobrescreveria com o `node_modules` local (que pode estar vazio ou ser diferente).

**`CHOKIDAR_USEPOLLING=true`:** necessário no Windows para o hot reload funcionar, pois o filesystem do Windows não emite eventos de mudança de arquivo que o Linux dentro do container consegue detectar nativamente.

---

## Comandos

### Usando docker-compose (recomendado)

#### Construir a imagem e iniciar o container
```bash
docker compose up --build
```
> Use `--build` para forçar a reconstrução da imagem. Após a primeira vez, pode usar apenas `docker compose up`.

#### Iniciar em background (modo detached)
```bash
docker compose up --build -d
```

#### Parar o container
```bash
docker compose stop
```

#### Parar e remover o container
```bash
docker compose down
```

#### Remover o container, a imagem e os volumes
```bash
docker compose down --rmi all --volumes
```

#### Reconstruir após alterações no Dockerfile ou dependências
```bash
docker compose up --build
```

---

### Usando docker diretamente

#### Construir a imagem
```bash
docker build -t instagram-clone .
```

#### Executar o container
```bash
docker run -d -p 3000:3000 --name instagram-clone instagram-clone
```

#### Parar o container
```bash
docker stop instagram-clone
```

#### Remover o container
```bash
docker rm instagram-clone
```

#### Remover a imagem
```bash
docker rmi instagram-clone
```

#### Reconstruir a imagem após alterações
```bash
docker stop instagram-clone
docker rm instagram-clone
docker build -t instagram-clone .
docker run -d -p 3000:3000 --name instagram-clone instagram-clone
```

---

## Acesso

Após iniciar o container, acesse: **http://localhost:3000**

---

## Observações

- O hot reload funciona via volumes no `docker-compose.yml`. Se usar `docker run` diretamente sem volumes, precisará reconstruir a imagem a cada alteração de código.
- Variáveis de ambiente sensíveis (como chaves do Firebase) devem ser passadas via arquivo `.env` e nunca commitadas. No `docker-compose.yml`, use `env_file: .env` para carregar o arquivo.
