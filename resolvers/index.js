'use strict';

import userResolver from "./userResolver.js";
import gameResolver from './gameResolver.js';
import reviewResolver from "./reviewResolver.js";
import commentResolver from "./commentResolver.js";

export default [
    userResolver,
    gameResolver,
    reviewResolver,
    commentResolver
];