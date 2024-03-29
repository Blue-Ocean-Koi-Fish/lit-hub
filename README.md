<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Blue-Ocean-Koi-Fish/lit-hub">
    <img src="./public/assets/images/logo.png" alt="Logo" width="200" height="100">
  </a>

  <p align="center">
    A hub for literature
    <br />
    <a href="https://github.com/Blue-Ocean-Koi-Fish/lit-hub"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://lit-hub.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/Blue-Ocean-Koi-Fish/lit-hub/issues">Report Bug</a>
    ·
    <a href="https://github.com/Blue-Ocean-Koi-Fish/lit-hub/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://lit-hub.herokuapp.com/)

A highly accessible website that serves books from the Gutendex API that can be read and stored through the app, even when offline.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Axios](https://axios-http.com/docs/intro)
* [Sass](https://sass-lang.com/)
* [MongoDB](https://www.mongodb.com/)
* [Workbox](https://www.workbox.com/)
* [Bcrypt](https://bcrypt.online/)
* [JWT](https://jwt.io/)
* [Gutendex](https://gutendex.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

Lit-Hub is a Progressive Web App

A note on service workers: Lit-Hub will allow users to view their book collection and read books while they are offline. For future devs, updates to your code base will not automatically show when there is a normal refresh on the app. Explore the service worker section in the Application module on Chrome devtools to find settings to navigate this behavior.

### Prerequisites

This app is simple and designed to run on almost any system or browser without any prerequisites. (unless you are on IE)

### Installation

1. Fork this Repo as well as the backend Repo.
2. Clone the Repo.
   ```sh
   git clone https://github.com/Blue-Ocean-Koi-Fish/lit-hub
   ```
3. Dont forget the backend.
   ```sh
   git clone https://github.com/Blue-Ocean-Koi-Fish/lit-hub-db
   ```
4. Run `npm install` on both repos.

5. Run the command `npm touch .env` in the frontend repo and fill the file like so.
   ```js
   PORT='Fill me in!'
   BACKEND_URL='Fill me in!'
   ```
5. Run the same command on the backend repo and fill the file like so.
   ```js
   PORT='Fill me in!'
   JWT_SECRET='Fill me in!'
   mongoURL='Fill me in!'
   mongoUser='Fill me in!'
   mongoPass='Fill me in!'
   ```
6. In the server repo run the commands:
    ```
    npm run build
    npm run start
    ```

7. In the database repo run the command:
    ```
    npm run start
    ```

8. Open your localhost to the port chosen in step 5.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Search for books on the Gutendex, save the books locally, read books while online or offline.

_For more examples, please refer to the [Documentation](https://gutendex.com/)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] allow for guests to access the website but not use certain features 
- [ ] make the collection accessible from the Popular page
- [ ] text-to-speech in multiple languages 

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact



Project Link: [Beastie Kois](https://github.com/Blue-Ocean-Koi-Fish)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Justin Kirk [@intern-jck](https://github.com/intern-jck)
* Wei-Teck Lee [@weitecklee](https://github.com/weitecklee)
* Levi Walker [@lwcaveman](https://github.com/lwcaveman)
* Cam Estep [@Thunderpig851](https://github.com/Thunderpig851)
* Davyd Zakorchennyi [@Diza41a](https://github.com/Diza41a)
* Jake Reid [@jake-h-reid](https://www.linkedin.com/in/jake-h-reid/)
* Hakeem Abdulmalik [@HakeemDAbdulmalik](https://github.com/HakeemDAbdulmalik)
* Cory Nickerson [@cory314](github.com/cory314)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Blue-Ocean-Koi-Fish/lit-hub.svg?style=for-the-badge
[contributors-url]: https://github.com/Blue-Ocean-Koi-Fish/lit-hub/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Blue-Ocean-Koi-Fish/lit-hub.svg?style=for-the-badge
[forks-url]: https://github.com/Blue-Ocean-Koi-Fish/lit-hub/network/members
[stars-shield]: https://img.shields.io/github/stars/Blue-Ocean-Koi-Fish/lit-hub.svg?style=for-the-badge
[stars-url]: https://github.com/Blue-Ocean-Koi-Fish/lit-hub/stargazers
[issues-shield]: https://img.shields.io/github/issues/Blue-Ocean-Koi-Fish/lit-hub.svg?style=for-the-badge
[issues-url]: https://github.com/Blue-Ocean-Koi-Fish/lit-hub/issues
[license-shield]: https://img.shields.io/github/license/Blue-Ocean-Koi-Fish/lit-hub.svg?style=for-the-badge
[license-url]: https://github.com/Blue-Ocean-Koi-Fish/lit-hub/blob/master/LICENSE.txt
[product-screenshot]: ./public/assets/Screen%20Shot%202022-07-01%20at%204.17.39%20PM.png

