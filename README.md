# Launch Rocket

API para obter os lançamentos de foguetes realizados e agendados pela empresa SpaceX.


## Dependências

- Docker ^23


## Configuração

Fazer uma cópia do arquivo arquivo `.env.example` e renomear para `.env`, nele é possível configurar a porta e o endpoint da API.


## Como executar

Utilizado o comando:

```shell
docker compose up server
```

## Endpoit

Existe apenas um único endpoint que retorna todos os lançamentos realizados, o último, o próximo e os que ocorrerão depois dele.

`GET /launches/resume`