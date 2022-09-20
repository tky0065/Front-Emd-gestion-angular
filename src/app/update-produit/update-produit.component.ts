import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Categorie } from '../models/categorie.model';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: [
  ]
})
export class UpdateProduitComponent implements OnInit {

  currentProduit = new Produit();
  categories! : Categorie[];
  updateCadId! : number;

  constructor(private activatedRoute : ActivatedRoute, private route :Router, private produitService : ProduitService) {

   }

  ngOnInit(): void {

    this.produitService.listeCategories().subscribe(cats =>{
      this.categories = cats._embedded.categories;
      console.log(cats);
    });
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']). subscribe( prod =>{
      this.currentProduit = prod;
this.updateCadId = this.currentProduit.categorie.idCat

    } ) ;
   }

    updateProduit(){
      this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updateCadId)!;
      this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
        this.route.navigate(['produits']);
      } );
    }

}
