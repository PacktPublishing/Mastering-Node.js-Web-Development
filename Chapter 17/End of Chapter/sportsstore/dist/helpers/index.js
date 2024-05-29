"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplates = void 0;
const config_1 = require("../config");
const express_handlebars_1 = require("express-handlebars");
const env_helpers = __importStar(require("./env"));
const catalog_helpers = __importStar(require("./catalog_helpers"));
const cart_helpers = __importStar(require("./cart_helpers"));
const location = (0, config_1.getConfig)("templates:location");
const config = (0, config_1.getConfig)("templates:config");
const createTemplates = (app) => {
    app.set("views", location);
    app.engine("handlebars", (0, express_handlebars_1.engine)({
        ...config,
        helpers: { ...env_helpers, ...catalog_helpers, ...cart_helpers }
    }));
    app.set("view engine", "handlebars");
};
exports.createTemplates = createTemplates;
