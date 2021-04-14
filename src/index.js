let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  let collection = document.querySelector('#toy-collection')
  let form = document.querySelector('.add-toy-form')

  
  
  //Get toy list from back-end
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(theToy => {
      theToy.forEach(function(toyList){ 
        showCard(toyList)
      })
    })
  
  //Create new toy list
  
  form.addEventListener('submit', (evt) => {
    let inputName = evt.target.querySelector('input[name=name]').value
    let inputImag = evt.target.querySelector('input[name=image]').value
    evt.preventDefault() 
    console.log("Hello")
    console.log(inputName)
    console.log(inputImag)
  
   fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : inputName,
        image : inputImag,
        likes : 0
      })
    })
    .then(res => res.json())
    .then(newToy => {
      showCard(newToy)
    })
  })
  
  
  //Create toy list
    function showCard(toyCard){
  
      let card = document.createElement('div')
      card.className = 'card'
  
      let titles = document.createElement('h2')
      titles.innerText = toyCard.name
  
      let imgTag = document.createElement('img')
      imgTag.className = 'toy-avatar'
      imgTag.src = toyCard.image
  
      let likeButton = document.createElement('button')
      likeButton.innerText = 'like 3<'
      likeButton.id = toyCard.id
      likeButton.className = 'like-btn'
  
      let pTag = document.createElement('p')
      pTag.innerText = `${toyCard.likes} Likes` 
  
      card.append(titles, imgTag, pTag, likeButton)
      collection.append(card)
  
      likeButton.addEventListener('click', (evt) => {
        fetch(`http://localhost:3000/toys/${toyCard.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({likes: toyCard.likes += 1})
        })
        .then(response => response.json())
        .then(increaseLikes => {
          pTag.innerText = `${increaseLikes.likes} Like`
          toyCard.likes = increaseLikes.likes
        })
      })
    }
});


