Room Booking
============

![Gif](https://media.giphy.com/media/6qq0BdfXVLCRCniwiD/giphy.gif)
## Описание
Приложение для бронирования комнат для совещаний, конференций, переговоров, состоящее из клиентской и
серверной частей.

Клиент Room Booking состоит из двух экранов:
- **диаграмма**, на которой отображены события на текущую или выбранную дату, группированные по комнатам
- **форма** редактирования или создания нового события

На сервере используется GraphQL для облегчения получения и мутации сущностей в базе.


## Зависимости
`node` и `npm`

## Установка 
#### Frontend
```
    cd ./frontend
    npm i
    npm run dev
```
#### Backend
```
    cd ./backend
    npm i
    npm run dev
```

## Стек
#### Frontend
- React
- Redux
- Apollo
- StyledComponents
- Webpack

#### Backend
- Node
- Express
- GraphQL
- Sequelize
- SQLite

#### Tests
- Chai
- Mocha

## Запуск тестов 
```
    cd ./backend
    npm run test
```