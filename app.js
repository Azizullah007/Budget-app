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
    };

    return {
        addItem: function(type, des, val){
            var newItem, ID

            //creats new ID
            if (data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1
            } else {
                ID = 0
            }

            //Creats new item based on 'inc' or 'exp' type
            if (type === 'exp'){
                newItem = new Expence(ID, des, val)
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val)
            }
            
            //Push it into our data structure.
            data.allItems[type].push(newItem)
            
            //Return the new element.
            return newItem
        },
        testing: function(){
            console.log(data)
        }
    }

})();


// THE UI CONTROLLER
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add_type',
        inputDescription: '.add_description',
        inputValue: '.add_value',
        inputBtn: '.add_btn'
    }

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },
        getDOMstrings: function(){
            return DOMstrings
        }
    }
})();


//THE GLOBEL CONTROLLER
var controller = ( function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings()

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function(event){
                if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        })
    }


    var ctrlAddItem = function(){
        var input, newItem
        // 1. Get the field input data.
        input = UICtrl.getInput()

        // 2. Add the item to the budget controller.
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)

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