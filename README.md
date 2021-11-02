# GamesDB 

**Introduction**</br>
This project is a game database website that allows users to rate and comment on games.
I started this project to focus and learn about using Django Rest Framework as a backend and using React, NextJS, and Redux for the frontend for Web Development.
The project taught me how to use React and NextJS in order to build a responsive web application with minimal page refreshing, making use of components to separate tasks, and using hooks to update information immediately. Redux was used to maintain a global store to retrieve user information and to display alerts. DRF was used as the backend to update and retrieve information from the database.

An admin Django account can be created in order to upload games in the admin page. On the games index page a responsive grid view of games are displayed, and a searchbar is also usable in order to filter by a game's title or by their genre tags. Each game has their own page in which detailed information on the game is displayed. Users are able to register to the website and log in, where they are then able to rate and comment on games. The users are also able to like games, which are then stored in a user's profile page. A user is also able to edit their email, profile image, and a profile description on their profile page. <br/>

**Stack**: Django, Django Rest Framework, React, NextJS, React Redux, Bootstrap, CSS</br>


**Sample Images**</br>
Games Index Page
![Sample Images](https://github.com/ErnestC30/DjangoReact_GameDB/blob/master/sample_images/sample_games_index.PNG)
Game Information Page
![Sample Images](https://github.com/ErnestC30/DjangoReact_GameDB/blob/master/sample_images/sample_games_page.PNG)
Profile Page
![Sample Images](https://github.com/ErnestC30/DjangoReact_GameDB/blob/master/sample_images/sample_profile.PNG)


**How to Use**</br>
This project requires installation of the modules shown in *game_db/requirements.txt* and in *next/core/package.json*.</br>
In *game_db/settings.py*, replace `SECRET_KEY=SEC_KEY` with your own django secret key.</br>
To create an admin account and upload games, go to the `game_db` directory and use `python manage.py createsuperuser`</br>
Go to the `/admin` page on the Django server (default http://127.0.0.1:8000/admin) in order to start creating Genre and Game models. 
Optional: I have included a sample genres and games json to populate the database. These can be loaded using `python manage.py loaddata genres.json` followed by `python manage.py loaddata games.json`.

To run the servers:</br>
In the `game_db` directory, use `python manage.py runserver` to start the Django backend.</br>
In the `next/core` directory, use `npm run dev` to start the NextJS developmental frontend.</br>

**Features Learned**</br>
React Components, NextJS Alerts, Django Rest Framework, Likes/Favoriting, Searchbar, Data Serialization, Redux Stores, Alerts, React Hooks

**License**<br/>
MIT License

Copyright (c) 2021 Ernest Chow

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
