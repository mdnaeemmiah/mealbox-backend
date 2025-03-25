"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const OrderSchema = new Schema<IOrder>(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "Customer",
//     },
//     products: [
//       {
//         product: {
//           type: Schema.Types.ObjectId,
//           ref: "MealProviderModel",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
//       default: "Pending",
//     },
//     transaction: {
//       id: String,
//       transactionStatus: String,
//       bank_status: String,
//       sp_code: String,
//       sp_message: String,
//       method: String,
//       date_time: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "MealProvider",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
