import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Zoo } from 'src/app/models/zoo';
import { ZooService } from 'src/app/services/zoo.service';

@Component({
  selector: 'app-zoos',
  templateUrl: './zoos.component.html',
  styleUrls: ['./zoos.component.scss']
})
export class ZoosComponent implements OnInit {
  
  zooDialog: boolean = false;

  editZooDialog: boolean = false;

  deleteZooDialog: boolean = false;

  deleteZoosDialog: boolean = false;

  zoos: Zoo[] = [];

  zoo: Zoo = {};

  selectedZoos: Zoo[] = [];

  zooDataNascimentoIsValid: boolean = true;

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private zooService: ZooService
  ) { }

  ngOnInit(): void {
  }

}
