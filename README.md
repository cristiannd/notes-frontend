<a name="readme-top"></a>
<div align="center">
    <h1>postIT</h1>
<!--     <img src="https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/images/screenshot.png" alt="Imagen del proyecto" /> -->
</div>

The app is a small social media, inspired by [Twitter](https://twitter.com/), where the tweets are replaced with short notes. You can give a _favorite_ to other users’ notes and even your own. As well you have the possibility to filter your notes or your favorite ones.
<br>

<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#folder-structure">Folder structure</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<br>

## About the project
The purpose of the creation of the application was learning and improving the use of different technologies for the frontend and the backend.
<br>
This is the repository of the _frontend_. You can access the repository of the [backend][backend-url] from this link.

### Built With
- React
- React Router Dom
- Axios
- Material UI & icons

<br>

### Features
- Create a user’s account.
- Log in with a validated account.
- Create a note.
- Give a _favorite_ to a note.
- See all the notes from different users.
- See the created notes.
- See your favorite notes.

<br>

## Getting started
### Prerequisites
First of all you need to have the API working. If you haven’t done this go to this repo -> [backend](backend-url).

### Installation
1. Clone the repo
    ```sh
    git clone https://github.com/cristiannd/notes-frontend.git
    ```
2. Change the current working directory to the folder
    ```sh
    cd notes-frontend
    ```
3. Install NPM packages
    ```sh
    npm install
    ```
4. Start API
    ```sh
    npm start
    ```

<br>

## Folder structure
~~~
.
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── ...
│   ├── pages
│   │   └── PageName
│   │       └── index.jsx
│   │       └── components
│   │           └── ...
│   ├── services
│   │   └── ...
│   ├── assets
│   │   ├── images
│   │   │   └── profile-icons
│   │   │       └── ...
│   ├── App.js
│   ├── index.js
│   └── index.css
└── cypress
    ├── e2e
    │   └── ...
    └── support
        └── ...
~~~

<br>

## Contact
- LinkedIn: [/in/cristian-donalicio](https://www.linkedin.com/in/cristian-donalicio/)
- Email: cristian.donalicio@gmail.com

<p align="right"><a href="#readme-top">↑ back to the top</a></p>

<!-- LINKS -->
[backend-url]: https://github.com/cristiannd/notes-backend
