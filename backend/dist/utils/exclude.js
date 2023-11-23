"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exclude(user, keys) {
    if (Array.isArray(user)) {
        // If it's an array of users, exclude the specified keys from each user
        return user.map((singleUser) => Object.fromEntries(Object.entries(singleUser).filter(([key]) => !keys.includes(key))));
    }
    else {
        // If it's a single user, exclude the specified keys from that user
        return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
    }
}
exports.default = exclude;
