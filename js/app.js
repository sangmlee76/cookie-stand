'use strict';

function projectNotes(){
/*
[5 Nov 20 Release]
1. Goal: Add a form to the webpage that dynamically adds a new store locations to the table given the core input values: city name, min and max customers per hour, average cookie sales per hour.

2. Implement:
a. HTML form to accept the information for a new cookie stand; use <fieldset> tag
b. Create an event handler that creates a new instance of the cookie stand that appends to the table upon submission
c. Use constructor function to guide what input fields the form should use (hint: consider what is passed in when creating instances)
d. Ensure the footer row with the total accommodates the addition of each new store
e. Apply DRY in refactoring your code where appropriate
f. Use form validatioin by using HTML5 validation tool: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
g. Ensure functions in the code are adhering to the single responsibility rule.

3. Output:
a. A form to take in input for a new cookie stand
b. An updated sales table with new store information 
------------------------------
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

*/
}

/*** START ***/

// Global variables
// given values: var minCustomers, maxCustomers, avgCookiesPerCustomer, storeHours
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
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

// This section computes the values for the hourly sales and then builds multiple arrays to store values
// prototype function to create random integer between two values, inclusive (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random )
CookieStore.prototype.randomCustomersPerHour = function () {
  var min = Math.ceil(this.minCustomers);
  var max = Math.floor(this.maxCustomers);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

// prototype function to create cookiesSoldPerHour array
CookieStore.prototype.calculateCookiesSoldPerHour = function () {
  // clears the array to allow update with new city additions
  this.customersPerHourList = [];
  this.cookiesSoldPerHourList = [];
  
  for (var i = 0; i < storeHours.length; i++) {
    var cookiesSoldPerHour = Math.round(this.randomCustomersPerHour() * this.avgCookiesPerCustomer);
    this.cookiesSoldPerHourList.push(cookiesSoldPerHour);
    // counter to sum up total sales per store
    this.dailyCookiesSoldPerStore += cookiesSoldPerHour;
    // counter to sum up total sales per hour across all stores (i.e. bottom row)
    cookiesSoldAllStoresGrandTotal += this.cookiesSoldPerHourList[i];
    
  }
  // console.log for debugging; DELETE before production
  // console.log('TOTAL cookies sold per hour: ' + this.cookiesSoldPerHourList);
  // console.log('TOTAL daily cookie sale: ' + this.dailyCookiesSoldPerStore);
  // console.log('TOTAL hourly cookies sold across stores: ' + cookiesSoldAllStoresGrandTotal);
}

// This section builds the sales data table
// prototype function to render main table rows with sales data
CookieStore.prototype.render = function () {
  this.calculateCookiesSoldPerHour();  // this was added here during help from TA, this function was originally called at execution call at the bottom. DO NOT do that; it should be integrated into the main code body and be called as it is needed.  For example, we need the hourly sales array because we will render it below in the for-loop.
  // make a tr
  var trTableRow = document.createElement('tr');
  // append tr to tbodyParent
  tbodyParent.appendChild(trTableRow);

  // fill in city/store name as the first row entry
  var tdStoreName = document.createElement('td');
  tdStoreName.textContent = this.storeCity;
  trTableRow.appendChild(tdStoreName);
 
  // fill in hourly cookie sales data assigned to each hour of the day; this section 
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
// This section creates object instances for each of the cities/stores
new CookieStore('Seattle', 23, 65, 6.3);
new CookieStore('Tokyo', 3, 24, 1.2);
new CookieStore('Dubai', 11, 38, 3.7);
new CookieStore('Paris', 20, 38, 2.3);
new CookieStore('Lima', 2, 16, 4.6);



// This section provides helper functions 
// Make a helper function to build a table header row
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

// resets all form input fields if clicked. Source: https://www.quora.com/How-do-I-reset-the-text-field-in-a-form-using-javaScript
function handleFormReset(){
  var resetButton = document.getElementById("reset");
  if (resetButton){
    resetButton.value = '';
  }
}

// Make a helper function to create the event handler
function handleNewStoreFormSubmit(event){
  //standard code to prevent deletion of data
  event.preventDefault();
 
  // if(event.target){
  //   console.log('the event.target is: ', event.target);
  //   console.log('the event.target.location is: ', event.target.location);
  //   console.log('the event.target.location.value is ', event.target.location.value);
  //   console.log('the event.target.mincustomer is: ', event.target.mincustomers);
  //   console.log('the event.target.mincustomer.value is ', event.target.mincustomers.value);   
  //   console.log('the event.target.maxcustomer is: ', event.target.maxcustomers);
  //   console.log('the event.target.maxcustomer.value is ', event.target.maxcustomers.value);  
  //   console.log('the event.target.cookiespercustomer is: ', event.target.cookiespercustomer);
  //   console.log('the event.target.cookiespercustomer.value is ', event.target.cookiespercustomer.value);
  // }

  var newStoreCity = event.target.location.value;
  var newMinCustomers = event.target.mincustomers.value;
  var newMaxCustomers = event.target.maxcustomers.value;
  var newAvgCookiesPerCustomer = event.target.cookiespercustomer.value;

  new CookieStore(newStoreCity, newMinCustomers, newMaxCustomers, newAvgCookiesPerCustomer);
  renderStores();
  
  
  // resets the form after new submission
  var newForm = document.getElementById("newstoreform");
  newForm.reset;
}

// Make a helper function to build the table footer row with hourly and grand total for each store
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
// this is a helper function; it uses the object reference for each store to build the hourly sales array for each store
function calculateEachStoreSales(){
  for(var i=0; i <allStoresList.length; i++) {
    allStoresList[i].calculateCookiesSoldPerHour();
  }
}

// this is a helper function; it uses the object reference for each store to render the table with the information within each object
function renderStores() {
  tbodyParent.innerHTML = '';  // need this to clear the parent element in order to rewrite the entire table each time we have a new entry
  createTableHeader();  // same thing here; previously, I was calling this at the very end but need to integrate this into the main body of the code and call it when it is needed.

  for(var i=0; i < allStoresList.length;i++){
    allStoresList[i].render();
  }
  createTableFooter();  // same thing here; previously, I was calling this at the very end but need to integrate this into the main body of the code and call it when it is needed.
}

// This is the execution section; invokes function call to build tables for each store
renderStores();


// The final section is for event listeners; we created one event listener for the submit button
var createNewStoreEl = document.getElementById('newstoreform');
createNewStoreEl.addEventListener('submit', handleNewStoreFormSubmit);




