import mongoose from "mongoose";
import { cartItemSchema } from "./CartItem.js";

const cartSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true, 
        index: true 
    }, // mock single user for now
    items: { 
        type: [cartItemSchema], 
        default: [] 
    }
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);