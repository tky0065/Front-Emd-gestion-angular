import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../models/categorie.model';
import { Produit } from '../models/produit.model';
import { AuthService } from '../services/auth.service';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html'
})
export class AddProduitComponent implements OnInit {

  newProduit = new Produit();
  categories !: Categorie[];
  newIdCat! : number;
  newCategorie! : Categorie;
  message :string = "";
  constructor(private produitService : ProduitService, public authService : AuthService,private route :Router) {

  }

  ngOnInit(): void {
   this.produitService.listeCategories().subscribe(cats => {
    this.categories =cats._embedded.categories;
    console.log(cats);
   });
  }
  addProduit(){
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit).subscribe(prod =>{
      console.log(prod);
      this.route.navigate(['produits']);
    });

  }

}
