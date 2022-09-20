import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../models/produit.model';
import { AuthService } from '../services/auth.service';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',

})
export class ProduitsComponent implements OnInit {

   produits? : Produit[];


  constructor(private produitService : ProduitService, public authService :AuthService ,private route :Router) {
   //this.produits = [];

  }

  ngOnInit(): void {
   this.chargerProduits();
  }

  chargerProduits(){
    // this.produits =  this.produitService.listeProduit();
   this.produitService.listeProduit().subscribe(prods =>{
    console.log(prods);
    this.produits =prods;
 });
  }
  supprimerProduit(p: Produit) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)

    this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
        //this.route.navigate(['produits']);
      });
    }


}
