"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("src/db");
const env_1 = __importDefault(require("./env"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./routes/user"));
const domain_1 = __importDefault(require("./routes/domain"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const stats_1 = __importDefault(require("./routes/stats"));
const app = (0, express_1.default)();
const PORT = env_1.default.PORT || 5001;
console.log(env_1.default.NODE_ENV);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.status(200).send({ message: "We're Live" });
});
app.use("/api/auth", auth_1.default);
app.use("/api/users", user_1.default);
app.use("/api/domains", domain_1.default);
app.use("/api/stats", stats_1.default);
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path_1.default.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    }
    else {
        res.type("txt").send("404 Not Found");
    }
});
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
