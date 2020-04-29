// BUDGET CONTROLLER
var budgetController = (function(){

    var Expence = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expence.prototype.calcPercentage = function(totalIncome){

        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1
        }
    }

    Expence.prototype.getPercentage = function(){
        return this.percentage
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function(type){
        var sum = 0
        data.allItems[type].forEach(function(cur){
            sum = sum + cur.value
        })
        data.totals[type] = sum
    }

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        deleteItem: function(type, id){
            var ids, index
            //id = 3
            // data.allItems[type][id]

            ids = data.allItems[type].map(function(current) {
                return current.id;
            })

            index = ids.indexOf(id)

            if (index !== -1) {
                data.allItems[type].splice(index, 1)
            }
        },

        calculateBudget: function(){

            // calculate total income and expenses.
            calculateTotal('exp')
            calculateTotal('inc')

            // Calculate the budget: income - expenses.
            data.budget = data.totals.inc - data.totals.exp

            // calculate the percentage of income that we spent.
            if (data.totals.inc > 0){
                data.percentage = Math.round ((data.totals.exp / data.totals.inc) * 100)
            } else {
                data.percentage = -1
            }
        },

        calculatePercentages: function(){

            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc)
            })
        },

        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage()
            })
            return allPerc
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        budgetLabel: '.budget_value',
        incomeLabel: '.budget_income--value',
        expensesLabel: '.budget_expenses--value',
        percentageLabel: '.budget_expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item_percentage'

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

                html = '<div class="item clearfix" id="inc-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expencesContainer

                html = '<div class="item clearfix" id="exp-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_percentage">21%</div><div class="item_delete"><button class="item_delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            // Insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID)
            el.parentNode.removeChild(el)
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

        displayBudget: function(obj){

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp

            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %'
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--'
            }
        },

        displayPercentages: function(percentages){

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel)


            var nodeListForEach = function(list, callback){
                for (var i=0; i<list.length; i++){
                    callback(list[i], i)
                }
            }

            nodeListForEach(fields, function(current, index){

                if (percentages[index] > 0){
                    current.textContent = percentages[index] + '%'
                } else {
                    current.textContent = '---'
                }
            })
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    }

    var updateBudget = function(){

        // 1. Claculate the budget.
        budgetController.calculateBudget()

        // 2. Return the budget.
        var budget = budgetCtrl.getBudget()

        // 3. Display the budget on UI.
        UICtrl.displayBudget(budget)

    }

    var updatePercentages = function(){

        // 1. calculate the percentages
        budgetCtrl.calculatePercentages()

        // 2. Read the percentages from the budgate controller
        var percentages = budgetCtrl.getPercentages()

        // 3. Update the UI with the percentages.
        UICtrl.displayPercentages(percentages)

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

            // 6. Calculate and update percentages.
            updatePercentages()

        }

    }

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id

        if (itemID) {

            //inc-1
            splitID = itemID.split('-')
            type = splitID[0]
            ID = parseInt(splitID[1])

            //1. delete the item from the data structure.
            budgetCtrl.deleteItem(type, ID)
            //2. delete the item from the UI.
            UICtrl.deleteListItem(itemID)
            //3. update and show the new budget.
            updateBudget()

            //4. calculate and update the percentages.
            updatePercentages() 

        }
    }

    return{
        init: function(){
            console.log('Application has started.')
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            setupEventListeners()
        }
    }

})(budgetController, UIController);

controller.init()