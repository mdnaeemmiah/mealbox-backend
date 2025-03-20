"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../app/modules/auth/auth.route"));
const custumer_route_1 = __importDefault(require("../app/modules/custumer/custumer.route"));
const mealProvider_route_1 = __importDefault(require("../app/modules/mealProvider/mealProvider.route"));
const postPreference_route_1 = __importDefault(require("../app/modules/PostPreference/postPreference.route"));
const order_route_1 = __importDefault(require("../app/modules/order/order.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/customer',
        route: custumer_route_1.default,
    },
    {
        path: '/mealProvider',
        route: mealProvider_route_1.default,
    },
    {
        path: '/postPreference',
        route: postPreference_route_1.default,
    },
    {
        path: '/order',
        route: order_route_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
