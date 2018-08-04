import { clamp } from "ionic-angular/util/util";

export class api {
    public readonly apibaseurl: string = 'http://localhost:58587';
}
export class apiurls {
    public readonly ClassUrl: string = 'MobileAppClassData';
}

export class AppContext {
    BaseURL: string;
    ShopID: number;
    ShopKey: string;
    User: User;
    //OfflineRailCarData:OfflineRailCar[];
    constructor() {
        //this.User = new User();
        //this.OfflineRailCarData = [];
    }
}
export class User {
    // constructor() {
    //     this.UserLocations = [];  
    // }

    Email: string;
    EmployeeID: number;
    Name: string;
    ID: number;
    FirstName: string;
    LastName: string;
    ShopKey: string;
    IsAuthenticated: boolean;
    AuthToken: string;
    TokenExpiresIn: number;
    TokenType: string;
    //UserLocations: Location[]
}

export class ClassData {
    ClassID: number;
    Code: string;
    Name: string;
    Description: string;
    Section: MSRelayAddress;
    classTeacher: string;
    NoofStudents: number;
    ClassLeader: string;
}
export class Students {
    StudentID: number;
    FirstName: string;
    LastName: string;
    FatherName: string;
    MotherName: string;
    Phone: string;
    Email: string;
    ClassID: number;
    JoiningDate: Date;
    Address: string;
    Comments: string;
    AcademicYear: string;
    Active: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    LastModifiedBy: string;
    LastModifiedDate: Date;
    RollNumber: number;
    AdmissionNumber: string;
    Password: string;
    HostelFacility: boolean;
    TransportFacility: boolean;
}
export class MobileAttnResponse {
    Students: ClassAttendence[];
    IsSubmitted: boolean;
}
export class ClassAttendence {
    StudentID: number;
    RollNumber: number;
    AdmissionNumber: string;
    ClassID: number;
    FirstName: string;
    LastName: string;
    IsPresent: boolean;
    IsAttnDone: string
}
export class AuthResponse {
    Status: string;
    Message: string;
    UserID: string;
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
}
export class FeeComponents {
    FeeComponentID: number;
    Name: string;
    Description: string;
    Active: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    LastModifiedBy: string;
    LastModifiedDate: Date;
}
export class FeeComponentData {
    FeeComponentID: number;
    Name: string;
    Description: string;
}
export class FeeTerms {
    TermID: number;
    TermName: string;
    Description: string;
    Active: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    LastModifiedBy: string;
    LastModifiedDate: Date;
}
export class FeeTermsData {
    TermID: number;
    TermName: string;
    Description: string;
}
//Expense Mgr
export class ExpenseType {
    ExpenseTypeID: number;
    Name: string;
    Description: string;
    Active: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    LastModifiedBy: string;
    LastModifiedDate: Date;
}
export class Expenses {
    ExpenseID: number;
    ExpenseTypeID: number;
    ExpenseAmount: number;
    ExpenceDate: Date;
    Active: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    LastModifiedBy: string;
    LastModifiedDate: Date;
}
export class ExpenseData {
    ExpenseID: number;
    ExpenseTypeID: number;
    ExpenseAmount: number;
    ExpenceDate: string;
    ExpenseType: string;
    Description: string;
}
export class ExpByCategory {
    ExpenseTypeID: number;
    ExpenseType: string;
    Percentage: number;
}
export class EarningsVsExpenses {
    Earnings: number;
    Expenses: number;
}
//End of Expense Mgr 

// Student Examinations

export class MobileAppStudentExams {
    ExaminationID: number;
    ExamName: string;
    AcademicYear: string;
    TotalMarks: number;
    ExamStartDate: string;
    ExamEndDate: string;
}
export class MobileAppStudentExamResult {
    ExamScheduleID: number;
    ExaminationID: number;
    SubjectID: number;
    MaxMarks: number;
    TimeFrom: Date;
    TimeTo: Date;
    PassMarks: number;
    ExamName: string;
    MarksObtained: number;
    IsAbsent: boolean;
    AbsentReason: string;
    Subject: string;
}
// End of Student Examinations

//Examinations
export class Examinations {
    ExaminationID: number;
    Name: string;
    AcademicYear: string;
    TotalMarks: number;
    StartDate: number;
    EndDate: number;
    Active: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    LastModifiedBy: string;
    LastModifiedDate: Date;
}
export class ExaminationData {
    ExaminationID: number;
    Name: string;
    AcademicYear: string;
    TotalMarks: number;
    StartDate: string;
    EndDate: string;
    CreatedBy: string;
    CreatedDate: string;
}

export class ExaminationScheduleData {
    ExamScheduleID: number;
    ExaminationID: number;
    MaxMarks: number;
    TimeFrom: string;
    TimeTo: string;
    SubjectID: number;
    SubjectName: string;
    SubjectCode: string;
    CreatedBy: string;
    CreatedDate: string;
}
export class ExaminationSchedule {
    ExamScheduleID: number;
    ExaminationID: number;
    SubjectID: number;
    MaxMarks: number;
    TimeFrom: Date;
    TimeTo: Date;
    Active: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    LastModifiedBy: string;
    LastModifiedDate: Date;
    PassMarks: number;
}
export class ExaminationClassMapping {
    ExamClassMapID: number;
    ExaminationID: number;
    ClassID: number;
    Active: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    LastModifiedBy: string;
    LastModifiedDate: Date;
}
export class ExamClassMapData {
    ExamClassMapID: number;
    ExaminationID: number;
    ClassID: number;
    ExamName: string;
    ClassName: string;
    ClassCode: string;
}
export class StudentListInClassBySubject {
    StudentID: number;
    StudentName: string;
    ClassID: number;
    ExamClassMapID: number;
    RollNumber: number;
    AdmissionNumber: string;
    TotalMarks: number;
    ExamScheduleID: number;
    MaxMarks: number;
    MarksObtained: number;
    IsAbsent: boolean;
    StudentExamID: number;
    AbsentReason: string;
}
//End of Examinations