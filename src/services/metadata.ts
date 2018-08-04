import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import {
    AppContext, apiurls, api, ClassData, Students, MobileAttnResponse,
    AuthResponse, FeeComponentData, FeeComponents, FeeTerms, FeeTermsData,
    ExpenseType, ExpByCategory, ExpenseData, Expenses, EarningsVsExpenses,
    ExaminationData, ExamClassMapData

} from '../models/appmodel';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
//Utils
import { SCCom } from '../utilities/sccom';
import { environment, endpoint } from '../environment/environment';

@Injectable()
export class MetaData {
    private appContext: AppContext;
    private api: api;
    private apiurl: apiurls;
    constructor(
        public events: Events,
        public storage: Storage,
        private http: Http,
        private xcom: SCCom
    ) {
        //this.loadAppContext();
    }

    loadAppContext() {
        console.log('load app context called..');
        if (!this.appContext) {
            this.storage.get('appContext').then(data => {
                if (data) {
                    this.appContext = data;
                } else {
                    console.log('no appContextFound and so initiated');
                    console.log(this.appContext);
                    this.appContext = new AppContext();
                }
            });
        } else {
            console.log(this.appContext);
        }
    }

    getAppContext(): AppContext {
        return this.appContext;
    }


    getClass(): Observable<ClassData[]> {
        console.log('api call');
        var endPoint = environment.apiHostName + endpoint.ClassData;
        console.log(endPoint);
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as ClassData[]);
    }
    getStudentsByClass(id, date): Observable<MobileAttnResponse> {
        var endPoint = environment.apiHostName + endpoint.ClassAttnData + '/' + id + '?AttendenceDate=' + date;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as MobileAttnResponse);
    }
    getStudentReport(id, date): Observable<string> {
        var endPoint = environment.apiHostName + endpoint.StudentReport;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as string);
    }

    //Students    
    getAllStudents(): Observable<Students[]> {
        var endPoint = environment.apiHostName + endpoint.Students;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as Students[]);
    }
    Authenticate(username: string, password: string): Observable<AuthResponse> {
        var endPoint = environment.apiHostName + endpoint.Auth;
        return this.http.post(endPoint,
            this.xcom.generateBody({ Email: username, Password: password, grant_type: 'password' }),
            this.xcom.getOptions()).map(res => res.json() as AuthResponse);
    }
    getFeeComponents() {
        var endPoint = environment.apiHostName + endpoint.FeeComponents;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as FeeComponentData[]);
    }
    getFeeTerms() {
        var endPoint = environment.apiHostName + endpoint.FeeTerms;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as FeeComponentData[]);
    }

    // Expenses
    getExpenseTypes() {
        var endPoint = environment.apiHostName + endpoint.ExpenseType;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as ExpenseType[]);
    }
    getExpenses() {
        var endPoint = environment.apiHostName + endpoint.ExpenseType;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as ExpenseData[]);
    }
    //End of Expenses

    //Examinations
    getExaminations() {
        var endPoint = environment.apiHostName + endpoint.Examinations;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as ExaminationData[]);
    }
    getExamClassData(examid) {
        var endPoint = environment.apiHostName + endpoint.ExamClassMap + '/' + examid;
        return this.http.get(endPoint, this.xcom.getAuthOptions(this.appContext))
            .map(res => res.json() as ExamClassMapData[]);
    }
    //End of examinations
}
