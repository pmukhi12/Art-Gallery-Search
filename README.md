# Art Gallery Search
## Synopsis
Web application to search two notable Art Galleries -
- Metropolitan Museum of Arts Collection.
- Art Institute of Chicago.

This application allows a user to search weatArt Galleries in free-text format. Following sections describe how and where to get the code, how to install it locally and use this application.

## Getting Started
Code: [Code](https://github.com/pmukhi12/Art-Gallery-Search)

Live: [github pages](https://pmukhi12.github.io/Art-Gallery-Search/)

You can clone code from [github link](https://github.com/pmukhi12/Art-Gallery-Search) and run it locally on your computer.

### Prerequisites

A computer with browser that supports javascript. To clone code from github, you need to have aceess to Internet. Also your computer should have Terminal (Unix) software installed. For Windows users, you can get it from https://www.cygwin.com/. For Mac users, it comes pre-installed with MacOS. 

### Installing and running

- Open a terminal.  
- Create a directory for this project.
- Change current directory to this project direcory.
- Issue the following command -

```
git clone git@github.com:pmukhi12/Art-Gallery-Search.git
```
You can then run this tool by opening ```index.html``` page from this directory in a browser.

## User guide
Application features a weather dashboard. User is presented with a screen to input a city name with a ```Search 🔍 ``` button. It shows error message if user clicks on search button without entering any city name, or with an invalid city name. For any valid city, it fetches data from [OpenWeather](api.openweathermap.org), first it fetches Latitude/Longitude data for the city and then gets detail weatherdata in second api call with latitude/longitude data for that city. City name is stored in the left pane city list alongwith latitude/longtude data, so if user clicks on a city from the list it makes only the second api call for detail weather data. For each city in the city list there is a delete button at right, so when user clicks on it, that city gets removed from the list.

The following animation demonstrates the application functionality:

![initial_window](./assets/images/ms-weather-dashboard.gif)

## Credits
This application was built with a collaborative effort by a team of Web developers -

- [Nkenge Crowe](https://github.com/BluNite/)
- [Pravesh Mukhi](https://github.com/pmukhi12/)
- [Manzur Shaheed](https://github.com/manzur-shaheed/)

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [Moment](https://momentjs.com/)
* [Font Awesome](https://fontawesome.com/)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Acknowledgments
* **Billie Thompson** - [PurpleBooth](https://github.com/PurpleBooth) for the README Template.
* [Metropolitan Museum of Arts Collection](https://metmuseum.github.io/)
* [Art Institute of Chicago](https://api.artic.edu/docs/)

## License
The code for this application can be distributed freely and further developed under [MIT License](https://choosealicense.com/licenses/mit/) -
```
MIT License 

Copyright (c) 2021 Team-04

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.```