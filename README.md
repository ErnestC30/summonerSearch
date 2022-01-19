# summonerSearch

**Introduction**</br>
This React/NextJS project is a website that mimics functionalities similar to op.gg and other League of Legends related profile lookup websites. 
Making use of the official Riot API, people can search a user's profile across different regions and lookup the stats from the user's most recent games. 
The website was created using React and was made to practice using a 3rd party API to collect data and then to display the data neatly using MaterialUI components. 
The project was also a practice exercise for me to introduce Typescript into my project for type checking.

The project currently supports six regions: North America, Brazil, Europe West, Europe North, Korea, and Japan, although it can be expanded to include each region supported by Riot.

![Sample Images](https://github.com/ErnestC30/summonersearch/blob/main/sample_images/SearchBar.PNG)

Searching will redirect to the a new page displaying user's profile including the avatar icon, username, and rendering a component displayinng the user's ranked and 5v5 flex rankings if available. It will also render out a list of the user's recent matches and display the user's stats and a brief match summary. These can be clicked on to reveal a more detailed component showing each participant's stats and other team related objectives. The participant's names can be clicked on to redirect to that participant's page. The profile page also has an infinite scrolling feature where scrolling to the bottom of the page will load more matches.

**Stack**</br>
Javascript, Typescript, React, NextJS, MUI 

**Sample Images**</br>
Home Page
![Sample Images](https://github.com/ErnestC30/summonersearch/blob/main/sample_images/HomePage.PNG)
User Page
![Sample Images](https://github.com/ErnestC30/summonersearch/blob/main/sample_images/UserPage.PNG)
Win Component
![Sample Images](https://github.com/ErnestC30/summonersearch/blob/main/sample_images/WinDetails.PNG)
Lose Component
![Sample Images](https://github.com/ErnestC30/summonersearch/blob/main/sample_images/LoseDetails.PNG)

**How to Use**</br>
This project requires installation of the modules shown in *next/core/package.json*.</br>
The project also requires a Riot API key that can be obtained at https://developer.riotgames.com/.</br>
The Riot API key should be stored in a hidden `.env.local` file 
Since this project makes use of Riot's hosted Data Dragon for the ingame images, `dataDragonVersion` in the *next.config.js* file must be kept updated as the game patches.
The server can be started using `npm run dev` at the main directory.

**Features Learned**<br>
Working with third party (Riot) APIs, TypeScript, MaterialUI Components, Infinite Scrolling, Custom React Hooks

**License**<br/>
MIT License

Copyright (c) 2022 Ernest Chow

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
