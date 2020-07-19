import { Component, OnInit, Input } from '@angular/core';
import { AnimalQuick } from '../../models/animal-quick'

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  @Input() animalInfo: AnimalQuick; // info on the animal

  constructor() { }

  ngOnInit(): void {
  }

}
