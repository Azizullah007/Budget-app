// BUDGET CONTROLLER
var budgetController = (function(){

    var Expence = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

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

    var setupEventListeners = function(){
        var DOM = UIController.getDOMstrings()

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function(event){
                if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        })
    }


    var ctrlAddItem = function(){
        // 1. Get the field input data.
        var input = UICtrl.getInput()
        // 2. Add the item to the budget controller.

        // 3. Add the item to the UI.

        // 4. Claculate the budget.

        // 5. Display the budget.
    }

    return{
        init: function(){
            console.log('Application has started.')
            setupEventListeners()
        }
    }

})(budgetController, UIController);

controller.init()