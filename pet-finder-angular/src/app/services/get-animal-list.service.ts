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

  // url for PetFinder API
  readonly ROOT_URL = 'https://api.petfinder.com/v2/animals' 
  // Bearer access_token
  readonly petFinderKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aGo5SGM3b1pwbzQxS2RPbW1HTGxkVzZoMVBHcjVYcHZhZTloVU1Md2s4UzNrWFZuZCIsImp0aSI6IjQ5YTkyMmI5ZTlkNTRlZDMzNTIzN2M0Mzc5OWQwYjM3NTEzZWVmYmE1YTE5M2M2YWUxZWE2MmRkNGY0OWFiZDQwZWFjYzc5NmE3YTNjNmIzIiwiaWF0IjoxNTk1MjAwMTEzLCJuYmYiOjE1OTUyMDAxMTMsImV4cCI6MTU5NTIwMzcxMywic3ViIjoiIiwic2NvcGVzIjpbXX0.d57OFBdzyyFgfb5xT9fqthgGC_jSqW8VQdaTzeljjBWe1Ymg4mdixwepBrQ834EhF7RYZaGl2DJwheZ4OsFqrhJe4SNj9kIWrMfIVaQDZi15tCPIUdQoR_S9Ijq6MzxTalmJnhSluMkrJGrbDSTRnNOO_ZxKYw10r_W2oCJ2WDIKR23JdYlplbI-I0Iug0j9MXV_myBiWjaBuMl4MfzEE6upIHJEgptIdlM0rEFiyeN6iGZofs9n308SB92YWkrHjMKm5yG_wbv5BgwULtaCVkc0zx52h9r5W2GJexgSEVHqJHA6mN5BnwONtwvqQmlxLtqBbhQ_rUqoLjkDiyLU5A'

  constructor(private http: HttpClient) { }

  // returns an observable list of animals for the home component
  getAnimals(loc: string, type:string, page:string): Observable<AnimalQuick[]>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.petFinderKey}`) 
    return this.http.get<any>(`${this.ROOT_URL}?type=${type}&location=${loc}&page=${page}`, { headers }).pipe(
      map((json: any) => {
        let myAnimalList: AnimalQuick[] = [];
        let myAnimals: any[] = json.animals
        myAnimals.forEach(item => {
          let currAnimal: AnimalQuick = {
            id: item.id,
            name: item.name,
            desc: item.description,
            smlimg: item.photos[0]?.medium,
          }
          myAnimalList.push(currAnimal);
        });

        return myAnimalList;
      })
    );
  }

  // gets a specific animal for the pet detail component
  getAnimal(animalID: string): Observable<Animal>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.petFinderKey}`) 
    return this.http.get<any>(`${this.ROOT_URL}/${animalID}`, { headers }).pipe(
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
