'use strict';

/*
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

// Knowns as global variables
//var minCustomers, maxCustomers, avgCookiesPerCustomer;
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var seattle = ['Seattle', 23, 65, 6.3];
var tokyo = ['Tokyo', 3, 24, 1.2];
var dubai = ['Dubai', 11, 38, 3.7];
var paris = ['Paris', 20, 38, 2.3];
var lima = ['Lima', 2, 16, 4.6];


// Random integer between two values, inclusive (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random )
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

function calculateCookiesPurchased(minCustomers, maxCustomers, cookiesPerCustomer) {
  var cookiesPurchasedPerHour = [];
  var cookiesPurchasedByHourOfDay = [];
  //var cookiesPurchasedByHourOfDay = [];
  for (var i = 0; i < storeHours.length; i++) {
    cookiesPurchasedPerHour = (getRandomIntInclusive(minCustomers, maxCustomers)) * cookiesPerCustomer;
    cookiesPurchasedByHourOfDay.push(storeHours[i] + ' : ' + cookiesPurchasedPerHour);
    var totalCookies = cookiesPerCustomer;
    totalCookies ++
  }
  return [cookiesPurchasedByHourOfDay, totalCookies];
}

// Build Object literals for each store in a city using the known values

var seattleSales = {
  storeCity: seattle[0],
  minCustomers: seattle[1],
  maxCustomers: seattle[2],
  avgCookiesPerCustomer: seattle[3],
  customerPerHour: getRandomIntInclusive(this.minCustomers, this.maxCustomers), //*Unresolved BUG* if I hard code numbers, this works but when I use 'this' reference, it breaks and returns a NaN
  cookiesPurchasedPerHour: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[0],
  totalCookiesSold: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[1],
  render: function () {
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
}
// Tokyo object literal
var tokyoSales = {
  storeCity: tokyo[0],
  minCustomers: tokyo[1],
  maxCustomers: tokyo[2],
  avgCookiesPerCustomer: tokyo[3],
  customerPerHour: getRandomIntInclusive(this.minCustomers, this.maxCustomers), //*Unresolved BUG* if I hard code numbers, this works but when I use 'this' reference, it breaks and returns a NaN
  cookiesPurchasedPerHour: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[0],
  totalCookiesSold: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[1],
  render: function () {
    var cityParent = document.getElementById('tokyo');
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
}
// Dubai object literal
var dubaiSales = {
  storeCity: dubai[0],
  minCustomers: dubai[1],
  maxCustomers: dubai[2],
  avgCookiesPerCustomer: dubai[3],
  customerPerHour: getRandomIntInclusive(this.minCustomers, this.maxCustomers), //*Unresolved BUG* if I hard code numbers, this works but when I use 'this' reference, it breaks and returns a NaN
  cookiesPurchasedPerHour: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[0],
  totalCookiesSold: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[1],
  render: function () {
    var cityParent = document.getElementById('dubai');
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
}
// Paris object literal
var parisSales = {
  storeCity: paris[0],
  minCustomers: paris[1],
  maxCustomers: paris[2],
  avgCookiesPerCustomer: paris[3],
  customerPerHour: getRandomIntInclusive(this.minCustomers, this.maxCustomers), //*Unresolved BUG* if I hard code numbers, this works but when I use 'this' reference, it breaks and returns a NaN
  cookiesPurchasedPerHour: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[0],
  totalCookiesSold: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[1],
  render: function () {
    var cityParent = document.getElementById('paris');
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
}
// Lima object literal
var limaSales = {
  storeCity: lima[0],
  minCustomers: lima[1],
  maxCustomers: lima[2],
  avgCookiesPerCustomer: lima[3],
  customerPerHour: getRandomIntInclusive(this.minCustomers, this.maxCustomers), //*Unresolved BUG* if I hard code numbers, this works but when I use 'this' reference, it breaks and returns a NaN
  cookiesPurchasedPerHour: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[0],
  totalCookiesSold: calculateCookiesPurchased(this.minCustomers, this.maxCustomers, this.avgCookiesPerCustomer)[1],
  render: function () {
    var cityParent = document.getElementById('lima');
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
}


//call the function for each city
seattleSales.render();
tokyoSales.render();
dubaiSales.render();
parisSales.render();
limaSales.render();


