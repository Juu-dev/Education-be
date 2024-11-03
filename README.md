# O2 skin - backend

## For developer

- to run compose (BE-db-redis):

```sh
./script-docker/start-dev-docker-compose.sh
```

- to watch backend log

```sh
./script-docker/log-backend.sh
```

- to stop compose

```sh
./script-docker/stop-dev-docker-compose.sh
```

## dependencies

- class-validator: ValidationPipe
- class-transformer: DTOs
- cli-color: color for cli in terminal
- cors
- express (???)
- graphql-subscriptions (???)
- iterare (data Array)
- object-hash (hash object in JS)
- 

## hot reload

## Permission

- Edit _PermissionNameType_ in schema.prisma
- Update enum permisstion in constants/permission path folder
- Update permission.type.ts to use permission in @Permission decorator
