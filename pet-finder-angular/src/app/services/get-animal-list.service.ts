import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Animal } from '../models/animal'
import { AnimalQuick } from '../models/animal-quick'


@Injectable({
  providedIn: 'root'
})
export class GetAnimalListService {

  readonly ROOT_URL = 'https://api.petfinder.com/v2/animals'
  readonly petFinderKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aGo5SGM3b1pwbzQxS2RPbW1HTGxkVzZoMVBHcjVYcHZhZTloVU1Md2s4UzNrWFZuZCIsImp0aSI6IjdiOGZmMmI4ZjA3ODQ1ZjU1NzBjZDQyMjBkNzgyZTFjY2QyNzM3MjlhNTVmMDczMzNjNjU3ZjY1MjQyM2IxN2Q2MjJjMmJmMDNmYmMyOWQ3IiwiaWF0IjoxNTk1MTE5Mjc4LCJuYmYiOjE1OTUxMTkyNzgsImV4cCI6MTU5NTEyMjg3OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.FI37EWeo5UDJ7SXH1F_NyltaNWXE_FUjIZX5SKp-uZPo27fr4W4KpMC_AMFB36uB8W0njBoeoI2Xy9f7ws2SdqPux-mBJKqBIrIMQc6V_CplyTARAKYgqko2C8az-X97ztV6i1-Yn1uBH599zz5VZOMTch_oadu9N7KI1ZNkd8-jB3BQzVHYnSFjIZdTM64hfh6o56Sf83qyB3FYPzdFBuXyFkggVH9936sh_Vv1HUUdy8tKnp1NwxAa0ZvZ32w-cQXO7M4cPQZuj667yJElrkWKt-qFbpJEsT_YqNYa_9l-PIvjUTkjy2jdrI5bGZPX9aEDuhwrf6dzbiakobnmiA'

  constructor(private http: HttpClient) { }

  //returns an observable list of animals for the home component
  getAnimals(): Observable<AnimalQuick[]>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.petFinderKey}`) //set has to be called on creation
    return this.http.get<any>('https://api.petfinder.com/v2/animals?type=dog&page=1', { headers }).pipe(
      map((json: any) => {
        let myAnimalList: AnimalQuick[] = [];
        let myAnimals: any[] = json.animals
        myAnimals.forEach(item => {
          let currAnimal: AnimalQuick = {
            id: item.id,
            name: item.name,
            desc: item.description,
            contact: item.contact.email,
            smlimg: item.photos[0]?.medium,
          }
          myAnimalList.push(currAnimal);
        });

        return myAnimalList;
      })
    );
  }

  //gets a specific animal
  getAnimal(animalID: string): Observable<Animal>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.petFinderKey}`) //set has to be called on creation
    return this.http.get<any>('https://api.petfinder.com/v2/animals/' + animalID, { headers }).pipe(
      map((json: any) => {
        let item = json.animal
        let currAnimal: Animal = {
          id: item.id,
          name: item.name,
          desc: item.description,
          contact: item.contact.email,
          lrgimg: item.photos[0]?.large,
          details: {
              age: item.age,
              gender: item.gender,
              size: item.size
          }
        }

        return currAnimal;
      })
    );
  }

}
