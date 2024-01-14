"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetsSchema = void 0;
const mongoose = require("mongoose");
exports.MeetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    organizationId: {
        type: String,
        required: true,
        unique: false
    },
    ownerId: {
        type: String,
        required: true,
        unique: false
    },
    joinedUsers: {
        type: (Array),
        required: true,
        unique: false
    }
}, { timestamps: true });
//# sourceMappingURL=meets.model.js.map