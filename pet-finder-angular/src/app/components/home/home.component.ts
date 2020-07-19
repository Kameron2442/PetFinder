import { Component, OnInit, HostListener } from '@angular/core';
import {GetAnimalListService } from '../../services/get-animal-list.service'
import { AnimalQuick } from '../../models/animal-quick'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  animalList: AnimalQuick[] // list of animals to be displayed
  currPage: number = 1 // used for pagination
  currAnimal: string = 'rabbit' // used to keep functions in sync
  currLoc: string = '27511' // used to keep functions in sync
  canPaginate: boolean = true // a lock used to keep the scrollMe function from paginating too many pages at a time

  constructor(private animalService: GetAnimalListService) { }

  ngOnInit(): void {

    // gets an initial list of animals to display
    this.animalService.getAnimals(this.currLoc, this.currAnimal, this.currPage.toString()).subscribe(animals => { this.animalList = animals; });

  }

  // creates a new search when the select element changes or a new zip code is typed
  newSearch(loc: string, type:string){
    if(loc == ''){loc = '27511'}
    if(loc.length > 4){
      this.currPage = 1
      this.currAnimal = type
      this.currLoc = loc
      this.animalService.getAnimals(this.currLoc, this.currAnimal, this.currPage.toString()).subscribe(animals => { this.animalList = animals;  });
    }
  }

  // Paginates a new page of results when the user scrolls to the bottom of the page
  @HostListener("window:scroll")
  paginate(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.canPaginate == true) {
      this.canPaginate = false
      this.currPage ++
      this.animalService.getAnimals(this.currLoc, this.currAnimal, this.currPage.toString()).subscribe(animals => { 
        this.animalList = [...this.animalList, ...animals]; 
        this.canPaginate = true
      });
    }
  }

}
