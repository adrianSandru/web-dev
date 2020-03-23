var budgetController = (function()
{

})();

var UIController = (function()
{
    return {
        getInput : function(){
            return {
                        type : document.querySelector('.add__type').value, //returns inc or exp
                        description : document.querySelector('.add__description').value,
                        value : document.querySelector('.add__value').value
                    }

        }
    }

})();

var controller = (function(budgetCtrl, UICtr) 
{

    var ctrlAddItem = function ()
    {
        // get input data filed
        var input = UICtr.getInput();
        console.log(input);

        // add item to budget ctrl
        // update to ui
        // calculate budget
        // display budget
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) 
    {
        if(event.keyCode === 13 || event.which === 13) 
        {
            ctrlAddItem();
        } 
    });

})(budgetController, UIController);