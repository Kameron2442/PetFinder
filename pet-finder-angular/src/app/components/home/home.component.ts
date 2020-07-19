import { Component, OnInit } from '@angular/core';
import {GetAnimalListService } from '../../services/get-animal-list.service'
import { AnimalQuick } from '../../models/animal-quick'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  animalList: AnimalQuick[] //list of animals to be displayed

  constructor(private animalService: GetAnimalListService) { }

  ngOnInit(): void {

    this.animalService.getAnimals().subscribe(animals => {this.animalList = animals; console.log(animals);  });

  }

}
