import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { Produit } from '../models/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { CategorieWrapper } from '../models/categorieWrapped.model';
import { AuthService } from './auth.service';

const httpOption = {
  headers : new HttpHeaders({'constent-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  apiURLCat: string = 'http://localhost:8080/produits/cat';
  apiURL: string = 'http://localhost:8080/produits/api';
   produits! : Produit[];
  categories! : Categorie[];

  constructor(private http : HttpClient, private authService : AuthService) {
    /*
    this.categories = [ {idCat : 1, nomCat : "PC"}, {idCat : 2, nomCat : "Imprimante"}];

    this.produits = [
      { idProduit: 1, nomProduit: "PC Zbook Pro", prixProduit: 250.00, dateCreation: new Date("10/02/2011"), categorie:  {idCat : 1, nomCat : "PC"} },
      { idProduit: 2, nomProduit: "PC HP", prixProduit: 280.00, dateCreation: new Date("11/02/2020"), categorie: {idCat : 2, nomCat : "Imprimante"}},
      { idProduit: 3, nomProduit: "PC ASUS", prixProduit: 950.00, dateCreation: new Date("01/09/2021"), categorie: {idCat : 1, nomCat : "PC"}},
      { idProduit: 4, nomProduit: "PC Lenovo", prixProduit: 2050.00, dateCreation: new Date("10/08/2012"), categorie: {idCat : 2, nomCat : "Imprimante"} },
      { idProduit: 5, nomProduit: "PC Dell", prixProduit: 2850.00, dateCreation: new Date("04/02/2022"), categorie: {idCat : 1, nomCat : "PC"}}

    ];*/
  }
/*
  listeProduit(): Produit[] {
    return this.produits;

  }*/

 // fonction pour afficher la liste des produit dan api Rest de spring boot


 listeProduit(): Observable<Produit[]>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<Produit[]>(this.apiURL+"/all",{headers:httpHeaders});

  }

  ajouterProduit(prod : Produit): Observable<Produit> {
    //return this.http.post<Produit>(apiURL, prod, httpOption);     sans la securite jwt

    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<Produit>(this.apiURL, prod, {headers:httpHeaders});
  }

  supprimerProduit(id?: number) {
    /* const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOption); */

    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.delete(url, {headers:httpHeaders});
  }

  consulterProduit(id: number): Observable<Produit> {
    /* const url = `${apiURL}/${id}`;
    return this.http.get<Produit>(url); */

    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<Produit>(url,{headers:httpHeaders});
  }

  updateProduit(prod :Produit) : Observable<Produit> {
   // return this.http.put<Produit>(apiURL, prod, httpOption);

   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.put<Produit>(this.apiURL, prod, {headers:httpHeaders});
  }
/*
  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if (n1.idProduit? > n2.idProduit?) {
        return 1;
      }
        if (n1.idProduit < n2.idProduit)
        {
           return -1;
        }
        return 0;
      });
    }*/


    listeCategories():Observable<CategorieWrapper>{
      //return this.http.get<CategorieWrapper>(this.apiURLCat);

      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<CategorieWrapper>(this.apiURLCat,{headers:httpHeaders});
    }

      rechercherParCategorie(idCat: number):Observable< Produit[]>
      { const url = `${apiURL}/prodscat/${idCat}`;
      return this.http.get<Produit[]>(url);
    }

    rechercherParNom(nom: string):Observable< Produit[]> {
      const url = `${apiURL}/prodsByName/${nom}`;
      return this.http.get<Produit[]>(url);
    }
    ajouterCategorie( cat: Categorie):Observable<Categorie>{
      return this.http.post<Categorie>(this.apiURLCat, cat, httpOption);
    }
}
