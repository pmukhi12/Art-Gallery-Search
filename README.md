# Art Gallery Search
## Synopsis
Web application to search two notable Art Galleries -
- Metropolitan Museum of Arts Collection.
- Art Institute of Chicago.

This application allows a user to search Art Galleries in free-text format. Following sections describe how and where to get the code, how to install it locally and use this application.

## Installation
Code: [Code](https://github.com/pmukhi12/Art-Gallery-Search)

Live: [github pages](https://pmukhi12.github.io/Art-Gallery-Search/)

You can clone code from [github link](https://github.com/pmukhi12/Art-Gallery-Search) and run it locally on your computer.

#### Prerequisites

A computer with browser that supports javascript. To clone code from github, you need to have aceess to Internet. Also your computer should have Terminal (Unix) software installed. For Windows users, you can get it from https://www.cygwin.com/. For Mac users, it comes pre-installed with MacOS. 

#### Installing and running

- Open a terminal.  
- Create a directory for this project.
- Change current directory to this project direcory.
- Issue the following command -

```
git clone git@github.com:pmukhi12/Art-Gallery-Search.git
```
You can then run this tool by opening ```index.html``` page from this directory in a browser.

## User guide
This Web Application presents user with an input form where the user can select a museum to search from a list. Input for search text is in free-format. Both input text and search button ``` 🔍 ``` next to it is not available until the user selects a museum to search. Application shows an error message if user tries to search for an empty string.

Once user enters a search text and clicks ``` 🔍 ``` button, application makes API calls to either [Metropolitan Museum of Arts Collection](https://metmuseum.github.io/) or [Art Institute of Chicago](https://api.artic.edu/docs/) based on what museum was chosen for search. There are multiple API calls to get first metadata and then actual data. 

Search text is saved and is displayed in ```History:``` list below the ```Search:``` input form. User can click on search text from the history list, application will first try to serve data from local cache, and call API if there is no data in cache. Search texts also shows the museum acronym next to them in small font, so user knows which museum was searched for this text. Search texts can also be deleted from the history list by clicking on the ```x``` button next to them. History list disappears once all the saved searches are deleted.

This application was built as responsive, so it adjusts layout based on device type. (desktop or mobile)

The following animation demonstrates the application functionality:

![initial_window](./assets/images/art-gallery-search.gif)

## Credits
This application was built with a collaborative effort by a team of Web developers -

- [Nkenge Crowe](https://github.com/BluNite/)
- [Pravesh Mukhi](https://github.com/pmukhi12/)
- [Manzur Shaheed](https://github.com/manzur-shaheed/)

## Built With

#### Technolgies used
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [Moment](https://momentjs.com/)
* [Font Awesome](https://fontawesome.com/)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

#### Wireframe

![wireframe](./assets/images/art-gallery-search.png)
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
SOFTWARE.
```


## Acknowledgments
* **Billie Thompson** - [PurpleBooth](https://github.com/PurpleBooth) for the README Template.
* [Metropolitan Museum of Arts Collection](https://metmuseum.github.io/)
* [Art Institute of Chicago](https://api.artic.edu/docs/)
