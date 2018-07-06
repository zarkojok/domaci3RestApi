"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var enumOcjene_1 = require("./enumOcjene");
var IspitiSchema = new mongoose_1.Schema({
    naziv: {
        type: String,
        default: 'New exam name'
    },
    ocjena: {
        type: String,
        default: 'New mark'
    }
});
var StudentSchema = new mongoose_1.Schema({
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
var Student = mongoose_2.default.model('Student', StudentSchema);
var StudentController = /** @class */ (function () {
    function StudentController() {
    }
    StudentController.prototype.insertStudent = function (req, res) {
        var newStudent = new Student(req.body);
        newStudent.save({}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    StudentController.prototype.getAllStudents = function (req, res) {
        Student.find({}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    StudentController.prototype.getBestStudents = function (req, res) {
        Student.find({}, function (err, result) {
            if (err) {
                res.send(err);
            }
            var best = new Array();
            var max1 = 0;
            var max2 = 0;
            result.forEach(function (element) {
                var ispiti = element.get("polozeniIspiti");
                var suma = 0;
                for (var i = 0; i < ispiti.length; i++) {
                    var ocj = 0;
                    for (var j = 6; j <= 10; j++) {
                        if (enumOcjene_1.EnumOcjene[j] == ispiti[i].ocjena)
                            ocj = j;
                    }
                    ;
                    suma += ocj;
                }
                var prosjek = suma / ispiti.length;
                if (prosjek > max1) {
                    max2 = max1;
                    max1 = prosjek;
                    best[1] = best[0];
                    best[0] = element;
                }
                else if (prosjek > max2) {
                    max2 = prosjek;
                    best[1] = element;
                }
            });
            res.json(best);
        });
    };
    StudentController.prototype.getStudent = function (req, res) {
        Student.findById(req.params.studentId, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
    };
    StudentController.prototype.deleteStudent = function (req, res) {
        Student.remove({ _id: req.params.studentId }, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ success: true });
        });
    };
    StudentController.prototype.updateStudent = function (req, res) {
        Student.findByIdAndUpdate(req.params.studentId, req.body, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json({ success: true });
        });
    };
    return StudentController;
}());
exports.StudentController = StudentController;
