console.log("Shayyyyy")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''

    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageSecond.textContent = data.forecast
            }
        })
    })
})