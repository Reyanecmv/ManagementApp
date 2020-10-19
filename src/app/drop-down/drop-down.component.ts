import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownService } from './drop-down.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  
  /**
   * FUCK OFF, TREBUIE SA FIE PUBLICE.. SIGUR PUTEM SA FACEM O CHESTIE MAI SMART CU HTML UL ALA SA VADA VARIABILE
   * PROTECTED SAU PRIVATE PE O COMPONENTA DEDICATA
   */
  public dbValues = ['A','B'];
  public dropdown:FormControl = new FormControl()

  constructor(private dropdownService : DropdownService) {}

  /**
   * La inceput se seteaza pe prima valoare din dropdown
   * si creeaza listenere ul pentru dropdown
   */
  ngOnInit(): void {
    this.dropdown.setValue(this.dbValues[0]);
    this.dropdownService.setValue(this.dbValues[0]);

    this.dropdown.valueChanges.subscribe(val => {
        this.dropdownService.apply(val);        
    })
  }

  public getValue() : string {
    return this.dropdown.value;
  }
}
