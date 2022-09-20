import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styles: [
  ]
})
export class UpdateCategoriesComponent implements OnInit {
  @Input()
  categorie! : Categorie;
  @Input()
  ajout!:boolean;

  @Output()
  categorieUpdated = new EventEmitter<Categorie>();

  constructor(public authService :AuthService) { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.categorie);
  }

  saveCategorie(){

    this.categorieUpdated.emit(this.categorie);

  }

}
