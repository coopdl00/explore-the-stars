document.addEventListener('DOMContentLoaded', function () {
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
      let imgSrc = document.createElement('img')
      axios.get(`https://api.nasa.gov/planetary/earth/imagery/?lon=${long}&lat=${lat}&dim=.075&cloud_score=True&api_key=tLkupbIMhxOtXQta4XszZ8UmTKky1YStScmVLUt4`)
      .then(function (response) {
        if (body.innerHTML === "") {
          imgSrc.src = response.data.url
          imgSrc.style = "width: 100%"
          body.appendChild(imgSrc)
        }
      })
      .catch(function (error) {
        alert('Photo location not in database')
      })
    } else if (event.target === imageTag) {
      let favoritesArray = JSON.parse(localStorage.getItem('favorites')) || []
      favoritesArray.push(event.target.src)
      localStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }
  })
})
