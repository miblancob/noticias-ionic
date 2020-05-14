import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Article } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    const index = this.noticias.indexOf(noticia);
    if (index < 0) {
      this.noticias = [noticia, ...this.noticias];
    } else {
      this.noticias.splice(index, 1);
    }
    this.storage.set("favoritos", this.noticias);
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get("favoritos");
    if (favoritos) {
      this.noticias = favoritos;
    }
  }
}
