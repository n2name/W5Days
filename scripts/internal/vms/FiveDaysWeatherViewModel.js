W5D.VM.FiveDaysWeatherViewModel = function (apiKey) {
    var ForecastCacheString = "W5D.ForecastCache"; // local storage key for cache
    var _apiKey = apiKey; // Dark Sky api key
    var self = this;

    // model for coordinates, timestamp and 5 days of forecast data
    function dataModel() {
        this.latitude = null,
        this.longitude = null,
        this.lastUpdated = null,
        this.forecastData = []
    }

    self.Error = ko.observable(""); // error message container
    self.DataModel = ko.observable(new dataModel()); // data container

    // UI will hit this code. Since 
    // No unit test for this method since 'navigator.geolocation' is not mockable in non-UI version test runner.  
    self.GetFiveDayForecast = function () {
        self.Error("Loading...");
        if (!navigator.geolocation) {
            self.Error("Your browser is not support geo-location feature.");
            return false;
        }
        var success = function (position) { self.GetForecastData(position); };
        var failed = function (error) { self.Error("Please enable geo-location feature to detect your location in your browser."); }
        navigator.geolocation.getCurrentPosition(success, failed);

        return true;
    }

    // process:
    // is cached data available?
    // if yes, get them and return back
    // otherwise, call Dark Sky api to get the latest data and store the data into cache 
    self.GetForecastData = function (position) {
    
        // check cache and use it if available.
        var cacheData = self.GetCacheData();
        if (cacheData) {
            self.DataModel(cacheData);
        }

        var dataModel = self.DataModel();

        // update model if it need to be updated
        if (self.RequireToUpdateData(position, dataModel)) {
            dataModel.lastUpdated = Date.now();
            dataModel.latitude = position.coords.latitude;
            dataModel.longitude = position.coords.longitude;

            var url = "https://api.forecast.io/forecast/" + _apiKey + "/" + dataModel.latitude + "," + dataModel.longitude;

            // call Dark Sky api
            JSONP(url, function (json) {
                dataModel.forecastData = json.daily.data.slice(0, 5); // get only 5 days of forecasts
                self.SaveCacheData(dataModel); // also save data into the local storage
                self.DataModel(dataModel); // refresh the data!
                self.Error(""); // clear error message
            });
        } else {
            self.Error(""); // clear error message
        }
    }

    // function that make a decision to update the model or not
    self.RequireToUpdateData = function (position, dataModel) {
        var diifferentLocation = dataModel.longitude !== position.coords.longitude || dataModel.latitude !== position.coords.latitude;
        var timeToUpdate = (Date.now() - dataModel.lastUpdated) > 60 * 60 * 1000; // true if the last data updated more than one hour ago

        return diifferentLocation || timeToUpdate;
    }

    // function that save data into the local storage
    self.SaveCacheData = function (data) {
        localStorage.setItem(ForecastCacheString, JSON.stringify(data));
    }

    // function that returns data from the local storage
    self.GetCacheData = function () {
        var cacheString = localStorage.getItem(ForecastCacheString);
        if (cacheString !== "undefined" && cacheString) {
            return JSON.parse(cacheString);
        }
        return null;
    }

    // get formated date from tick returned by Dark Sky api 
    self.GetDateFormat = function (tick) {
        if (typeof(tick) !== "number" || tick < 1) {
            return "Not a valid date";
        }
        var date = new Date(tick * 1000);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return month + "/" + day + "/" + year + " " + getDayOfWeek(date.getDay()) + "";
    }

    // get day of week string by index
    function getDayOfWeek(index) {
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index];
    }

    // initializer 
    self.Init = function () {
        self.GetFiveDayForecast();
    }

    // launch!
    self.Init();
}