import { Component, OnInit } from "@angular/core";
import { NoticiasService } from "src/app/services/noticias.service";
import { Article } from "src/app/interfaces/interfaces";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  categorias: string[] = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  noticias: Article[] = [];
  categorySelected = this.categorias[0];
  page = 0;
  end = false;
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cambioCategoria(event) {
    this.categorySelected = event.detail.value;
    this.noticias = [];
    this.page = 0;
    this.end = false;
    this.cargarNoticias();
  }

  cargarNoticias(event?) {
    this.page++;
    this.noticiasService
      .getTopHeadlinesByCategory(this.categorySelected, this.page)
      .subscribe((res) => {
        this.noticias = [...this.noticias, ...res.articles];
        if (event) {
          event.target.complete();
        }
        if (res.articles.length === 0) {
          this.end = true;
        }
      });
  }
}
