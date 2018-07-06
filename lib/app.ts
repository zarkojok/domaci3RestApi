import express from "express"; 
import {Request, Response} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { StudentController } from "./controllers/StudentController";

class App {
    public app : express.Application;
    public mongoDbUrl: string = 'mongodb://localhost:27017/studentssDB';
    public studentController : StudentController = new StudentController();

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.mongoConfig();
    }

    public config() : void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.static('public'));
    }

    public routes() : void{
        const router = express.Router();

        router.route('/studentss')
            .post(this.studentController.insertStudent)
            .get(this.studentController.getAllStudents)

        router.route('/bestStudentss')
            .get(this.studentController.getBestStudents)

        router.route('/studentss/:studentId')
            .get(this.studentController.getStudent)
            .delete(this.studentController.deleteStudent)
            .put(this.studentController.updateStudent)

        this.app.use('/', router);
    }

    public mongoConfig() : void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoDbUrl, (err) => {
            if (err){
                console.log('Could not connect to DB');
            }
            else{
                console.log('Connected to DB');
            }
        })
    }
}

export default new App().app;