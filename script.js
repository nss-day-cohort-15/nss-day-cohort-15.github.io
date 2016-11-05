// Simple ajax call to get class info array from json file

let getClass = () => {
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
let loadPage = () => {
  let infoArr = []
  getClass()
  .then((response) => {
    for (var key in response) {
    infoArr = response[key]
    }
    populateCards(infoArr)
//Add some sort of functionality on hover

    $(".memCard").hover(function(e) {
      console.log('this can swap the card to personality shot, produce a modal, or do whatever else we want')
    })
  })
}

//Specify internal structure of Materialize cards

let populateCards = (infoArr) => {
  for (let i = 0; i < infoArr.length; i++) {
    let memberCard = `
  <div class="col m4">
    <h2 class="header">${infoArr[i].name}</h2>
    <div class="card horizontal">
      <div class="card-image memCard">
        <img src="https://unsplash.it/150/?random">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>${infoArr[i].aboutMe}</p>
        </div>
        <div class="card-action">
           <a href="${infoArr[i].githubLink}">GitHub</a>
              <a href="${infoArr[i].portfolioLink}">Portfolio</a>
              <a href="${infoArr[i].linkedInLink}">LinkedIn</a>
        </div>
        </div>
  </div>`
    $('.members-area-box').append(memberCard)
  }
}
loadPage()
