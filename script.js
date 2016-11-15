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
  <div class="col s6 m4 l3">
    <div class="card">
      <div class="card-image memCard">
        <img src="https://unsplash.it/150/?random">
        <span class="card-title">${infoArr[i].name}</span>
      </div>
        <div class="card-content">
          <p>${infoArr[i].aboutMe}</p>
        </div>
        <div class="card-action">
          <div class="row">
            <a href="${infoArr[i].githubLink}"><img src="img/icon/github.png"></a>
            <a href="${infoArr[i].linkedInLink}"><img src="img/icon/linkedin.png"></a>
            <a href="${infoArr[i].portfolioLink}"><i class="material-icons">open_in_new</i></a>
          </div>
        </div>
  </div>`
    $('.members-area-box').append(memberCard)
  }
}
loadPage()
