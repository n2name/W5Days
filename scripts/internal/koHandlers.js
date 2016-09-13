// Knockout js custom binding handlers 

ko.bindingHandlers.skyIcon = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var data = bindingContext.$data;  // get the binding context
        W5D.skycons.add(element, data.icon); // apply the skycon to the current element
    }
};