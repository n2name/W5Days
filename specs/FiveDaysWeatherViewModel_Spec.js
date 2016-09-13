describe("FiveDaysWeatherViewModel Class", function() {
	
	describe("GetForecastData Method", function () {
        it("should return current position", function () {
            // arrange
            var model = new W5D.VM.FiveDaysWeatherViewModel();
            var positionMock = { coords: { latitude: 42, longitude: 121 } };
            model.SaveCacheData = function () { };  // prevent save any data to local storage
            model.GetCacheData = function () { return null; };

            // act
            model.GetForecastData(positionMock);
		    var result = model.DataModel().forecastData;

            // assert
			expect(result.length).toEqual(5);
        });

	});

	describe("RequireToUpdateData Method", function () {

	    it("should return true when last updated was null", function () {
	        // arrange
	        var model = new W5D.VM.FiveDaysWeatherViewModel();
	        var positionMock = { coords: { latitude: 42, longitude: 121 } };
	        var dataModel = {
	            latitude: 1,
	            longitude: 1,
	            lastUpdated: null,
	            forecastData: []
	        };

	        // act
	        var result = model.RequireToUpdateData(positionMock, dataModel);

	        // assert
	        expect(result).toBe(true);
	    });

	    it("should return false when updated less than an hour ago", function () {
	        // arrange
	        var model = new W5D.VM.FiveDaysWeatherViewModel();
	        var positionMock = { coords: { latitude: 42, longitude: 121 } };
	        var dataModel = {
	            latitude: 1,
	            longitude: 1,
	            lastUpdated: Date.now(),
	            forecastData: []
	        };

	        // act
	        var result = model.RequireToUpdateData(positionMock, dataModel);

	        // assert
	        expect(result).toBe(false);
	    });
	    it("should return true when updated more than an hour ago", function () {
	        // arrange
	        var model = new W5D.VM.FiveDaysWeatherViewModel();
	        var positionMock = { coords: { latitude: 42, longitude: 121 } };
	        var dataModel = {
	            latitude: 1,
	            longitude: 1,
	            lastUpdated: Date.now() - (60 * 60 * 1000 + 1),
	            forecastData: []
	        };

	        // act
	        var result = model.RequireToUpdateData(positionMock, dataModel);

	        // assert
	        expect(result).toBe(true);
	    });
	});
	
	describe("RequireToUpdateData Method", function () {

	    it("should return error message when a wrong data provided", function () {
	        // arrange
	        var model = new W5D.VM.FiveDaysWeatherViewModel();
			var tick = "wrong data";

			// act
			var result = model.GetDateFormat(tick);

	        // assert
	        expect(result).toBe("Not a valid date");
	    });
		
	    it("should return error message when input less than one", function () {
	        // arrange
	        var model = new W5D.VM.FiveDaysWeatherViewModel();
			var tick = 0;

			// act
			var result = model.GetDateFormat(tick);

	        // assert
	        expect(result).toBe("Not a valid date");
	    });

	    it("should return proper date format when a valid tick provided", function () {
	        // arrange
	        var model = new W5D.VM.FiveDaysWeatherViewModel();
			var tick = 1473577200;

			// act
			var result = model.GetDateFormat(tick);

	        // assert
	        expect(result).toBe("9/11/2016 Mon");
	    });
	});
});