var yelp = Yelp.createClient(Meteor.settings.yelpAPI);

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
                    obj.id = data.businesses[i].id;
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
    
    countMeIn: function(id) {
        if (!id) {
            throw new Meteor.errow(400, "Bad Request");
        }
        
        var user;
        if (Meteor.userId()) {
            user = Meteor.userId();
        } else {
            user = (this.connection.httpHeaders["x-forwarded-for"]).split(",")[0];
        }
        
        var targetUser = UserGoing.findOne({"user": user});
        var targetBar = Bars.findOne({"bar": id});
        
        if (!targetUser) {
            UserGoing.insert({user: user, goingPlaces: []});
            targetUser = UserGoing.findOne({"user": user});
        }
        
        
        if (targetUser.goingPlaces.indexOf(id) === -1) {
            UserGoing.update(targetUser, {$push: {goingPlaces: id}});
            if (targetBar) {
                return Bars.update(targetBar, {$inc: {goingCount: 1}});
            } else {
                return Bars.insert({bar: id, goingCount: 1});
            }
        } else {
            if (Meteor.userId()) {
                UserGoing.update(targetUser, {$pull: {goingPlaces: id}});
                return Bars.update(targetBar, {$inc: {goingCount: -1}});
            } else {
                return true;
            }
        }
    },
    
    getBarsGoingCount: function (idArr) {
        var result = [];
        for (var i =0; i < idArr.length; i++) {
            var targetBar = Bars.findOne({bar: idArr[i]});
            if (targetBar) {
                result.push(targetBar.goingCount);
            } else {
                result.push(0);
            }
        }
        return result;
    },
    
    getMyGoingPlaces: function () {
        var user;
        if (Meteor.userId()) {
            user = Meteor.userId();
        } else {
            user = (this.connection.httpHeaders["x-forwarded-for"]).split(",")[0];
        }
        var me = UserGoing.findOne({"user": user});
        if (me) {
            return me.goingPlaces;
        } else {
            return [];
        }
    }
    
});