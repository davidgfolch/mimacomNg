import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class NameListService {

  server:string='http://localhost:8080/';

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  list(): Observable<Task[]> {
        return this.http.get(this.server+'list')
                    .map((res: Response) => res.json())
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }

  get(id:number) {

  }

  add(task:string): Observable<string[]> {
    return this.post(this.server+'create','task='+task)
            .map((res:Response) => this.list())//
            .catch(this.handleError);
  }
  save(id:number,task:string): Observable<string[]> {
    return this.post(this.server+'edit','id='+id+'&task='+task)
            .map((res:Response) => this.list())//
            .catch(this.handleError);
  }

  done(id:number,done:boolean): Observable<string[]> {
    return this.post(this.server+'done', 'id='+id+'&done='+done)
            .map((res:Response) => this.list())//
            .catch(this.handleError);
  }

  private post(url:string,body:string) {
    var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,body,options);        
    
  }
  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

export interface Task {
    id:number,
    task:string,
    done:boolean
}
