const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
search.value = ''

messageOne.textContent = 'No forecast matches'

weatherForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const location = search.value
      messageOne.textContent = 'Loading ...'
      messageTwo.textContent = ''
      fetch('/weather?adress=' + location).then((res) => {
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