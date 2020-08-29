import { Component, VERSION } from "@angular/core";

import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
// const apiUrl = "http://localhost:3000/api/v1/products";
const apiUrl = "https://reqres.in/api/users";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  data: any[] = [];

  constructor(private http: HttpClient) {
    this.getProducts().subscribe(
      (res: any) => {
        this.data = res;
        console.log(this.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl).pipe(
      tap(product => console.log("fetched products")),
      catchError(this.handleError("getProducts", []))
    );
  }

  getProduct(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<any>(`getProduct id=${id}`))
    );
  }
}
