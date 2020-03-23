var budgetController = (function()
{

    var Expense = function(id, description, value)
    {
        this.id = id;
        this.description =description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome)
    {
        if(totalIncome > 0)
        {
            this.percentage = Math.round((this.value / totalIncome)*100);
        }
        else
        {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function()
    {
        return this.percentage;
    };

    var Income = function(id, description, value)
    {
        this.id = id;
        this.description =description;
        this.value = value;
    };

    var calculateTotal = function(type)
    {
        var sum = 0;
        data.allItems[type].forEach(function(current)
        {
            sum += current.value; 
        });

        data.totals[type] = sum;
    }
     var data = 
     {
        
        allItems: 
        {
            exp: [],
            inc: []
        },

        totals: 
        {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, desc, val) {
            var newItem, ID;
            
            if(data.allItems[type].length === 0)
            {
                ID = 0;
            }
            else
            {
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            }
                   

            if(type === 'exp')
            {
                newItem = new Expense(ID, desc, val);
            }else if(type === 'inc')
            {
                newItem = new Income(ID, desc, val);
            }

            data.allItems[type].push(newItem);

            return newItem;
        },

        deleteItem: function(type, id)
        {
            data.allItems[type].map(function(current)
            {
                var ids, index;

                //get all the ids from the array
                ids = data.allItems[type].map(function(current)
                {
                    return current.id;
                });

                //get the correct index of the id recieved as argument
                index = ids.indexOf(id);

                if(index !== -1)
                {
                    //delete
                    //remove at index, 1 element
                    data.allItems[type].splice(index, 1);
                }
            });
        },

        calculateBudget: function()
        {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the buget : inc - exp
            data.budget =  data.totals.inc - data.totals.exp;

            //calculate percentage of income that we spent
            if(data.totals.inc > 0)
            {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else
            {
                data.percentage = -1;
            }
            
        },

        calculatePercentages: function()
        {
            data.allItems.exp.forEach(function(current)
            {
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function()
        {
            var allPercentages = data.allItems.exp.map(function(current)
            {
                return current.getPercentage();
            });

            return allPercentages;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function ()
        {
            console.log(data);
        }
    };

})();


var UIController = (function()
{

    var DOMstrings = 
    {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage'
    }
    return {
        getInput : function ()
        {
            return{
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem: function(obj, type) 
        {

            var html, newHtml, element;
            
            //create html with placeholder text
            if(type === 'inc')
            {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }
            else if(type === 'exp')
            {
                element = DOMstrings.expensesContainer;
                html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //replace the placehoder text with some data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            //insert the html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorId)
        {
            var element = document.getElementById(selectorId);
            element.parentNode.removeChild(element);
        },

        clearFields : function () 
        {
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            var arrFields = Array.prototype.slice.call(fields);
            arrFields.forEach(function(current, index, array)
            {
                current.value = "";
                current.description = "";
            });

            arrFields[0].focus();
        },

        displayBudget: function(obj)
        {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if(obj.percentage > 0)
            {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else
            {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages)
        {
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

            var nodeListForEach = function (list, callback)
            {
                for(var i = 0; i < list.length; i++)
                {
                    callback(list[i],i);
                }
            };

            nodeListForEach(fields, function(current, index)
            {
                if(percentages[index] > 0)
                {
                    current.textContent = percentages[index] + '%';
                }
                else
                {
                    current.textContent = '---';
                }
                
            });
        },
        getDOMStrings: function()
        {
            return DOMstrings;
        }
    }
})();


var controller = (function(budgetCtr, UIctr)
{

    var setupEventListeners = function()
    {
        var DOM = UIctr.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event)
        {
            if(event.keyCode === 13 || event.which === 13)
            {
                ctrlAddItem();
            }
        });

        //add event delegation
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };
    
    var updateBudget = function()
    {
        // calc budget
        budgetCtr.calculateBudget();

        //return the new budget
        var budget = budgetCtr.getBudget();

        //display the budget
        UIctr.displayBudget(budget);
    }

    var updatePercentages = function()
    {
        // calculate parcentages
        budgetCtr.calculatePercentages();
        //read them from budget ctrl
        var percentages = budgetCtr.getPercentages();
        //update ui
        UIctr.displayPercentages(percentages);
    };

    var ctrlAddItem = function()
    {
        //get input data
        var input = UIctr.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0)
        {
            //add item into budget controller
            var item = budgetCtr.addItem(input.type, input.description, input.value);
            
            //update the ui with the new item
            UIctr.addListItem(item, input.type);
            
            //clear the input fields
            UIctr.clearFields();

            //calculate and display the budget
            updateBudget();

            updatePercentages();
        }

    };

    var ctrlDeleteItem = function(event)
    {
        var itemID, id, splitID;
        //TODO: find a better way to get the parent node
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    
        if(itemID)
        {
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);
            console.log(type + id);
            //delete item from ds
            budgetCtr.deleteItem(type,id);
            //delete item from ui
            UIctr.deleteListItem(itemID);
            // update and display the new buget
            updateBudget();
            
            updatePercentages();
        }
    };

    return {
        init: function() {
            console.log('app started');
            setupEventListeners();
            UIctr.displayBudget(budget = 0, 
                                totalInc = 0,
                                totalExp = 0,
                                percentage = -1
                                );
        }
    };

})(budgetController, UIController);

controller.init();