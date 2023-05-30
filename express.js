const express = require('express');
const ExpressError = require('./expressError')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


const mean = (array) => {

    let average = 0
    for(let i = 0; i < array.length; i++){
        
        average += array[i]
        
    }
      let wholeNumber = Math.round(average / array.length)
    return wholeNumber
}


function calculateMedian(arr) {
 
    const sortedArr = arr.sort((a, b) => a - b);
  
    // Get the middle index
    const middleIndex = Math.floor(sortedArr.length / 2);
  
    // Check if the array has an odd or even number of elements
    if (sortedArr.length % 2 === 0) {
      // For even-length array, average the two middle values
      const median = (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
      return median;
    } else {
      // For odd-length array, return the middle value
      const median = sortedArr[middleIndex];
      return median;
    }
  }

  function calculateMode(arr) {
    // Create an object to store the frequency of each element
    const frequencyMap = {};
  
    // Iterate over the array and count the occurrences of each element
    arr.forEach((element) => {
      if (frequencyMap[element]) {
        frequencyMap[element]++;
      } else {
        frequencyMap[element] = 1;
      }
    });
  
    // Find the element(s) with the highest frequency
    let mode = [];
    let maxFrequency = 0;
  
    for (const element in frequencyMap) {
      if (frequencyMap[element] > maxFrequency) {
        maxFrequency = frequencyMap[element];
        mode = [parseInt(element)];
      } else if (frequencyMap[element] === maxFrequency) {
        mode.push(parseInt(element));
      }
    }
  
    // Return the mode (or modes) as an array
    return mode;
  }
  

 
  


app.get('/mean', (req,res,next) => {

   const nums = req.query.nums
   console.log(nums)
   if(!nums){
      throw new ExpressError('you must pass a query key of numbers with a comma-seperated list', 400)
    }

    if(nums.length == 0){

      throw new ExpressError('nums are required', 400)
    }
   
    let numsArray =  nums.split(',').map(Number)
    
   
  
    const response =  {
        operation : 'median',
        value: mean(numsArray)
    }
    
    console.log(response)
    res.json(response)
    
})

app.get('/median', (req,res,next )=> {

    // res.send('MEDIAN PAGE')
    const nums = req.query.nums
    
    
   if(!nums ){
    throw new ExpressError('you must pass a query key of numbers with a comma-seperated list', 400)
   
    
  }
    let numsArray =  nums.split(',').map(Number)
    let median = calculateMedian(numsArray)

    const response = {
        responses :{
            operation: 'median',
            value : median
        } 
    }

    res.json(response)
})


app.get('/mode', (req,res,next)=> {

    
    const nums = req.query.nums

    
   if(!nums){
    throw new ExpressError('you must pass a query key of numbers with a comma-seperated list', 400)
  }
    let numsArray =  nums.split(',').map(Number)
    let mode = calculateMode(numsArray)

    const response = {
        responses : {
            operation: 'mode',
            value : mode
        } 
    }

    res.json(response)
})


app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});



app.listen(5000 , () => {
    console.log('App on port 5000')
});