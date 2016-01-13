/**
This is a JS version of https://github.com/gabinante/TitleCreator
*/

var jobCategories = ['Solutions', 'Systems', 'Network', 'Security', 'Compliance', 'Information', 'Scalability', 'Cloud'];

var possessivePrefixes = ['Viceroy', 'Commandant', 'Grand Poo-Bah', 'Archon', 'Duke', 'Chancellor', 'President', 'Marquis', 'Earl', 'Director', 'Chair', 'Head', 'Senior Director'];
var possessiveSuffixes = ['Engineering', 'Management', 'Development', 'Deployment', 'Technical Training', 'Operations', 'Architecture', 'Infrastructure', 'Technology', 'Administration', 'Management', 'Computational Analytics', 'Database Administration'];

var adjectivePrefixes = ['Principal', 'Chief', 'Head', 'Lead', 'Senior', 'Master'];
var adjectiveSuffixes = ['Engineer', 'Architect', 'Designer', 'Consultant', 'Manager', 'Officer', 'Janitor'];

var romanGrades = ['I', 'II', 'III', 'IV'];

// Certain prefixes are singleton roles and should never have a grade suffix
var ungradablePrefixes = ['Chair', 'Chief', 'Chancellor', 'Commandant', 'Director', 'Head', 'Lead', 'President']


/**
 * Utility to wrap the different behaviors between W3C-compliant browsers
 * and IE when adding event handlers.
 *
 * @param {Object} element Object on which to attach the event listener.
 * @param {string} type A string representing the event type to listen for
 *     (e.g. load, click, etc.).
 * @param {function()} callback The function that receives the notification.
 */
function addListener(element, type, callback) {
 if (element.addEventListener) element.addEventListener(type, callback);
 else if (element.attachEvent) element.attachEvent('on' + type, callback);
}


function maybe(percentage) {
  return Math.random() < (percentage/100);
}

function randomBool() {
  return maybe(50);
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateTitle() {
  if (randomBool()) {
    title = randomElement(possessivePrefixes) + ' of ' + randomElement(jobCategories) + ' ' + randomElement(possessiveSuffixes)
  } else {
    title = randomElement(adjectivePrefixes) + ' ' + randomElement(jobCategories) + ' ' + randomElement(adjectiveSuffixes)
  }

  // Add a Roman numeral grade suffix 25% of the time, unless the title is ungradable.
  if (!ungradablePrefixes.some(prefix => title.includes(prefix)) && maybe(25)) {
    title = title + ' ' + randomElement(romanGrades)
  }

  return title;
}

function updateTitle() {
  document.getElementById("name").innerHTML = generateTitle();
}

updateTitle();

var newTitleLink = document.getElementById('again');

addListener(newTitleLink, 'click', function() {
  updateTitle();
});
