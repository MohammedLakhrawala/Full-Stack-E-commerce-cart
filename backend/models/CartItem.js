import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true
    },
    qty: { 
        type: Number, 
        required: true, 
        min: 1 
    },
}, { _id: true });