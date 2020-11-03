'use strict';

// Knowns as global variables
//var minCustomers, maxCustomers, avgCookiesPerCustomer;

var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// Random integer between two values, inclusive (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random )
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

function calculateCookiesPurchased() {
  var cookiesPurchasedPerHour = [];
  for (var i = 0; i < storeHours.length; i++) {
    cookiesPurchasedPerHour = this.customerPerHour * this.avgCookiesPerCustomer;
}


// Build Object literals for each store in a city using the known values

var seattle = {
  storeCity: 'Seattle',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesPerCustomer: 6.3,
  customerPerHour: getRandomIntInclusive(this.minCustomers, this.maxCustomers),
  //cookiesPurchasedPerHour: 
  render: function () {
    
      // 1. get the connection to the DOM
      var seattleParent = document.getElementById('seattle');
      // 2. create an element
      var listElement = document.createElement('li');
      // 3. fill it with content
      listElement.textContent = this.cookiesPurchasedPerHour;
      // 4. append to the DOM
      seattleParent.appendChild(listElement);
    }
  },
}



//call the function for Seattle
seattle.render();

/* Calculate:
1. The customer per hour using the random number function, given the min/max values.
2. The simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated
3. Store the results for each location in a separate array (could be as a property of the object representing that location)
Therefore,
var customerPerHour = ???
var cookiesPurchasedPerHour = ???
*/




/* Output:
1. Provide an array of cookies sold each hour as an unordered list
2. Provide a sum of the hourly totals for each location
3. Post this information on the DOM
*/