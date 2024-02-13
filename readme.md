# Sistema remoto de transmissão de futset

Este é um sistema de placar e controle de tempo para transmissão ao vivo no OBS e plataformas similares. Ele pode ser controlado tanto pelo celular quanto por um servidor local, através do navegador.

## Como usar?

Existem duas pastas principais: server e client. Dentro de cada uma delas, execute os seguintes comandos:

```Copy code
yarn install
yarn dev
Além disso, adicione o host do servidor à variável socket no arquivo config.ts.
```

## Controle Remoto pelo Celular

Utilize o ngrok para disponibilizar o servidor local para acesso via celular. Configure o arquivo ngrok.yml para ativar dois túneis simultâneos utilizando o comando ngrok start --all após a configuração do arquivo.

Para finalizar a configuração, adicione o host do servidor gerado pelo ngrok à variável socket no arquivo config.ts. Acesse o host do cliente pelo celular.

## Administração

Acesse /adm para entrar no painel de administração. Lá, é possível criar a interação de um novo jogo, visualizar o histórico de jogos anteriores ou retornar ao painel do jogo atual.

## OBS

Ao finalizar todas as configurações, abra o OBS e adicione uma fonte de navegador, inserindo o link do cliente e adicionando / ao final do link.
