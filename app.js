/* 

what you will learn the first lesson
. how to use the module pattern;
. More about private and public data, encapsulation and separation of concerns.

*/

var budgetController = (function(){

    var x = 23

    var add = function(a){
        return x + a
    }

    return {
        publicTest: function(b){
            return add(b)
        }
    }

})();


var UIController = (function() {
    //some code
})();


var controller = ( function(budgetCtrl, UICtrl){

    var z = budgetCtrl.publicTest(20)

    return {
        anotherPublic: function(){
            console.log(z)
        }
    }

})(budgetController, UIController);