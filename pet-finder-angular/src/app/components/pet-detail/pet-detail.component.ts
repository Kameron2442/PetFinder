import { Component, OnInit } from '@angular/core';
import {GetAnimalListService } from '../../services/get-animal-list.service'
import { Animal } from '../../models/animal'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {

  animalDetail: Animal //details of animal to display

  constructor(private animalService: GetAnimalListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.animalService.getAnimal(id).subscribe(animal => {this.animalDetail = animal; console.log(animal);  });
  }

}
