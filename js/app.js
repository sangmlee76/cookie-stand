'use strict';

/*
[4 Nov 20 Release]
1. Goal: update with all the requirements for the sales page and initial index.html page with assets provided

2. Implement:
a. Footer row with hourly and grand total sales per store (the stretch goal from last lab)

3. Output:
A table with each store and its hourly sales; include totals by hour across all stores and by total for the day (for each store)

-----------------------------
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
A table with each store and its hourly sales; include totals by hour (across all stores - this is a stretch goal for Lab-7) and by total for the day (for each store)

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
-------------------------------
*/

// Global variables
// given values: var minCustomers, maxCustomers, avgCookiesPerCustomer, storeHours
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
//var customersPerHourList = [];
//var cookiesSoldPerHourList = [];
//var dailyCookiesSoldPerStore = 0;
var cookiesSoldAllStoresGrandTotal = 0; // bottom footer row
var tbodyParent = document.getElementById('table');
var allStoresList = [];


// Create object constructor for stores
function CookieStore(storeCity, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.storeCity = storeCity;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersPerHourList = [];
  this.cookiesSoldPerHourList = [];
  this.dailyCookiesSoldPerStore = 0;

  allStoresList.push(this);
}

// Helper function to create random integer between two values, inclusive (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random )
CookieStore.prototype.randomCustomersPerHour = function () {
  var min = Math.ceil(this.minCustomers);
  var max = Math.floor(this.maxCustomers);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

//prototype function to create customersPerHour array; after an update, this function is no longer needed but keeping it in for now for reference. The calculation for cookies sold per hour is handled directly in the calculateCookiesSoldPerHour prototype function below
CookieStore.prototype.calculateCustomersPerHour = function () {
  for (var i = 0; i < storeHours.length; i++) {
    var customersPerHour = this.randomCustomersPerHour();
    //console.log('iteration value ' + [i] + ':' + customersPerHour);
    this.customersPerHourList.push(customersPerHour);
    //console.log('iteration value ' + [i] + ':' + this.customersPerHourList);    
  }
}


// prototype function to create cookiesSoldPerHour array
CookieStore.prototype.calculateCookiesSoldPerHour = function () {
  for (var i = 0; i < storeHours.length; i++) {
    var cookiesSoldPerHour = Math.round(this.randomCustomersPerHour() * this.avgCookiesPerCustomer);
    this.cookiesSoldPerHourList.push(cookiesSoldPerHour);
    // counter to sum up total sales per store
    this.dailyCookiesSoldPerStore += cookiesSoldPerHour;
    // counter to sum up total sales per hour across all stores (i.e. bottom row)
    cookiesSoldAllStoresGrandTotal += this.cookiesSoldPerHourList[i];
    
  }
  // console.log for debugging; DELETE before production
  console.log('TOTAL cookies sold per hour: ' + this.cookiesSoldPerHourList);
  console.log('TOTAL daily cookie sale: ' + this.dailyCookiesSoldPerStore);
  console.log('TOTAL hourly cookies sold across stores: ' + cookiesSoldAllStoresGrandTotal);
}



// prototype function to render Seattle store table row
CookieStore.prototype.render = function () {
  // make a tr
  var trTableRow = document.createElement('tr');
  // append tr to tbodyParent
  tbodyParent.appendChild(trTableRow);

  // create property array from the CookieStore object; initially created but may not need it anymore; keeping it fore reference for now and will delete before production.
  //var propertyArray = [this.storeCity, this.cookiesSoldPerHourList, this.dailyCookiesSoldPerStore]; 

  // fill in city/store name as the first row entry
  var tdStoreName = document.createElement('td');
  tdStoreName.textContent = this.storeCity;
  trTableRow.appendChild(tdStoreName);

  // fill in hourly cookie sales data assigned to each hour of the day
  for (var i = 0; i < this.cookiesSoldPerHourList.length; i++) {
    var tdTableRow = document.createElement('td');
    tdTableRow.textContent = this.cookiesSoldPerHourList[i]; 
    trTableRow.appendChild(tdTableRow);
  }

  // fill in total sales per store as the final row entry
  var tdDailyTotalSales = document.createElement('td');
  tdDailyTotalSales.textContent = this.dailyCookiesSoldPerStore;
  trTableRow.appendChild(tdDailyTotalSales);
}

// Make a table header row
function createTableHeader() {
  // make a tr
  var trHeader = document.createElement('tr');
  // make a th for the store location
  var thHeader = document.createElement('th');
  thHeader.textContent = "Store Name";
  trHeader.appendChild(thHeader);

  // make a th for the store hours
  for (var i = 0; i < storeHours.length; i++) {
    thHeader = document.createElement('th');
    thHeader.textContent = storeHours[i];
    tbodyParent.appendChild(trHeader);
    trHeader.appendChild(thHeader);
  }
  // make th for the store total as the final header
  thHeader = document.createElement('th');
  thHeader.textContent = 'Daily Total Sales';
  trHeader.appendChild(thHeader);
}

// Make a table footer row with hourly and grand total for each store
function createTableFooter() {
  // make a tr
  var trFooter = document.createElement('tr');
  // make a th for the store location
  var thFooter = document.createElement('th');
  thFooter.textContent = 'Totals';
  trFooter.appendChild(thFooter);

  // make a table footer for each hour
  for (var i = 0; i < storeHours.length; i++) {
    var hourlySalesSum = 0
    thFooter = document.createElement('th');
    for (var j=0; j < allStoresList.length;j++){
      hourlySalesSum += allStoresList[j].cookiesSoldPerHourList[i];      
    }
    thFooter.textContent = hourlySalesSum;  
    tbodyParent.appendChild(trFooter);
    trFooter.appendChild(thFooter);
  }
  // make th for the store total as the final header
  thFooter = document.createElement('th');
  thFooter.textContent = cookiesSoldAllStoresGrandTotal; //need to input the variable for the sum of all totals
  trFooter.appendChild(thFooter);
}

// create object instances for each of the cities/stores
var seattleStore = new CookieStore('Seattle', 23, 65, 6.3);
var tokyoStore = new CookieStore('Tokyo', 3, 24, 1.2);
var dubaiStore = new CookieStore('Dubai', 11, 38, 3.7);
var parisStore = new CookieStore('Paris', 20, 38, 2.3);
var limaStore = new CookieStore('Lima', 2, 16, 4.6);

// this function uses the object reference for each store to build the hourly sales array for each store
function calculateEachStoreSales(){
  for(var i=0; i <allStoresList.length; i++) {
    allStoresList[i].calculateCookiesSoldPerHour();
  }
}

// this function uses the object reference for each store to render the table with the information within each object
function renderStores() {
  for(var i=0; i < allStoresList.length;i++){
    allStoresList[i].render();
  }
}


//function calls to build tables for each store
createTableHeader();
calculateEachStoreSales();
renderStores();
createTableFooter();



