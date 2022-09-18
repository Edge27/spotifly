import { InjectableCompiler } from "@angular/compiler/src/injectable_compiler";
import { importExpr } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Http , Response, Headers } from "@angular/http";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/observable';
import { GLOBAL } from "./global";

@Injectable()
export class UserService{
    public url: string;
    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }
    singup(user_to_loging,getHash=null){
        if(getHash!=null){
            user_to_loging.getHash=getHash;
        }
        
        let json = JSON.stringify(user_to_loging);
        let params =  json;
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.post(this.url+'login',params,{headers:headers}).pipe(map(res => res.json()));
    }
}


