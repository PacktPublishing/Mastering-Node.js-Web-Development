"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currency = exports.highlight = exports.categoryButtons = exports.pageSizeOptions = exports.pageButtons = exports.escapeUrl = exports.navigationUrl = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const querystring_1 = require("querystring");
const querystring_2 = require("querystring");
const getData = (options) => {
    return { ...options.data.root, ...options.hash };
};
const navigationUrl = (options) => {
    const { page, pageSize, category, searchTerm } = getData(options);
    return "/?" + (0, querystring_1.stringify)({ page, pageSize, category, searchTerm });
};
exports.navigationUrl = navigationUrl;
const escapeUrl = (url) => (0, querystring_2.escape)(url);
exports.escapeUrl = escapeUrl;
const pageButtons = (options) => {
    const { page, pageCount } = getData(options);
    let output = "";
    for (let i = 1; i <= pageCount; i++) {
        output += options.fn({
            page, pageCount, index: i, selected: i === page
        });
    }
    return output;
};
exports.pageButtons = pageButtons;
const pageSizeOptions = (options) => {
    const { pageSize } = getData(options);
    let output = "";
    [3, 6, 9].forEach(size => {
        output += options.fn({ size,
            selected: pageSize === size ? "selected" : "" });
    });
    return output;
};
exports.pageSizeOptions = pageSizeOptions;
const categoryButtons = (options) => {
    const { category, categories } = getData(options);
    let output = "";
    for (let i = 0; i < categories.length; i++) {
        output += options.fn({
            id: categories[i].id,
            name: categories[i].name,
            selected: category === categories[i].id
        });
    }
    return output;
};
exports.categoryButtons = categoryButtons;
const highlight = (value, options) => {
    const { searchTerm } = getData(options);
    if (searchTerm && searchTerm !== "") {
        const regexp = new RegExp(searchTerm, "ig");
        const mod = value.replaceAll(regexp, "<strong>$&</strong>");
        return new handlebars_1.default.SafeString(mod);
    }
    return value;
};
exports.highlight = highlight;
const formatter = new Intl.NumberFormat("en-us", {
    style: "currency", currency: "USD"
});
const currency = (value) => {
    return formatter.format(value);
};
exports.currency = currency;
