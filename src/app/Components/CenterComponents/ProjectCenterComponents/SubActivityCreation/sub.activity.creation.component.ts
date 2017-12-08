import { Component, ViewChild,Input } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes,
    query,
    stagger
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubActivityModel } from '../../../../Models/SubActivityModel';
import { SubActivityFormComponent } from './sub.activity.form.component'
@Component({
    selector: 'sub-activity-creation',
    templateUrl: './sub.activity.creation.component.html',
    // styleUrls: ['sub.activity.css'],
    animations: [
        trigger('AnimateGrid', [
            state('removeForm', style({
                // width: '100%',
                transform: 'translateX(0%)'
                //display:'block'
            })),
            state('addForm', style({
                // width: '30%',
                transform: 'translateX(+5%)'
                //display:'none'
            })),
            transition('addForm => removeForm', animate('100ms ease-out')),
            // transition('addForm => removeForm', [
            //     animate(900, keyframes([
            //          style({ transform: 'translateX(-10%)' }),
            //         style({transform: 'Scale(0.2)'}),
            //         style({ transform: ' Scale(1)' })
            //     ]))
            // ]),
            //  transition('removeForm => addForm', [
            //     animate(900, keyframes([

            //          style({ transform: 'translateX(+10%) ' }),
            //         style({transform: 'Scale(0.2)'  }),
            //         style({ transform: 'Scale(1)' })
            //     ]))
            // ])
            transition('removeForm => addForm', animate('100ms ease-in'))
        ])]
})
export class SubActivityCreationComponent {
    switchForm = false;
     @Input() NewId;
    isShowSubActivityForm = false;
    title__add_cancel_activity = "+Add New"
    get stateName() {
        return this.switchForm ? 'addForm' : 'removeForm'

    }
    AddNewActivity(): void {
        this.switchForm = !this.switchForm;
    }

    @ViewChild(SubActivityFormComponent)
    private subComponent: SubActivityFormComponent;
    classesToApply: string;
    IsShowDetailActivityGrid: boolean = false;
    AnimationEnd(): void {
        this.switchForm ? this.isShowSubActivityForm = true : this.isShowSubActivityForm = false
        this.switchForm ? this.title__add_cancel_activity = "-Cancel" : this.title__add_cancel_activity = "+Add New"
        this.classesToApply = this.switchForm ? "col-lg-3 col-md-3 col-sm-3 col-xs-10" : "col-lg-8 col-md-8 col-sm-8 col-xs-12";
        this.IsShowDetailActivityGrid = this.switchForm ? false : true;
        if (this.switchForm == false) {
            this.subComponent.ClearFormData();
        }
    }

    cancelSubActivityCreation(): void {
        this.switchForm = !this.switchForm;
        this.AnimationEnd();
    }

    SubActivityList: SubActivityModel[] = [];
    subActivityModelToAdd(model: SubActivityModel): void {
        this.SubActivityList.push(model);
    }

}