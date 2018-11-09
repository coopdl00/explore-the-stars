document.addEventListener('DOMContentLoaded', function () {
  let count = 0
  let count1 = 0
  let roverForm = document.getElementById('rover_form')
  let roverPhotos = document.getElementById('rover_photos')
  roverForm.addEventListener('submit', function(){
    event.preventDefault()
      let roverName = document.querySelector('.rover_name').value
      let body = document.querySelector('.addInfo')
      let list = document.createElement('ul')
      let item = document.createElement('li')
      item.classList.add('temp')
      body.appendChild(list)

      axios.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=tLkupbIMhxOtXQta4XszZ8UmTKky1YStScmVLUt4`)
      .then(function (response) {
        const solToDay = function (num) {
          return num * 1.0303
        }
        if (count < 1) {
          item.innerHTML = `The Rover name is ${response.data.photo_manifest.name}, the status of the rover ${response.data.photo_manifest.name} is ${response.data.photo_manifest.status}. ${response.data.photo_manifest.name} launched ${response.data.photo_manifest.launch_date} and landed ${response.data.photo_manifest.landing_date}. ${response.data.photo_manifest.name} has taken ${response.data.photo_manifest.total_photos} photos during it's mission. ${response.data.photo_manifest.name} has been on mission for ${response.data.photo_manifest.max_sol} Sol (Martian Days) which converts to ${solToDay(response.data.photo_manifest.max_sol)} Earth days`
          list.appendChild(item)
        } else {
          document.querySelector('.temp').innerHTML = `The Rover name is ${response.data.photo_manifest.name} The Status of the rover ${response.data.photo_manifest.name} is ${response.data.photo_manifest.status}. ${response.data.photo_manifest.name} launched ${response.data.photo_manifest.launch_date} and landed ${response.data.photo_manifest.landing_date}. ${response.data.photo_manifest.name} has taken ${response.data.photo_manifest.total_photos} photos during it's mission. ${response.data.photo_manifest.name} has been on mission for ${response.data.photo_manifest.max_sol} Sol (Martian Days) which converts to ${solToDay(response.data.photo_manifest.max_sol)} Earth days`
        }
        count++
      })
      .catch(function (error) {
        document.querySelector('.temp').innerHTML = "Rover name not recognized."
      })
  })
  roverPhotos.addEventListener('submit',function(){
    event.preventDefault()
    let userInput = document.querySelector('.photo_input').value
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${userInput}/photos?sol=1000&camera=navcam&api_key=tLkupbIMhxOtXQta4XszZ8UmTKky1YStScmVLUt4`)
    .then(function(response){
      let image = document.createElement('img')
      let div = document.querySelector('.addImage2')
      const randomNumber = function (num) {
        return Math.floor((Math.random() * num))
      }
      const randomNum = function(input){
        if (input.toLowerCase() === 'curiosity') {
          return randomNumber(10)
        } else if (input.toLowerCase() === 'spirit') {
          return randomNumber(4)
        } else if (input.toLowerCase() === 'opportunity') {
          return randomNumber(2)
        }
      }
      if (count1 < 1) {
        image.src = response.data.photos[randomNum(userInput)].img_src
        image.style = "width: 70%"
        image.classList.add('temp1')
        div.appendChild(image)
      } else {
        document.querySelector('.temp1').src = response.data.photos[randomNum(userInput)].img_src
      }
      count1++
    })
    .catch(function(error){
      alert('Rover name not recognized')
    })
  })
})
