"use strict";
var latin_map_1 = require('./latin-map');
var AutocompleteUtils = (function () {
    function AutocompleteUtils() {
    }
    AutocompleteUtils.latinize = function (str) {
        return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
            return AutocompleteUtils.latinMap[a] || a;
        });
    };
    AutocompleteUtils.escapeRegexp = function (queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    AutocompleteUtils.tokenize = function (str, wordRegexDelimiters, phraseRegexDelimiters) {
        if (wordRegexDelimiters === void 0) { wordRegexDelimiters = ' '; }
        if (phraseRegexDelimiters === void 0) { phraseRegexDelimiters = ''; }
        var regexStr = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
        var preTokenized = str.split(new RegExp(regexStr, 'g'));
        var result = [];
        var preTokenizedLength = preTokenized.length;
        var token;
        var replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');
        for (var i = 0; i < preTokenizedLength; i += 1) {
            token = preTokenized[i];
            if (token && token.length && token !== wordRegexDelimiters) {
                result.push(token.replace(replacePhraseDelimiters, ''));
            }
        }
        return result;
    };
    AutocompleteUtils.latinMap = latin_map_1.latinMap;
    return AutocompleteUtils;
}());
exports.AutocompleteUtils = AutocompleteUtils;
//# sourceMappingURL=sanitize.js.map