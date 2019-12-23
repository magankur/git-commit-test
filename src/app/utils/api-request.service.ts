import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RestService } from '../service/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  // api base url
  public apiBaseUrl: string = environment.apiBaseUrl;
  // content default limit
  defaultLimit: number = 5;

  constructor(private api: RestService) { }

  /**
   * Get commit list.
   */
  getCommits() {
    return this.api.get('');
  }

}
