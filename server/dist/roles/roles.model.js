"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = void 0;
const mongoose = require("mongoose");
exports.RoleSchema = new mongoose.Schema({
    roleId: {
        type: Number,
        required: true,
        unique: false
    },
    roleName: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });
//# sourceMappingURL=roles.model.js.map