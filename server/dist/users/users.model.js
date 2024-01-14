"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true,
        unique: false
    },
    roleId: {
        type: Number,
        required: true,
        unique: false,
        default: 1
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });
//# sourceMappingURL=users.model.js.map