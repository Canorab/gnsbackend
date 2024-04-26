/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-04 19:01:30
 * @LastEditors: Joshua Eigbe jeigbe@gmail.com
 * @LastEditTime: 2024-01-31 13:58:55
 * @FilePath: /quicktickets_backend/config/corsOptions.js
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */

import { CorsOptions } from "cors";
import allowedOrigns from "./allowedOrigns";

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigns.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Access denied by CORS"));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigns.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Access denied by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
