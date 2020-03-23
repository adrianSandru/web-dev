


//function constructor
var Person = function(name, year, job)
{
    this.name = name;
    this.year = year;
    this.job = job;
}

Person.prototype.calculateAge = function () {
    console.log(2020-this.year);
}

var jhon = new Person('jhon','1990', 'driver');
console.log(jhon);
jhon.calculateAge();

//Object.create

var personProto = {
    calculateAge: function() {
        console.log(2020-this.year);
    }
};

var Jhon = Object.create(personProto);
Jhon.name = 'jhon';
Jhon.year = 1990;

var jane = Object.create(personProto,
    {
        name: {value: 'jane'},
        year: {value: '1990'},
        job: {value: 'driver'}
    });