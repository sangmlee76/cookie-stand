'use strict';

/*
[3 Nov 20 Release]
1. Goals: Render a table with the same data from Lab-6 (2 Nov release)Replace all object literals with a single contructor function that will create a new instance

2. Implement:
a. Each cookie stand location should have its own render() method that creates and appends its row to the table
b. The header row and footer row are each created in their own stand-alone function
c. Footer row with hourly and grand total sales per store
d. Good use of a constructor function; style and syntax are correctly implemented
e. Duplicate code has been removed and DRY principles are evident
f. Working on a non-master branch for the day, with regular commit history. Basically, every time you get something to work, you should do a commit. But you only need to push every couple of hours or so, tops.

3. Output:
a. A table with each store and its hourly sales; include totals by hour (across all stores - this is a stretch goal for Lab-7) and by total for the day (for each store)

-----------------------------
[2 Nov 20 Release]
1. Goal: Render an array of cookies sold each hour by store location (e.g. city)

2. Calculate:
  a. The customer per hour using the random number function, given the min/max values.
  b. The simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated
  c. Store the results for each location in a separate array (could be as a property of the object representing that location)
  
3. Output:
  a. Provide an array of cookies sold each hour as an unordered list
  b. Provide a sum of the hourly totals for each location
  c. Post this information on the DOM
*/

// Knowns; global variables
//var minCustomers, maxCustomers, avgCookiesPerCustomer;
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var seattle = ['Seattle', 23, 65, 6.3];
var tokyo = ['Tokyo', 3, 24, 1.2];
var dubai = ['Dubai', 11, 38, 3.7];
var paris = ['Paris', 20, 38, 2.3];
var lima = ['Lima', 2, 16, 4.6];




function calculateCookiesPurchased(minCustomers, maxCustomers, cookiesPerCustomer) {
  var cookiesPurchasedPerHour = [];
  var cookiesPurchasedByHourOfDay = [];
  //var cookiesPurchasedByHourOfDay = [];
  for (var i = 0; i < storeHours.length; i++) {
    cookiesPurchasedPerHour = (getRandomIntInclusive(minCustomers, maxCustomers)) * cookiesPerCustomer;
    cookiesPurchasedByHourOfDay.push(storeHours[i] + ' : ' + cookiesPurchasedPerHour + ' cookies');
    var totalCookies = cookiesPurchasedPerHour;
    totalCookies++
  }
  return [cookiesPurchasedByHourOfDay, totalCookies];
}

var customersPerHour = [];
var cookiesSoldPerHour = [],
totalCookiesSoldPerStorePerDay = 0,
totalCookiesSoldPerHourAllStores = 0,

// Create object constructor for stores
function CookieStore(storeCity, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.storeCity = storeCity;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;

  customersPerHour.push(this);
  cookiesSoldPerHour.push(this);
  
}

CookieStore.prototype.render = function () {
  var cityParent = document.getElementById('seattle');
  // 2. create an element
  var listElement1 = document.createElement('li');
  var listElement2 = document.createElement('li');
  // 3. fill it with content
  listElement1.textContent = this.cookiesPurchasedPerHour;
  listElement2.textContent = 'Total: ' + this.totalCookiesSold;
  // 4. append to the DOM
  cityParent.appendChild(listElement1);
  cityParent.appendChild(listElement2);
}



// Helper function to create random integer between two values, inclusive (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random )
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log(min, max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}





//call the function for each city
seattleSales.render();
tokyoSales.render();
dubaiSales.render();
parisSales.render();
limaSales.render();


