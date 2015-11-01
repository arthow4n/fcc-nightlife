Bars.allow({
    insert: function (userId, bar) {
        return false;
    },
    update: function (userId, bar, fields, modifier) {
        return false;
    },
    remove: function (userId, bar) {
        return false;
    }
});
UserGoing.allow({
    insert: function (userId, list) {
        return false;
    },
    update: function (userId, list, fields, modifier) {
        return false;
    },
    remove: function (userId, list) {
        return false;
    }
});