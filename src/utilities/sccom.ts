import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { AppContext } from '../models/appmodel';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class SCCom{

    getOptions():RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    getAuthOptions(appContext: AppContext):RequestOptions{
        console.log('headers');
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 
                                //'Authorization':appContext.User.TokenType + ' ' + appContext.User.AuthToken,
                                'Accept':'application/json',
                                "cache-control": "no-cache"
                                });
        let options = new RequestOptions({ headers: headers });
        console.log(options);
        return options;
    }
    getJsonAuthOptions(appContext: AppContext):RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json', 
                                'Authorization':appContext.User.TokenType + ' ' + appContext.User.AuthToken,
                                'Accept':'application/json',
                                "cache-control": "no-cache"
                                });
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    generateBody(data: any):string{
        let params = new URLSearchParams();
        for(let prop in data){
            params.append(prop, data[prop]);
        }
        return params.toString();
    }

    getFDAuthOptions():RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json', 
                                'Authorization': 'Basic ' + btoa('prakash@primusglobal.com:P@ssw0rd'),
                                'Accept':'application/json'});
        let options = new RequestOptions({ headers: headers });
        return options;
    }
    mapProperties(indata :any , outdata :object):any{
        for(let prop in indata){
            if(outdata.hasOwnProperty(prop)){
                outdata[prop] = indata[prop];
            }
        }
        return outdata;
    }
}