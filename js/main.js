document.addEventListener('DOMContentLoaded', function () {
  let count = 0
  let images = document.querySelectorAll('.images')
  if (document.querySelector('.loadFavorites')) {
    let list = document.querySelector('.loadFavorites')
    let image = JSON.parse(localStorage.getItem('favorites'))
    if (image) {
      for (let i = 0; i < image.length; i++) {
        let listItem = document.createElement('li')
        let imageTag = document.createElement('img')
        list.append(listItem)
        listItem.append(imageTag)
        imageTag.src = image[i]
        listItem.classList.add('my-5')
      }
    } else {
      let list = document.querySelector('.loadFavorites')
      list.append('You haven\'t Favorited anything yet go look at the search for some cool images and click on the image to favorite it.')
    }
  }

  document.addEventListener('click', function() {
    let imageTag = document.getElementsByTagName('img')[0]
    if (event.target.value === 'Search') {
      let lat = document.querySelector('.latitude').value
      let long = document.querySelector('.longitude').value
      let body = document.querySelector('.addImage')
      let img = document.createElement('img')
      axios.get(`https://api.nasa.gov/planetary/earth/imagery/?lon=${long}&lat=${lat}&dim=.075&api_key=tLkupbIMhxOtXQta4XszZ8UmTKky1YStScmVLUt4`)
      .then(function (response) {
        if (count < 1) {
          img.src = response.data.url
          img.classList.add('select')
          img.classList.add('images')
          img.style = "width: 100%"
          body.appendChild(img)
        } else {
          document.querySelector('.select').src = response.data.url
        }
        count++
      })
      .catch(function (error) {
        alert('Photo location not in database')
      })
    } else if (event.target === imageTag) {
    }
  })
  for (let i = 0; i < images.length ; i++) {
    images[i].addEventListener('click', function(){
      let favoritesArray = JSON.parse(localStorage.getItem('favorites')) || []
      favoritesArray.push(event.target.src)
      localStorage.setItem('favorites', JSON.stringify(favoritesArray))
    })
  }
})
// &date=2018-02-01
