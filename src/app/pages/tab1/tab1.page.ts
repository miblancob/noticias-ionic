import { Component, OnInit } from "@angular/core";
import { NoticiasService } from "src/app/services/noticias.service";
import { Article } from "src/app/interfaces/interfaces";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  end = false;
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines().subscribe((resp) => {
      this.noticias = [...this.noticias, ...resp.articles];
      if (event) {
        event.target.complete();
      }
      if (resp.articles.length === 0) {
        this.end = true;
      }
    });
  }
}
