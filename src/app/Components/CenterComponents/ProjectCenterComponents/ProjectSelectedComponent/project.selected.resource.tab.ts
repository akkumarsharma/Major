import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ResourceDetailsForDisplay } from '../../../../Models/ResourceDetailsForDisplay';
@Component({
  selector: 'project-selected-resource-tab',
  templateUrl: './project.selected.resource.tab.html',
  styleUrls: ['project.selected.css']
})

export class ProjectSelectedResourceTab{
    @Input() ResourceDetailForTab:ResourceDetailsForDisplay[];
}