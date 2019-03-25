# Grant Merrill Tray.IO technical challenge

Program to meet the goals outlined in the challege for Tray.io

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
node v10.15.1
```

### Installing

Clone the files from my repository

```
git clone https://github.com/Maelstroms/MerrillTrayIOchallenge.git
```

Install npm packages

```
npm install
```

Using the included input.txt, you can run

```
node server.js
```

and the program should output

```
[ 1, 3 ]
2
Server at : <your ip address>
listening on 3000
```

## Running the tests


I am using Mocha to run unit tests

```
npm test
```

should return something that looks like:

```
> trayiochallenge@1.0.0 test /Users/grantmerrill/Documents/JobApps/2018CoverLetters/TrayIO
> mocha



  Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (7ms)


```



