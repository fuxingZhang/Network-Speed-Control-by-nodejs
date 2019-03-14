# Network-Speed-Control-by-nodejs
display how to use nodejs control network speed

## use readable event listener  
> ./router/readable.js  
> ./router/readable.global.js  

## user data evnet listener 
> ./router/data.js  
> ./router/data.global.js  

## basic example  
> ./router/readable.js  
> ./router/data.js  

## cross process example  
> ./router/readable.global.js  
> ./router/data.global.js  

## timer  
user timer reset data
> ./service/timer.js  

The actual production environment should: 
1. Create a new process
2. Regularly modify the data in redis
