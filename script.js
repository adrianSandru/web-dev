console.log("hello from script");

//javascript lightweight, cross-platform, obj-oriented programming language
//lightweight doesn`t eat to much from computer, easy sintax

//html responsible for content
//css responsible for presentation
//javascript dynamic effect/ programming

var firstName = 'Jhon';
var lastName = 'Smith';

var age = 20;

/*
js data types: 
Numbers, String, Boolean
Undefined: doesn`t have a value yet
Null: non existent
js has dynamic typing: data types  are automatically assigned to vars
*/

/*
js type coertion: automatically converts to the type needed
 */
console.log(firstName + ' ' + age);

//mutation
age = 'old';

// var massMark = prompt('Insert Marks mass');
// var heightMark = prompt('Insert Marks height');
// var massJhon = prompt('Insert Jhon mass');
// var heightJhon = prompt('Insert Jhon height');

// var bmiMark = massMark / (heightMark^2);
// var bmiJhon = massJhon / (heightJhon);
// console.log("Mark bmi:" + bmiMark);
// console.log("Jhon bmi:" + bmiJhon);

//falsy values: NaN - not a number, undefined, null, 0, empty string ''

var height = 10;
if( height == '10') //it works because of type coertion
    console.log('yes');

//function declaration
function calculateAge(birthYear){}

//function expression
var checkJob = function(job, name)
{
    switch(job)
    {
        case 'driver': return name + ' drives a cab in NY';
        case 'teacher': return name + ' teaches kids';
        default: return name + ' does somthing';
    }
}

console.log(checkJob('driver', 'jhonny'));

var arr = ['a', 'bv', 10, 29, true];
arr.push('ooohooo');
console.log(arr);

var bills = new Array(124, 48,  268);
var tips = [];

bills.forEach(bill => 
    {
    if(bill < 50)
        tips.push(bill * 0.2);
    else if(bill >= 50 && bill < 200)
        tips.push(bill * 0.15);
    else if(bill > 200)
        tips.push(bill * 0.1);
    });

var total = [];
for(var index = 0; index < bills.length; index++)
{
    total.push(bills[index] + tips[index]);
}
//console.log(total);

var jhon = {
    firstName: 'Jhon',
    lastName: 'Smith',
    birthDay: 1992,
    family: ['Jane', 'Mark','BoB'],
    job: 'driver',
    isMarried: true,
    calculateAge: function()
    {
        this.age = 2020-this.birthDay;
    }
}

// jhon.calculateAge();
// console.log(jhon);

var jhonny =
{
    firstName: 'Jhonny',
    lastName: 'Smith',
    bodyMass: 70,
    height: 175,
    calcBMI: function (){
        this.bmi = (this.bodyMass / (height^2));
    }
}

var Mark =
{
    firstName: 'Mark',
    lastName: 'Smith',
    bodyMass: 76,
    height: 160,
    calcBMI: function (){
        this.bmi = (this.bodyMass / (this.height^2));
    }
}
jhonny.calcBMI();
console.log(jhonny.bmi);