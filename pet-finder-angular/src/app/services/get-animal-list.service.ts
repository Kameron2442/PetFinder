import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Animal } from '../models/animal'


@Injectable({
  providedIn: 'root'
})
export class GetAnimalListService {

  readonly ROOT_URL = 'https://api.petfinder.com/v2/animals'
  animals: Observable<Animal[]> = this.getAnimals() //home component subscibes to this list of animals for display

  constructor(private http: HttpClient) { }

  //returns an observable list of animals for the home component
  getAnimals(): any{
    const petFinderKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aGo5SGM3b1pwbzQxS2RPbW1HTGxkVzZoMVBHcjVYcHZhZTloVU1Md2s4UzNrWFZuZCIsImp0aSI6IjBlOTQ3MTQzNjU4MjllNjgzNGFhYjc5N2ZjYWM4MGRmOGEzNThiYTVmNDM4ZTA5MWYyODAyZjIzMjJlOWYwMDRiY2E2NjBlZDQzMzJiYmNmIiwiaWF0IjoxNTk1MTE1NjEwLCJuYmYiOjE1OTUxMTU2MTAsImV4cCI6MTU5NTExOTIxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.v0X4_H_sjZy8kxqmotrKEHhmwX4FTK_bm8PHdcn_lUjxYu60Yv7Hown5zN1KJc3D_Jli8vD4nar7-o7t9CWsQikizAiLlEOeMpcHw5uiIj5J1a1PciNpU08NhAQ39vjpugGZSbKJjFIZ9mHcI-i0wmgouNQ8bsvNRWM1KBsUe_JJ0wyUkC_0fNzMSk5T_pQU3VTGyyTL7j4FXzWcaNCbEQs_PQoivVF2fq1ttN3jHa7nB5PIXetUGmmB2pblHtgv-Ug-Mhivf7Oo383q03C4FunU4w8JhEnqOn7VhrBGZZQknVWnzEU-ImKwGSUBTlfzuJWp-33-f_LxQeAI4QZ45g'
    let headers = new HttpHeaders().set('Authorization', `Bearer ${petFinderKey}`) //set has to be called on creation
    return this.http.get<any>('https://api.petfinder.com/v2/animals?type=dog&page=1', { headers }).pipe(
      map((json: any) => {
        let myAnimalList: Animal[] = [];
        let myAnimals: any[] = json.animals
        myAnimals.forEach(item => {
          let currAnimal: Animal = {
            name: item.name,
            desc: item.description,
            contact: item.contact.email,
            smlimg: item.photos[0]?.medium,
            lrgimg: item.photos[0]?.large,
            details: {
                age: item.age,
                gender: item.gender,
                size: item.size
            }
          }
          myAnimalList.push(currAnimal);
        });

        return myAnimalList;
      })
    );
  }

}
