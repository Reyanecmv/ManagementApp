import { Injectable } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';

@Injectable()
export class EmployeeConnectorService {

  constructor() { }

  public fillWithCurrentItem(item : string): boolean {
    this.getDataFromItem(item);

    return false;
  }

  private getDataFromItem(item : string): boolean {
    return false;
  }

}
