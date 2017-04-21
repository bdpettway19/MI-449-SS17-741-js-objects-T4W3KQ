// ----
// DATA
// ----

// A couple jokes to start with
var pageUpdated = window.localStorage.getItem('jokes')
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}
if (pageUpdated) {
  jokes = JSON.parse(pageUpdated)
}

// The message to display if the jokes object is empty
var noJokesMessage = 'No matching joke found 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
  var pageUpdated = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', pageUpdated)
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var joke = jokes[requestedJokeKey]
  if (joke) {
    jokeBox.innerHTML = '<p>' + joke.setup + '</p><p> ' + joke.punchline + '</p>'
  } else {
    jokeBox.innerHTML = noJokesMessage
  }
}
// new code
var rememberJoke = document.getElementById('remember')
jokesMenuList = document.getElementById('jokes-menu')
var abt = document.getElementById('about')
var pch = document.getElementById('punch')
var stup = document.getElementById('set')
var forgetJoke = document.getElementById('forget')
var dislikeJoke = document.getElementById('dislike')
var addJoke = function () {
  jokes[abt.value] = {
    setup: stup.value,
    punchline: pch.value
  }
  updateJokesMenu()
}
var deleteJoke = function () {
  delete jokes[dislikeJoke.value]
  updateJokesMenu()
}

rememberJoke.addEventListener('click', addJoke)
forgetJoke.addEventListener('click', deleteJoke)

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
