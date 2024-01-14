
import { Schema, Document } from 'mongoose'
export const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    adminCode:{
        type: String,
        required: true,
        unique: false,
        default: null
    },
    userCode:{
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
    organizationUser:{
        type:Array,
        required: true,
        unique: false,
        default: []
    },

}, { timestamps: true });

export interface Organization extends Document {
    _id: string;
    userCode:string;
    adminCode:string;
    name:string;
    organizationOwners:Array<any>;
    organizationUser: Array<any>;
}
