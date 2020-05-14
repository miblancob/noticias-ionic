import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RespuestaTopHeadlines } from "../interfaces/interfaces";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({ "X-Api-key": apiKey });

@Injectable({
  providedIn: "root",
})
export class NoticiasService {
  headlinesPage = 0;
  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(
      `/top-headlines?country=us&page=${this.headlinesPage}`
    );
  }

  getTopHeadlinesByCategory(
    category: string,
    page: number
  ): Observable<RespuestaTopHeadlines> {
    return this.ejecutarQuery<RespuestaTopHeadlines>(
      `/top-headlines?country=us&category=${category}&page=${page}`
    );
  }
}
