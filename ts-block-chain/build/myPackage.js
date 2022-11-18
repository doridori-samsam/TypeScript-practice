"use strict";
// @ts-check
// we can use JsDoc
/**
 * initialize the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = exports.init = void 0;
function init(config) {
    return true;
}
exports.init = init;
/**
 * Exits the program
 * @param {number} code
 * @returns {number}
 */
function exit(code) {
    return code + 1;
}
exports.exit = exit;
