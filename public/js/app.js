console.clear()
console.log('Client side javascript is loaded ...')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
search.value = ''

messageOne.textContent = 'No forecast matches'

weatherForm.addEventListener('submit', (e) => {
      e.preventDefault()
      console.clear()
      const location = search.value
      messageOne.textContent = 'Loading ...'
      messageTwo.textContent = ''
      fetch('http://localhost:3000/weather?adress=' + location).then((res) => {
            res.json().then((data) => {
                  if (data.error) {
                        messageOne.textContent = 'No forecast matches'
                        messageTwo.textContent = data.error
                  } else {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                  }
            })
      })
})