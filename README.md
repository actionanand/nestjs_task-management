<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Local development server link

http://localhost:3000/

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

### Docker - postgreSql

1.  Run `postgres` in `docker` after installing the docker locally

```sh
docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

- How to check running containers in dockers locally

```bash
docker container ls
```
or
```bash
docker ps
```
or to see inactive containers
```sh
docker ps -a
```

- How to `stop` the container by name

```sh
docker container stop postgres-nest
```

- How to `start` the container after stopping it by name

```bash
docker container start postgres-nest
```

- How to `remove` or `delete` the container after stopping it by name

```sh
docker container rm postgres-nest
```

2. Finally you can check that the access to the `postgres instance` using docker exec command as indicated below:

```bash
$ docker exec -it postgres-nest bash
root@9d983793b7b3:/# psql -h localhost -U postgres
psql (13.4 (Debian 13.4-1.pgdg110+1))
Type "help" for help.
postgres=# \list
                        List of databases
   Name  |  Owner | Encoding | Collate    | Ctype      | Access P..
---------+--------+----------+------------+------------+------------
postgres |postgres| UTF8     | en_US.utf8 | en_US.utf8 |
template0|postgres| UTF8     | en_US.utf8 | en_US.utf8 |=c/postgres+    
         |        |          |            |      postgres=CTc/pos...
template1|postgres| UTF8     | en_US.utf8 |en_US.utf8. |=c/postgre +       |        |        |          |            |postgres=CTc/pos...
(3 rows)
```

3. Running pgAdmin docker container

- To download the latest stable version of the image, open a terminal and type the following:

```sh
docker pull dpage/pgadmin4:latest
```

- After downloading the image, we need to run the container making sure that the container connects with the other container running postgres. In order to do so we type the following command:

```sh
docker run --name my-pgadmin -p 55550:80 -e 'PGADMIN_DEFAULT_EMAIL=anand@ar.com' -e 'PGADMIN_DEFAULT_PASSWORD=postgresmaster'-d dpage/pgadmin4
```

4. Accessing pgAdmin

- You only need to open your favourite browser and type the following url: http://localhost:55550/ so your instance of pgAdmin will show up.

- To access, type the username and the password you established in the step one, when running the postgres container (if you followed the tutorial the user name is `anand@ar.com` and the password is `postgresmaster`).

- Once you are on the main page, you have to create a connection with the postgres server. In order to do so, just click on `Add New Server` and a new dialog window will show up. There you must fill in 2 mandatory fields:

    - As indicated in the following picture, a `Name` to identify the connection to our `PostgreSQL server` must be provided. In our case we have selected `nest pg`. You can put anyname here.

    - The second required value is `Host name/address` and it is located on the form under the tab `Connection`. The value to input is `172.17.0.2` in our case. This value can be obtained by using the command `docker inspect` from the terminal (this command with the `-f` option provides us with the networking parameters in JSON format of the container `postgres-nest`).

```sh
docker inspect postgres-nest -f “{{json .NetworkSettings.Networks }}”
```
or
```sh
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
```

the output will be as below:

```sh
{“bridge”:{“IPAMConfig”:null,”Links”:null,”Aliases”:null,”NetworkID”:”3893d72cd028eb21a8653ee56290c9aaba8822d16f1453777fb107e5e12afe70",”EndpointID”:”23fce49b0adfcb2ebf307076ae641b57c58e568704826fb1ed74aec86a27eb3f”,”Gateway”:”172.17.0.1",”IPAddress”:”172.17.0.2”,”IPPrefixLen”:16,”IPv6Gateway”:””,”GlobalIPv6Address”:””,”GlobalIPv6PrefixLen”:0,”MacAddress”:”02:42:ac:11:00:04",”DriverOpts”:null}}
```

- Once filled in the field `Host name/address`, you just need to input `postgres` for the user field and `postgres`  for the password field (if you followed till now).

5. Changing `postgres` password

```sh
$ docker exec -it postgres-nest bash
root@9d983793b7b3:/# psql -h localhost -U postgres
psql (13.4 (Debian 13.4-1.pgdg110+1))
Type "help" for help.

postgres=# ALTER ROLE postgres WITH PASSWORD 'postgres';
ALTER ROLE
postgres=#
```

### Windows - postgreSql


```sh
C:\Program Files\PostgreSQL\15\bin>psql -U postgres -p 5433
Password for user postgres:
psql (15.1)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# \list
                                                                List of databases
   Name    |  Owner   | Encoding |          Collate           |           Ctype            | ICU Locale | Locale Provider |   Access privileges
-----------+----------+----------+----------------------------+----------------------------+------------+-----------------+-----------------------
 postgres  | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            |
 template0 | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            | =c/postgres          +
           |          |          |                            |                            |            |                 | postgres=CTc/postgres
 template1 | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            | =c/postgres          +
           |          |          |                            |                            |            |                 | postgres=CTc/postgres
(3 rows)


postgres=#
```

- [Connect to PostgreSQL Database on Linux, Windows](https://www.w3resource.com/PostgreSQL/connect-to-postgresql-database.php)
- [How to install PostgreSQL on Windows](https://www.sqlshack.com/how-to-install-postgresql-on-windows/)
- [Download PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)


### Resources

- [Class-Validator github](https://github.com/typestack/class-validator)
- [How to run PostgreSQL & PgAdmin in 3 steps using Docker](https://migueldoctor.medium.com/how-to-run-postgresql-pgadmin-in-3-steps-using-docker-d6fe06e47ca1)
- [How to run Postgres on Docker part 1](https://www.optimadata.nl/blogs/1/n8dyr5-how-to-run-postgres-on-docker-part-1)
- [Active Record vs Data Mapper](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md)
- [TypeOrm Repository APIs - doc](https://orkhan.gitbook.io/typeorm/docs/repository-api)
- [Connecting TypeORM with NestJs - official doc](https://docs.nestjs.com/techniques/database)

## License

Nest is [MIT licensed](LICENSE).