const routes = require("next-routes")();
/* 
mapping is done url --> page
: ---> wild card
address --> variable where our address will stored .... that use in show.js file
*/
routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;
