import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipeNames: any;
  names: {
    name: string,
    href: string
  }[] = [];

  i = ''; // składniki
  q = ''; // pojedyńcza nazwa potrawy

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.names = []; // czyszczenie tablicy
    return this.http.get('/api/?i=' + this.i + '&q=' + this.q).subscribe(data => {
      console.log('## Data from API: ', data);
      this.recipeNames = data;
      Object.keys(this.recipeNames.results).forEach(el => {
        this.names.push({
          name: this.recipeNames.results[el].title,
          href: this.recipeNames.results[el].href
        });
      });
      console.log('## test: ', this.names);
    });
  }

  ngOnInit() {
  }

}
