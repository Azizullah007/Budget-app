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
        inputBtn: '.add_btn',
        incomeContainer: '.income_list',
        expencesContainer: '.expenses_list',        

    }

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat (document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem: function(obj, type){
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer

                html = '<div class="item clearfix" id="income-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expencesContainer

                html = '<div class="item clearfix" id="expense-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_percentage">21%</div><div class="item_delete"><button class="item_delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            // Insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)

            fieldsArr = Array.prototype.slice.call(fields)

            fieldsArr.forEach(function(current, index, array){
                current.value = ""
            })

            fieldsArr[0].focus()
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

    var updateBudget = function(){

        // 1. Claculate the budget.


        // 2. Return the budget.

        // 3. Display the budget on UI.

    }

    var ctrlAddItem = function(){
        var input, newItem
        // 1. Get the field input data.
        input = UICtrl.getInput()

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. Add the item to the budget controller.
            newItem = budgetCtrl.addItem(input.type, input.description, input.value)

            // 3. Add the item to the UI.
            UICtrl.addListItem(newItem, input.type)

            // 4. Clear the text field.
            UICtrl.clearFields()

            //5. Calculate and update budget.
            updateBudget();
        }

    }

    return{
        init: function(){
            console.log('Application has started.')
            setupEventListeners()
        }
    }

})(budgetController, UIController);

controller.init()