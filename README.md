#Munro Bagger

## Team
- John Easton
- Phil Crooks
- Sian Robinson Davies
- Lee Lawrence

##MVP
- Users should be able to see what Munros in Scotland are currently Sunny.
- Users should be able to click on a munro and see it's details.

##Further Development
- Users should be able to see what munros in Scotland are Sunny tomorrow and the day after.
- Users should be able to log in and see what munros they have already climbed.

##Learning Outcomes
- To explore front-end and server-side JS technologies
- To consolidate the use of various third-party APIs
- To consolidate the use of MongoDB
- To make use of local storage

## Technologys Used

- JavaScript
- Node JS
- Express
- Mocha
- WebPack
- HTML
- CSS

## APIs Used

- Google Maps API
- OpenWeatherMap API
- Munro API (tbc)

## Installation Instructions

- Install MongoDB

```

```

- Install WebPack

```
npm install webpack -g
```

- Install the Packages from Package.JSON

```
npm install
```

- Run the seed file to populate MongoDB

```
mongo < db/mongo_init.js
```

- Run Express Server

```
npm start
```

-  Open a new Terminal tab and un WebPack from the client folder.

```
cd client
```

```
webpack -w
```

-  Open a new Terminal tab and initialise MongoDB

```
mongod
```
Open a web-browser and visit localhost:3000/


***
***
***


##JavaScript Project Specs


#Trip Planner (Trippi)

You are required to build a day trip planner using Google Maps API and Google Places API. Users should be able to find out about interesting places or events near to where they're planning to go and save the ones they like most into an itinerary.

##MVP
- Users should be able to select a location
- Be able to see local places of interest
- Create an itinerary of the places they wish to visit that day.


#Educational App

The BBC are looking to improve their online offering of educational content by developing some interactive apps that display information in a fun and interesting way. Your task is to make an MVP to put forward to them - this may only be for a small set of information, and may only showcase some of the features to be included in the final app. You might use an API to bring in content or a database to store facts. The topic of the app is your choice, but here are some suggestions you could look into:

- Interactive timeline, e.g. of the history of computer programming
- Explore the Solar System - navigate through planets and display information
- Interactive map of a historical event - e.g. World War 1, the travels of Christopher Columbus

##MVP

- Display some information about a particular topic in an interesting way
- Have some user interactivity using event listeners, e.g to move through different sections of content

See sample.md for some examples for inspiration.

#Astronaut's Dashboard

An astronaut is going to the International Space Station and has requested that you build a browser based dashboard for them to use on board the ISS. They want to keep up to date with what's going on in their home city to stop them from getting too homesick. They also want to be able to write notes or a diary to send back home.

You should make an app that uses APIs to bring in data about what is happening back on Earth. This may include photos, weather, news, timezones/sunrise times or anything else you think relevant. In addition there should be a note taking aspect where a user can input text snippets and save them with a time/date stamp.

##MVP

- At least two APIs being used to bring in data relevant to a specific place.
- A note taking / diary feature that saves text data with a timestamp which can then be retrieved - this may use a database or just local storage.

#Browser Game

Create a browser game based on an existing card or dice game. Model the game logic and then display it in the browser for a user to interact with.

Make your own MVP with some specific goals to be achieved based on the game you choose to model.

You might use persistence to keep track of the state of the game or track scores/wins. Other extended features will depend on the game you choose.
