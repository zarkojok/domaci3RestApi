
import { Schema, MongooseDocument } from "mongoose";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { MongoError } from "mongodb";
import { EnumOcjene} from "./enumOcjene";


const IspitiSchema = new Schema({
    naziv: {
        type: String,
        default: 'New exam name'
    },
    ocjena: {
        type: String,
        default: 'New mark'
    }
});

const StudentSchema = new Schema({
    ime: {
        type: String,
        default: 'New name'
    },
    prezime: {
        type: String,
        default: 'New surname'
    },
    brIndexa: {
        type: String,
        default: 'New register number'
    },
    polozeniIspiti: {
        type: [IspitiSchema],

    }
});

const Student = mongoose.model('Student', StudentSchema);

export class StudentController {

    public insertStudent(req:Request, res:Response):void{
        let newStudent = new Student(req.body);
        newStudent.save({}, (err:MongoError, result:MongooseDocument) => {
            if (err) {
                res.send(err);
            }
            res.json(result);
        })
    }

    public getAllStudents(req:Request, res:Response){
        Student.find({}, (err, result) => {
            if (err){
                res.send(err);
            }
            res.json(result);
        })
    }

    public getBestStudents(req:Request, res:Response){
        Student.find({}, (err, result) => {
            if (err){
                res.send(err);
            }

            let best:MongooseDocument[] = new Array();
            let max1:number=0;
            let max2:number=0;
            result.forEach(element => {
                let ispiti = element.get("polozeniIspiti");
                let suma:number=0;
                for (let i:number=0; i<ispiti.length; i++){
                    let ocj:number = 0;
                    for (let j:number=6; j<=10; j++){
                        if (EnumOcjene[j] == ispiti[i].ocjena) ocj=j;
                    };
                    suma += ocj;
                }
                let prosjek:number = suma/ispiti.length;
                if (prosjek>max1){
                    max2=max1;
                    max1=prosjek;
                    best[1] = best[0];
                    best[0] = element;
                }
                else if (prosjek>max2){
                    max2=prosjek;
                    best[1] = element;
                }
            })
            res.json(best);

        })
    }

    public getStudent(req:Request, res:Response){
        Student.findById(req.params.studentId, (err, result) => {
            if(err){
                res.send(err);
            }
            res.json(result);
        })
    }

    public deleteStudent(req:Request, res:Response){
        Student.remove({_id:req.params.studentId}, (err) => {
            if (err){
                res.send(err);
            }
            res.json({success: true});
        })
    }

    public updateStudent(req:Request, res:Response){
        Student.findByIdAndUpdate(req.params.studentId, req.body, (err, result) => {
            if(err){
                res.send(err);
            }
            res.json({success:true});
        })
    }
}