# Network-Speed-Control-by-nodejs
display how to use nodejs control network speed  
使用nodejs限制网速，此示例展示控制下载文件的网速

## use readable event listener  
> ./router/readable.js  
> ./router/readable.global.js  

## use data event listener 
> ./router/data.js  
> ./router/data.global.js  

## basic example  
基础示例
> ./router/readable.js  
> ./router/data.js  

## cross process example  
跨进程示例
> ./router/readable.global.js  
> ./router/data.global.js  

## timer  
使用timer每秒重置total

> ./service/timer.js  

生产环境 
1. 创建一个单独的进程给timer
2. 每秒修改Redis中的数据
