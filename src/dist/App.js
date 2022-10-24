"use strict";
exports.__esModule = true;
var react_1 = require("react");
var App_module_css_1 = require("./App.module.css");
console.log('styles', App_module_css_1["default"]);
function App() {
    return (react_1["default"].createElement("div", { className: App_module_css_1["default"].App },
        react_1["default"].createElement("header", { className: App_module_css_1["default"]['App-header'] }, "who am i")));
}
exports["default"] = App;
