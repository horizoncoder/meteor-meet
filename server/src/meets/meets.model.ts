import * as mongoose from 'mongoose';

export const MeetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },

    organizationId:{
        type: String,
        required: true,
        unique: false
    },
    ownerId:{
        type: String,
        required: true,
        unique: false
    },
    joinedUsers:{
        type: Array<any>,
        required: true,
        unique: false
    }

}, { timestamps: true });

export interface Meets extends mongoose.Document {
    _id: string;
    name: string;
    organizationId: string;
    ownerId:string;
    joinedUsers: Array<any>
}
