import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
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
    surname:{
        type: String,
        required: true,
        unique: false
    },
    roleId:{
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

// User interface
export interface User extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
}
