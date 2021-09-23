import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";




@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor {
    
    constructor(){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{
        req = req.clone({
            setHeaders:{
                'x-rapidaoi-key' : "0d6b3fdee37f4a13b3f05610b8adc447",
                'x-rapidapi-host': 'https://api.rawg.io/api/platforms?key=',
            },
            setParams:{
                key:'0d6b3fdee37f4a13b3f05610b8adc447'
            }
        });
        return next.handle(req);
    }
}







