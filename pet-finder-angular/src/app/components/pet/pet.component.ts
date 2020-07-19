import { Component, OnInit, Input } from '@angular/core';
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  @Input() animalInfo: Animal; // info on the animal

  constructor() { }

  ngOnInit(): void {
  }

}
