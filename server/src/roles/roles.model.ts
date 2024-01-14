import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
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

// User interface
export interface Role extends mongoose.Document {
    _id: string;
    roleId: number;
    roleName: string;
}
