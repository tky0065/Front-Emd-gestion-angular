import { Component, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: [
  ]
})
export class ListeCategoriesComponent implements OnInit {

  categories! : Categorie[];
  ajout:boolean=true;
  updatedCat:Categorie = {"idCat":0,"nomCat":""};
  constructor( private produitService : ProduitService) {

   }

  ngOnInit(): void {
    this.chargerCategories();

  }
  chargerCategories(){
    this.produitService.listeCategories().subscribe(cats =>{
      this.categories = cats._embedded.categories;

   });
  }
  categorieUpdated(cat: Categorie){

    this.produitService.ajouterCategorie(cat).subscribe(() =>{

      this.chargerCategories();
    });

  }

  updateCat(cat :Categorie){
    this.updatedCat = cat;
    this.ajout=false;
  }

}
