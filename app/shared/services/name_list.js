"use strict";
var NameList = (function () {
    function NameList() {
        this.names = [
            'Meeting with Nabindar Singh.',
            'Exercise at 6:pm with Nicholas.',
            'Avengers Age of Ultron.',
            ' Henna birthday at Mezbaan.'
        ];
    }
    NameList.prototype.get = function () {
        return this.names;
    };
    NameList.prototype.add = function (value) {
        this.names.push(value);
    };
    return NameList;
}());
exports.NameList = NameList;
//# sourceMappingURL=name_list.js.map