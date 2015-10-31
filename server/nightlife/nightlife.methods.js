var yelp = Meteor.npmRequire("yelp").createClient(Meteor.settings.yelpAPI);

Meteor.methods({
    
    yelpSearch: function (loc) {
        var limitNum = 20;
        var yelpCall = Async.runSync(function (done) {
            yelp.search({category_filter: "bars", limit: limitNum, location: loc}, function (error, data) {
                var businesses = [];
                if (error) {
                    done(error);
                }
                for (var i = 0; i < limitNum; i++) {
                    var obj = {};
                    obj.name = data.businesses[i].name;
                    obj.image = data.businesses[i].image_url;
                    obj.text = data.businesses[i].snippet_text;
                    obj.url = data.businesses[i].url;
                    businesses.push(obj);
                }
                done(null, businesses);
            });
        });
        return yelpCall.result;
    },
    
    getUserGoing: function () {
        
    }
    
});