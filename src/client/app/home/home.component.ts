import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NameListService, Task } from '../shared/name-list/name-list.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: Task[] = [];

  editId: number;
  editTask: string;
  //@ViewChild('editTaskInput')editTaskInput:ElementRef;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService, public ref: ChangeDetectorRef) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.list()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName)
      .subscribe( result => {
        this.newName = '';
        this.getNames();
      });
    return false;
  }

  edit(id:number) {
    this.editId=id;
    let found = this.names.filter( (item:Task) => item.id===id);
    if (found.length>0) {
      this.editTask=found[0].task;
    }
  }

  save() {
    this.nameListService.save(this.editId,this.editTask)
      .subscribe( result => {
        this.newName = '';
        this.getNames();
        this.saveCancel();
      });
    return false;    
  }

  saveCancel() {
    this.ref.markForCheck();
    this.editId=-1;
    this.editTask="";
    return false;
  }


  done(id:number,done:boolean):any {
    this.nameListService.done(id,done)
      .subscribe( result => {
        this.newName = '';
        this.getNames();
      });
    return false;    
  }

}

