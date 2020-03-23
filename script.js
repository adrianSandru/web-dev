
//passing functions as arguments

var year = [1990, 1993, 1934, 1324];

function arrayCalc( arr, fn) {
    var arrRes = [];
    for(var index = 0; index < arr.length; index++)
    {
        arrRes.push(fn(arr[index]));
    }

    return arrRes;
}

function calculateAge(elem)
{
    return 2020-elem;
}

function maxHeartRate(elem)
{
    return Math.round(206.9 -(0.67 * elem));
}

var arr = arrayCalc(year,calculateAge);
console.log(arr);
arr = arrayCalc(year,maxHeartRate);
console.log(arr);


//functions returning functions
function interviewQuestion(job)
{
    switch(job)
    {
        case 'designer':
        {
            return function(name) 
            {
                console.log(name + ' tell me about design!');
            }
        }
        case 'driver':
        {
            return function(name)
            {
                console.log(name + ' tell me why do you want this job');
            }
        }
    } 
}

var driverQuestion = interviewQuestion('driver');
driverQuestion('Adrian');

interviewQuestion('designer')('Mark');

//IIFE immediately invoked function expressions
(function()
{
    var score = Math.random * 10;
    console.log(score > 5);
})();

(function(args)
{
    var score = Math.random() * 10;
    console.log(score > 5 - args);
})(5);

//////////////////////////
///Closures

function retirment(retirmentAge)
{
    var a = ' years left until retirrment';
    return function(year)
    {
        var age = 2020-year;
        console.log((retirmentAge -age) +a);
    }
}

var retirmentUS = retirment(66);
retirmentUS(1990);


//bin call and apply

var jhon = 
{
    name: 'Jhon',
    age: 25,
    job: 'driver',
    presentation: function(style, timeOfDay)
    {
        if(style === 'normal')
        {
            console.log('hi i am ' + this.name + timeOfDay);
        }
        else if(style === 'friendly')
        {
            console.log('hi i am ' + this.name + 'and i have ' + this.age + timeOfDay);
        }
    }
}

var emily = 
{
    name: 'Emily',
    age:30
}
jhon.presentation('normal', 'morning');
jhon.presentation.call(emily, 'friendly', 'morning');

//jhon.presentation.apply(emily,['friendly']);
//bind an argument for a function. bind will return always a function

var jhonFriendly = jhon.presentation.bind(jhon, 'friendly');
jhonFriendly('morning');
jhonFriendly('afternnon');
