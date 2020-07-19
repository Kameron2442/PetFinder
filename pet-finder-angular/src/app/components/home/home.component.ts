import { Component, OnInit } from '@angular/core';
import {GetAnimalListService } from '../../services/get-animal-list.service'
import { Animal } from '../../models/animal'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  animalList: Animal[] //list of animals to be displayed

  constructor(private animalService: GetAnimalListService) { }

  ngOnInit(): void {

    this.animalService.animals.subscribe(animals => {this.animalList = animals; console.log(animals);  });

  }

}
