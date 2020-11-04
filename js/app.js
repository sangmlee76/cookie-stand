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

// Global variables
// given values: var minCustomers, maxCustomers, avgCookiesPerCustomer, storeHours
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
// var customersPerHourList = [];
// var cookiesSoldPerHourList = [];
// var dailyCookiesSoldPerStore;
// var hourlyCookiesSoldAllStoresList = []; // this is a stretch goal for Lab-7 per instructor guidelines
var tbodyParent = document.getElementById('table');
var allStoresList = [];


// Create object constructor for stores
function CookieStore(storeCity, minCustomers, maxCustomers, avgCookiesPerCustomer, customersPerHourList, cookiesSoldPerHourList, dailyCookiesSoldPerStore) {
  this.storeCity = storeCity;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersPerHourList = customersPerHourList;
  this.cookiesSoldPerHourList = cookiesSoldPerHourList;
  this.dailyCookiesSoldPerStore = dailyCookiesSoldPerStore;

  allStoresList.push(this);
}

// prototype function to create customersPerHour array
CookieStore.prototype.calculateCustomersPerHour = function () {
  for (var i=0; i<storeHours.length; i++){
    var customersPerHour = getRandomIntInclusive(this.minCustomers, this.maxCustomers);
    this.customersPerHourList.push(customersPerHour);
  }
}

// prototype function to create cookiesSoldPerHour array
CookieStore.prototype.calculateCookiesSoldPerHour = function () {
  for (var i=0; i<storeHours.length; i++){
    var cookiesSoldPerHour = customersPerHourList[i] * this.avgCookiesPerCustomer;
    this.cookiesSoldPerHourList.push(cookiesSoldPerHour);
    this.dailyCookiesSoldPerStore = this.dailyCookiesSoldPerStore + cookiesSoldPerHour;
  }
}

// Make a table header row
function createTableHeader(){
  // make a tr
  var trHeader = document.createElement('tr')
  // make a th for the store location
  var thHeader = document.createElement('th')
  thHeader.textContent = "Store Location"
  
  // make a th for the store hours
  for (var i=0; i<storeHours.length,i++) {
    thHeader = document.createElement('th');
    thHeader.textContent = storeHour[i];
    tbodyParent.appendChild(trHeader);
    trHeader.appendChild(thHeader);
  }
  // make th for the store total as the final header
  thHeader = document.createElement('th');
  thHeader.textContent = 'Store Hourly Total';
  trHeader.appendChild(thHeader);
}

// prototype function to render Settle store table row
CookieStore.prototype.render = function () {
  // make a tr
  var trTableRow = document.createElement('tr')
  // append tr to tbodyParent
  var tbodyParent.appendChild(trTableRow);
  
  // create property array from the CookieStore object
  var propertyArray = [this.storeCity, this.cookiesSoldPerHourList, this.dailyCookiesSoldPerStore] 

  // fill in city/store name
  var tdStoreName = document.createElement('td');
  tdStoreName.textContent = propertyArray[0]
  trTableRow.appendChild(tdStoreName);

  // fill in hours
  for(var i=0; i<this.cookiesSoldPerHourList.length;i++){
    var tdTableRow = document.createElement('td');
    tdTableRow.textContent = this.cookiesSoldPerHourList[i];
    trTableRow.appendChild(tdTableRow);
  
  // fill in total sales per store
  var tdDailyTotalSales = document.createElement('td');
  tdDailyTotalSales.textContent = propertyArray[2];
  trTableRow.appendChild(tdDailyTotalSales);
  }
}

// Make a table footer row with hourly and grand total for each store;
// Note: per instructor guidelines, the hourly totals across stores is a stretch goal for Lab-7


// create object instances for each of the cities/stores
var seattleStore = new CookieStore('Seattle', 23, 65, 6.3);
var tokyoStore = new CookieStore('Tokyo', 3, 24, 1.2);
var dubaiStore = new CookieStore('Dubai', 11, 38, 3.7);
var parisStore = new CookieStore('Paris', 20, 38, 2.3);
var limaStore = new CookieStore('Lima', 2, 16, 4.6);


// Helper function to create random integer between two values, inclusive (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random )
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log(min, max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}


//function calls to execute
createTableHeader();
for(var i=0; i <allStoresList.length;i++){
  allStores[i].render();
}


