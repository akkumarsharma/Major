import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NewResourceDetailModel } from '../../../Models/NewResourceDetailModel';
import { DatePipe } from '@angular/common';
import { serviceForRoute } from '../../../Services/SharedServices.service'
import { CenterComm } from '../../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../../enums/center.identifier'
import { ApiCommunicationService } from '../../../Services/api.communication.service'
import { ApiActionList } from '../../../CommonClasses/api.action.list'
@Component({
  selector: 'resource-new',
  templateUrl: './resource.new.component.html'
})
export class ResourceNewComponent implements OnInit {
  resourceNewForm: FormGroup;
  DOJControl: FormControl;
  supervisorCtrl: FormControl;
  DOJControlBind: string;
  ResourceName: string
  ResourceSupervisor: string
  newResourceDetailModel: NewResourceDetailModel;
  showDialog: boolean
  centerCommObj: CenterComm;

  filteredSupervisors: any;
  SupervisorNames = [];
  resourceInfo: NewResourceDetailModel[];
  //
  users: any;
  msg: string;
  //
  constructor(private fb: FormBuilder, public datepipe: DatePipe, private sharedService: serviceForRoute, private appcommService: ApiCommunicationService) {
    this.supervisorCtrl = new FormControl();
    this.filteredSupervisors = this.supervisorCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterSupervisors(name));
  }



  filterSupervisors(val: string) {
    return val ? this.SupervisorNames.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.SupervisorNames;
  }

  ngOnInit(): void {
    this.resourceNewForm = this.fb.group({
      ResourceName: ['', Validators.required],
    });
    this.DOJControl = new FormControl(null, [
      Validators.required])
    this.LoadResources();
  }

  LoadResources(): void {
    this.SupervisorNames.length = 0;
    let actionName = ApiActionList.Get_Resource_List;
    this.appcommService.getAll(actionName, true).subscribe(resources => { this.FillSupervisorName(resources) });
  }

  FillSupervisorName(resources: any): void {

    this.resourceInfo = resources;
    this.resourceInfo.forEach(item => {
      debugger
      if (item.ResourceName != undefined) {
        this.SupervisorNames.push(item.ResourceName);
      }
    })
    this.removeDuplicates(this.SupervisorNames);
  };

   removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    this.SupervisorNames=[];
    this.SupervisorNames=unique_array;
}

  onSubmit(formData: any) {
    debugger
    this.newResourceDetailModel = new NewResourceDetailModel();
    this.newResourceDetailModel.ResourceName = formData.value.ResourceName;
    this.newResourceDetailModel.ResourceSupervisor = this.ResourceSupervisor;
    this.newResourceDetailModel.ResourceDOJ = this.datepipe.transform(this.DOJControlBind, 'yyyy-MM-dd');

    // let actionName=ApiActionList.Post_Resource_New;
    // this.appcommService.post(this.newResourceDetailModel,actionName);
    let actionName = ApiActionList.Post_Resource_New;
    this.appcommService.post(this.newResourceDetailModel, actionName).subscribe(
      data => {
        if (data.status == 200) //Success
        {
          this.showDialog = true;
          this.sharedService.updateResourcesList(true);

        }
        else {
          this.msg = "There is some issue in saving records, please contact to system administrator!"
        }

      },
      error => {
        this.msg = error;
      }

    );
    // this.appcommService.getAll(actionName)
    //           .subscribe(users => { console.log(users) },
    //           error => this.msg = <any>error);
  }

  GotoHomePage(): void {
    this.showDialog = false;
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.homePage;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);
  }

  Continue(): void {
    this.showDialog = !this.showDialog;
    this.ngOnInit();
    this.resourceNewForm.reset();
    this.supervisorCtrl.reset();
  }

}   