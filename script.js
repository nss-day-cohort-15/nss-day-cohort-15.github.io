// Simple ajax call to get class info array from json file

function getClass() {
  return new Promise((resolve, reject) => {
        $.ajax({
          url: "classinfo.json",
        }).done(function(response) {
        console.log(response, "response")
          resolve(response)
        }).fail(function(error) {
          reject(error)
        })
      })
}

// On page load, send ajax call, extract the array from containing object and inject each item into Materialize card
function loadPage() {
  var infoArr = [];
  getClass()
  .then((response) => {
    for (var key in response) {
      infoArr = response[key]
    }
    var cardString = generateCards(infoArr);
    attachCardsToDOM(cardString);

    //Add some sort of functionality on hover
    $(".memCard").hover(function(e) {
      console.log('this can swap the card to personality shot, produce a modal, or do whatever else we want')
    })
  })
}

function generatePlaceholderAvatar(index) {
  return "https://api.adorable.io/avatars/200/nss-cohort-15" + index;
}

function generateCards(peopleArr) {
  return peopleArr.reduce(function(domString, person, i) {
    domString += "<div class='col-xs-12 col-md-4 col-lg-3 person-tile'>" +
                 "<img src='" + /* Replace this with professional pic --> */ generatePlaceholderAvatar(i) +
                    "' alt='" + person.name + "''>" +
                 "<h3>" + person.name.split(" ")[0] + "<br/>" + person.name.split(" ")[1] + "</h3>" +
                 "<hr>" +
                 "<div class='tile--icons'>" +
                     "<a href='" + person.githubLink + "'>" +
                         "<img src='img/logo/Github.svg' alt='Github'/>" +
                     "</a>" +
                     "<a href='" + person.linkedInLink + "'>" +
                         "<img src='img/icon/linkedin.svg' alt='Linkedin'/>" +
                     "</a>" +
                     "<a href='" + person.portfolioLink + "'>" +
                         "<img src='img/icon/globe.svg' alt='Personal Website'/>" +
                     "</a>" +
                   "</div>" +
                 "</div>";

    return domString;
  }, '');
}

function attachCardsToDOM(cardString) {
  document.getElementById('meet-us--row').innerHTML = cardString;
}
loadPage()
