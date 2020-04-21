// BUDGET CONTROLLER
var budgetController = (function(){

    //some code

})();


// THE UI CONTROLLER
var UIController = (function() {
    
    var DOMStrings = {
        inputType: '.add_type',
        inputDescription: '.add_description',
        inputValue: '.add_value',
        inputBtn: '.add_btn'
    }

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            }
        },
        getDOMstrings: function(){
            return DOMStrings
        }
    }
})();


//THE GLOBEL CONTROLLER
var controller = ( function(budgetCtrl, UICtrl){

    var DOM = UIController.getDOMstrings()

    var ctrlAddItem = function(){
        // 1. Get the field input data.
        var input = UICtrl.getInput()
        console.log(input)
        // 2. Add the item to the budget controller.

        // 3. Add the item to the UI.

        // 4. Claculate the budget.

        // 5. Display the budget.
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(event){

        if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }

    })


})(budgetController, UIController);


