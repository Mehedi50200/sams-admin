import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseService {

  constructor(private db: AngularFireDatabase) { }

  getCourses(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }
}
