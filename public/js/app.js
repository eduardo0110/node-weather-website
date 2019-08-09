console.log('client side javascript is loaded')

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then(  (data)  => {
        if(data.error) {
            console.log("unable to get the forecast try another time")
        }else  {console.log(data)}
        
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const messageOne =document.querySelector('#messageOne')
const messageTwo= document.querySelector('#messageTwo')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
   
  messageTwo.textContent = ''
  messageOne.textContent = 'Loading'

    fetch('/weather?address=' + location ).then((response) => {
    response.json().then(  (data)  => {
        if(data.error) {
           messageOne.textContent = data.error
        }else  {
            
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                
        }
        
    })
})
    

})