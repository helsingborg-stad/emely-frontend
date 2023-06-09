# Emely WebApp

## Overview
This project was developed by NordAxon for Helsingborg Stad 2021-2022, and open sourced in April 2023.

Emely is a Conversational AI System for practicing job interviews in Swedish. The dialogue model is a finetuned Blenderbot 1.

The project is separated in 3 repositories: [emely-frontend](https://github.com/helsingborg-stad/emely-frontend), [emely-backend](https://github.com/helsingborg-stad/emely-backend) & [emely-models](https://github.com/helsingborg-stad/emely-models).

Emely web app is the user interface part of Emely, consisting of this web app and the Brain. The web app is mainly based on the JavaScript framework **React** but also uses GCP services such as Firebase Authentication, Firestore etc. There is some backend logic created in Python. 



## Windows installation

### Get started -first time

1. Clone repository.
2. Download and install NodeJS from https://nodejs.org/en/download/
3. Go to root-folder and write following command 
 ```
 $ npm install
 ```
7. Navigate to the api folder in your prompt and do the '$ npm install' again.
8. Aquire the files '.env.production', '.env.development' and put in the root-folder.
9. You are ready to run the project.

## Run project
Finally, run the below command to start the web-app. It will be running on localhost:3000.
```
npm start
```

## Changes in 'package.json' and 'package-lock.json
If there has been changes in 'package.json' and 'package-lock.json' you need to run '$ npm install' again otherwise you will get an error saying that you are missing a certain module used in the project. 

