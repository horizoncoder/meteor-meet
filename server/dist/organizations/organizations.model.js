"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrganizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    adminCode: {
        type: String,
        required: true,
        unique: false,
        default: null
    },
    userCode: {
        type: String,
        required: true,
        unique: false,
        default: null
    },
    organizationOwners: {
        type: Array,
        required: true,
        unique: false,
        default: []
    },
    organizationUser: {
        type: Array,
        required: true,
        unique: false,
        default: []
    },
}, { timestamps: true });
//# sourceMappingURL=organizations.model.js.map