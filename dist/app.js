"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var StudentController_1 = require("./controllers/StudentController");
var App = /** @class */ (function () {
    function App() {
        this.mongoDbUrl = 'mongodb://localhost:27017/studentssDB';
        this.studentController = new StudentController_1.StudentController();
        this.app = express_1.default();
        this.config();
        this.routes();
        this.mongoConfig();
    }
    App.prototype.config = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static('public'));
    };
    App.prototype.routes = function () {
        var router = express_1.default.Router();
        router.route('/studentss')
            .post(this.studentController.insertStudent)
            .get(this.studentController.getAllStudents);
        router.route('/bestStudentss')
            .get(this.studentController.getBestStudents);
        router.route('/studentss/:studentId')
            .get(this.studentController.getStudent)
            .delete(this.studentController.deleteStudent)
            .put(this.studentController.updateStudent);
        this.app.use('/', router);
    };
    App.prototype.mongoConfig = function () {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(this.mongoDbUrl, function (err) {
            if (err) {
                console.log('Could not connect to DB');
            }
            else {
                console.log('Connected to DB');
            }
        });
    };
    return App;
}());
exports.default = new App().app;
