let APIURL = '';

switch(window.location.hostname) {
    case 'localhost' :
        APIURL = 'http://localhost:3000';
        break;
    case 'mrseiler-coffeeapi.herokuapp.com' :
        APIRUL = 'https://mrseiler-coffeeapi.herokuapp.com'
}
export default APIURL;