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
  readonly petFinderKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aGo5SGM3b1pwbzQxS2RPbW1HTGxkVzZoMVBHcjVYcHZhZTloVU1Md2s4UzNrWFZuZCIsImp0aSI6IjI1ZTQ3OTdhYTVmNThhNWY5YmM4NDZmYTMxYjQxNDRiNDNhMGU5YjNiMWNhMDNhMWI3ZmEwNmI4NmU5MzYwOWQ4ZTk5ZWFhMTc0Y2RiODBlIiwiaWF0IjoxNTk1MTg4ODczLCJuYmYiOjE1OTUxODg4NzMsImV4cCI6MTU5NTE5MjQ3Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.puoRyVeY56ekPy1gGUVGjqic86XDVpSNsb-5doeILVQ7vodyDD5v9YXCx6iW9Wa_0TaL828YNdlORJF2hkvqRhBC-kOBV6ax1STGTf6_VbuUjjUg3N_cL2akkCGPtuXE1hE0KYiHFhXOZn-1vlkMJpuvFtzN0JEdnAKA87Qs9nO9LqeEwPalT6-iTYwZcK15-LyT8spWgAuswYimpJoeINnHXoF_ljahsnOKAvrZhfueG51Z9yYbqoPhBJAJMdv0vE5Xeqbd0fjAePBF0rqxBspTchzzWifCZZ6dhp32r2btgVI2bXkRNX59Ug6CtgbmF_oLsPHVDjRRqtuSHxX_Kg'

  constructor(private http: HttpClient) { }

  // returns an observable list of animals for the home component
  getAnimals(loc: string, type:string, page:string): Observable<AnimalQuick[]>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.petFinderKey}`) //set has to be called on creation
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
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.petFinderKey}`) //set has to be called on creation
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
