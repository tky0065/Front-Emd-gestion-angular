import { Component, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styles: [
  ]
})
export class RechercheParCategorieComponent implements OnInit {

  produits! : Produit[];
  IdCategorie! : number;
  categories! : Categorie[];
  constructor(private produitService : ProduitService) {

  }

  ngOnInit(): void {

    this.produitService.listeCategories().subscribe(cats => {
    this.categories = cats._embedded.categories;
     console.log(cats);
  });
  }

  onChange(){
    this.produitService.rechercherParCategorie(this.IdCategorie). subscribe(prods =>{this.produits=prods});
  }
}
