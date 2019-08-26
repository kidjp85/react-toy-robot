react-toy-robot
===============

> A toy robot simulator written by React + Redux

## Description:
The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5
units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

## Create an application that can read in commands of the following form

```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```

- `PLACE` will put the toy robot on the table in position `X,Y` and facing `NORTH`, `SOUTH`, `EAST` or
`WEST`.
- The origin (0,0) can be considered to be the `SOUTH WEST` most corner.
- The first valid command to the robot is a `PLACE` command, after that, any sequence of
commands may be issued, in any order, including another `PLACE` command. The application
should discard all commands in the sequence until a valid `PLACE` command has been
executed.
- `MOVE` will move the toy robot one unit forward in the direction it is currently facing.
- `LEFT` and `RIGHT` will rotate the robot 90 degrees in the specified direction without changing
the position of the robot.
- `REPORT` will announce the `X,Y and F` of the robot. This can be in any form, but standard
output is sufficient.
- A robot that is not on the table can choose the ignore the `MOVE`, `LEFT`, `RIGHT` and `REPORT`
commands.
- Input can be from a file, or from standard input, as the developer chooses.

## Completed application screenshot

![alt screenshot](https://i.imgur.com/omt17FU.png)

## Built with

- **[TypeScript](https://www.typescriptlang.org/)**
- **[React](https://reactjs.org/)**
- **[Redux](https://github.com/reduxjs/redux)**
- **[Create-react-app](https://github.com/facebook/create-react-app)**
- **[React-yuki](https://github.com/kidjp85/react-yuki)**
- **[Styled-system](https://github.com/styledsystem/styledsystem)**
- **[Styled-components](https://www.styledcomponents.com/)**

## Get started

#### Make sure you have the latest git, Node.js and Yarn installed on your machine

```bash
$ git --version

$ yarn --version

$ node --version
```

#### Clone the repo from Bitbucket

```bash
$ git clone https://github.com/kidjp85/react-toy-robot.git
```

#### Install npm package

```bash
$ cd react-toy-robot && yarn
```

#### Start local server

```bash
$ yarn start
```

And open `http://localhost:3000` to view it in the browser.

#### Build production

```bash
$ yarn build
```

#### Testing

```bash
$ yarn test
```

#### Linting (eslint + stylelint)

```bash
$ yarn linting
```