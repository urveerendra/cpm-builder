import { IfStmt } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import Drawflow, {
  ConnectionEvent,
  ConnectionStartEvent,
  DrawFlowEditorMode,
  DrawflowConnection,
  DrawflowConnectionDetail,
  DrawflowNode,
  MousePositionEvent,
} from 'drawflow';
import { NodeElement } from './node.model';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.css'],
})
export class DrawBoardComponent implements OnInit, AfterViewInit {
  nodes: NodeElement[] = [];
  nodesHTML!: NodeListOf<Element>;

  nodesDrawn: any[] = [];
  selectedItem!: NodeElement;
  editor!: any;

  locked: boolean = false;

  lastMousePositionEv: any;

  drawFlowHtmlElement!: HTMLElement;
  selectedItemInChart: any;

  constructor() {}

  private initializeList(length: number) {
    let nodesData = [
    {id: 'waterCooledChiller', name: 'waterCooledChiller',inputs: 0, outputs: 4 },
    {id:'airCooledChiller',name:'airCooledChiller',inputs:0,outputs:4},
    {id:'valve1',name:'valve1',inputs:1,outputs:1},
    {id:'valve2',name:'valve2',inputs:1,outputs:1},
    {id:'coolingTowerFourFan',name:'coolingTowerFourFan',inputs:4,outputs:0},
    {id:'coolingTowerTwoFan',name:'coolingTowerTwoFan',inputs:2,outputs:0},
    {id:'coolingTowerSingleFan',name:'coolingTowerSingleFan',inputs:2,outputs:0},
    {id:'flowSwitch',name:'flowSwitch',inputs:1,outputs:1},
    {id:'pump1Vertical',name:'pump1Vertical',inputs:1,outputs:1},
    {id:'pump1Horizontal',name:'pump1Horizontal',inputs:1,outputs:1},
    {id:'building2Pipe',name:'building2Pipe',inputs:2,outputs:0},
    {id:'building4Pipe',name:'building4Pipe',inputs:4,outputs:0}  ]

    for (let i = 0; i<nodesData.length; i++) {
      this.nodes.push({
        id: i+1,
        name: nodesData[i].name + (i+1),
        class: nodesData[i].name,
        inputs: nodesData[i].inputs,
        outputs: nodesData[i].outputs
      });
    }
    // console.log(this.nodes);
  }

  private initDrawFlow(htmlElement: HTMLElement): void {
    this.editor = new Drawflow(htmlElement);
    this.editor.reroute = true;
    this.editor.reroute_fix_curvature = false;
    this.editor.force_first_input = false;
    this.editor.createCurvature = function(start_pos_x:any, start_pos_y:any, end_pos_x:any, end_pos_y:any, curvature_value:any, type:any) {
      var center_x = ((end_pos_x - start_pos_x)/2)+start_pos_x;
      return ' M ' + start_pos_x + ' ' + start_pos_y + ' L '+ center_x +' ' +  start_pos_y  + ' L ' + center_x + ' ' +  end_pos_y  + ' L ' + end_pos_x + ' ' + end_pos_y;
    }
    this.editor.start();
    //const dataToImport = {"drawflow":{"Home":{"data":{"5":{"id":5,"name":"waterCooledChiller1","data":{},"class":"","html":"<div class='drag-drawflow  waterCooledChiller'></div><p class='hiddenName'>waterCooledChiller</p>","typenode":false,"inputs":{},"outputs":{"output_1":{"connections":[{"node":"12","output":"input_1"}]},"output_2":{"connections":[{"node":"9","output":"input_1"}]},"output_3":{"connections":[{"node":"8","output":"input_1"}]},"output_4":{"connections":[{"node":"13","output":"input_1"}]}},"pos_x":-273.6666666666667,"pos_y":-75},"6":{"id":6,"name":"valve24","data":{},"class":"","html":"<div class='drag-drawflow  valve2'></div><p class='hiddenName'>valve2</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"9","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"7","output":"input_2"}]}},"pos_x":577,"pos_y":42.333333333333336},"7":{"id":7,"name":"coolingTowerSingleFan7","data":{},"class":"","html":"<div class='drag-drawflow  coolingTowerSingleFan'></div><p class='hiddenName'>coolingTowerSingleFan</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"12","input":"output_1"}]},"input_2":{"connections":[{"node":"6","input":"output_1"}]}},"outputs":{},"pos_x":957.6666666666666,"pos_y":-147},"8":{"id":8,"name":"pump1Vertical9","data":{},"class":"","html":"<div class='drag-drawflow  pump1Vertical'></div><p class='hiddenName'>pump1Vertical</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"5","input":"output_3"}]}},"outputs":{"output_1":{"connections":[{"node":"14","output":"input_1"}]}},"pos_x":518,"pos_y":253},"9":{"id":9,"name":"pump1Vertical9","data":{},"class":"","html":"<div class='drag-drawflow  pump1Vertical'></div><p class='hiddenName'>pump1Vertical</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"5","input":"output_2"}]}},"outputs":{"output_1":{"connections":[{"node":"6","output":"input_1"}]}},"pos_x":348,"pos_y":-50.333333333333336},"10":{"id":10,"name":"pump1Vertical9","data":{},"class":"","html":"<div class='drag-drawflow  pump1Vertical'></div><p class='hiddenName'>pump1Vertical</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"11","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"14","output":"input_2"}]}},"pos_x":529,"pos_y":468.3333333333333},"11":{"id":11,"name":"pump1Vertical9","data":{},"class":"","html":"<div class='drag-drawflow  pump1Vertical'></div><p class='hiddenName'>pump1Vertical</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"13","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"10","output":"input_1"}]}},"pos_x":233,"pos_y":472},"12":{"id":12,"name":"flowSwitch8","data":{},"class":"","html":"<div class='drag-drawflow  flowSwitch'></div><p class='hiddenName'>flowSwitch</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"5","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"7","output":"input_1"}]}},"pos_x":558.6666666666666,"pos_y":-168},"13":{"id":13,"name":"valve24","data":{},"class":"","html":"<div class='drag-drawflow  valve2'></div><p class='hiddenName'>valve2</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"5","input":"output_4"}]}},"outputs":{"output_1":{"connections":[{"node":"11","output":"input_1"}]}},"pos_x":17.666666666666668,"pos_y":313},"14":{"id":14,"name":"building2Pipe11","data":{},"class":"","html":"<div class='drag-drawflow  building2Pipe'></div><p class='hiddenName'>building2Pipe</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"8","input":"output_1"}]},"input_2":{"connections":[{"node":"10","input":"output_1"}]}},"outputs":{},"pos_x":963.3333333333334,"pos_y":404}}}}};
    // const dataToImport:any = {
    //   "drawflow": {
    //     "Home": {
    //       "data": {
    //         "5": {
    //           "id": 5,
    //           "name": "waterCooledChiller1",
    //           "data": {},
    //           "class": "waterCooledChiller",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>waterCooledChiller</p>",
    //           "typenode": false,
    //           "inputs": {},
    //           "outputs": {
    //             "output_1": {
    //               "connections": [
    //                 {
    //                   "node": "12",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             },
    //             "output_2": {
    //               "connections": [
    //                 {
    //                   "node": "9",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             },
    //             "output_3": {
    //               "connections": [
    //                 {
    //                   "node": "8",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             },
    //             "output_4": {
    //               "connections": [
    //                 {
    //                   "node": "13",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "pos_x": -590,
    //           "pos_y": -141.5
    //         },
    //         "6": {
    //           "id": 6,
    //           "name": "valve14",
    //           "data": {},
    //           "class": "valve1",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>valve1</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "9",
    //                   "input": "output_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {
    //             "output_1": {
    //               "connections": [
    //                 {
    //                   "node": "7",
    //                   "output": "input_2"
    //                 }
    //               ]
    //             }
    //           },
    //           "pos_x": 577,
    //           "pos_y": 42.333333333333339
    //         },
    //         "7": {
    //           "id": 7,
    //           "name": "coolingTowerSingleFan7",
    //           "data": {},
    //           "class": "coolingTowerSingleFan",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>coolingTowerSingleFan</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "12",
    //                   "input": "output_1"
    //                 }
    //               ]
    //             },
    //             "input_2": {
    //               "connections": [
    //                 {
    //                   "node": "6",
    //                   "input": "output_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {},
    //           "pos_x": 957.6666666666666,
    //           "pos_y": -147
    //         },
    //         "8": {
    //           "id": 8,
    //           "name": "pump1Vertical9",
    //           "data": {},
    //           "class": "pump1Vertical",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>pump1Vertical</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "5",
    //                   "input": "output_3"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {
    //             "output_1": {
    //               "connections": [
    //                 {
    //                   "node": "14",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "pos_x": 518,
    //           "pos_y": 253
    //         },
    //         "9": {
    //           "id": 9,
    //           "name": "pump1Vertical9",
    //           "data": {},
    //           "class": "pump1Vertical",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>pump1Vertical</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "5",
    //                   "input": "output_2"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {
    //             "output_1": {
    //               "connections": [
    //                 {
    //                   "node": "6",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "pos_x": 348,
    //           "pos_y": -50.333333333333339
    //         },
    //         "10": {
    //           "id": 10,
    //           "name": "pump1Vertical9",
    //           "data": {},
    //           "class": "pump1Vertical",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>pump1Vertical</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "11",
    //                   "input": "output_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {
    //             "output_1": {
    //               "connections": [
    //                 {
    //                   "node": "14",
    //                   "output": "input_2"
    //                 }
    //               ]
    //             }
    //           },
    //           "pos_x": 530,
    //           "pos_y": 469.5
    //         },
    //         "11": {
    //           "id": 11,
    //           "name": "pump1Vertical9",
    //           "data": {},
    //           "class": "pump1Vertical",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>pump1Vertical</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "13",
    //                   "input": "output_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {
    //             "output_1": {
    //               "connections": [
    //                 {
    //                   "node": "10",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "pos_x": 233,
    //           "pos_y": 472
    //         },
    //         "12": {
    //           "id": 12,
    //           "name": "flowSwitch8",
    //           "data": {},
    //           "class": "flowSwitch",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>flowSwitch</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "5",
    //                   "input": "output_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {
    //             "output_1": {
    //               "connections": [
    //                 {
    //                   "node": "7",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "pos_x": 531.5,
    //           "pos_y": -251
    //         },
    //         "13": {
    //           "id": 13,
    //           "name": "valve14",
    //           "data": {},
    //           "class": "valve1",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>valve1</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "5",
    //                   "input": "output_4"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {
    //             "output_1": {
    //               "connections": [
    //                 {
    //                   "node": "11",
    //                   "output": "input_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "pos_x": 17.666666666666669,
    //           "pos_y": 313
    //         },
    //         "14": {
    //           "id": 14,
    //           "name": "building2Pipe11",
    //           "data": {},
    //           "class": "building2Pipe",
    //           "html": "<div class='drag-drawflow'></div><p class='hiddenName'>building2Pipe</p>",
    //           "typenode": false,
    //           "inputs": {
    //             "input_1": {
    //               "connections": [
    //                 {
    //                   "node": "8",
    //                   "input": "output_1"
    //                 }
    //               ]
    //             },
    //             "input_2": {
    //               "connections": [
    //                 {
    //                   "node": "10",
    //                   "input": "output_1"
    //                 }
    //               ]
    //             }
    //           },
    //           "outputs": {},
    //           "pos_x": 963.3333333333334,
    //           "pos_y": 404
    //         }
    //       }
    //     }
    //   }
    // };
    const dataToImport = {"drawflow":{"Home":{"data":{"5":{"id":5,"name":"waterCooledChiller1","data":{},"class":"waterCooledChiller","html":"<div class='drag-drawflow'></div><p class='hiddenName'>waterCooledChiller</p>","typenode":false,"inputs":{},"outputs":{"output_1":{"connections":[{"node":"12","output":"input_1"}]},"output_2":{"connections":[{"node":"9","output":"input_1"}]},"output_3":{"connections":[{"node":"8","output":"input_1"}]},"output_4":{"connections":[{"node":"13","output":"input_1"}]}},"pos_x":-590,"pos_y":-141.5},"6":{"id":6,"name":"valve14","data":{},"class":"valve1","html":"<div class='drag-drawflow'></div><p class='hiddenName'>valve1</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"9","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"7","output":"input_2"}]}},"pos_x":983,"pos_y":120},"7":{"id":7,"name":"coolingTowerSingleFan7","data":{},"class":"coolingTowerSingleFan","html":"<div class='drag-drawflow'></div><p class='hiddenName'>coolingTowerSingleFan</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"12","input":"output_1"}]},"input_2":{"connections":[{"node":"6","input":"output_1"}]}},"outputs":{},"pos_x":960,"pos_y":-345},"8":{"id":8,"name":"pump1Vertical9","data":{},"class":"pump1Vertical","html":"<div class='drag-drawflow'></div><p class='hiddenName'>pump1Vertical</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"5","input":"output_3"}]}},"outputs":{"output_1":{"connections":[{"node":"14","output":"input_1"}]}},"pos_x":590,"pos_y":261},"9":{"id":9,"name":"pump1Vertical9","data":{},"class":"pump1Vertical","html":"<div class='drag-drawflow'></div><p class='hiddenName'>pump1Vertical</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"5","input":"output_2"}]}},"outputs":{"output_1":{"connections":[{"node":"6","output":"input_1"}]}},"pos_x":592,"pos_y":78},"10":{"id":10,"name":"pump1Vertical9","data":{},"class":"pump1Vertical","html":"<div class='drag-drawflow'></div><p class='hiddenName'>pump1Vertical</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"11","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"14","output":"input_2"}]}},"pos_x":544,"pos_y":502},"11":{"id":11,"name":"pump1Vertical9","data":{},"class":"pump1Vertical","html":"<div class='drag-drawflow'></div><p class='hiddenName'>pump1Vertical</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"13","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"10","output":"input_1"}]}},"pos_x":355,"pos_y":472},"12":{"id":12,"name":"flowSwitch8","data":{},"class":"flowSwitch","html":"<div class='drag-drawflow'></div><p class='hiddenName'>flowSwitch</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"5","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"7","output":"input_1"}]}},"pos_x":566,"pos_y":-249},"13":{"id":13,"name":"valve14","data":{},"class":"valve1","html":"<div class='drag-drawflow'></div><p class='hiddenName'>valve1</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"5","input":"output_4"}]}},"outputs":{"output_1":{"connections":[{"node":"11","output":"input_1"}]}},"pos_x":160,"pos_y":465},"14":{"id":14,"name":"building2Pipe11","data":{},"class":"building2Pipe","html":"<div class='drag-drawflow'></div><p class='hiddenName'>building2Pipe</p>","typenode":false,"inputs":{"input_1":{"connections":[{"node":"8","input":"output_1"}]},"input_2":{"connections":[{"node":"10","input":"output_1"}]}},"outputs":{},"pos_x":1033,"pos_y":172}}}}};
    this.editor.import(dataToImport);
    console.log(this.editor);
    this.drawGreenCustomPaths();
  }
  drawGreenCustomPaths(){
    let allSVGConnections = document.getElementsByClassName("connection");
    for(let i=0 ; i < allSVGConnections.length ; i++ ){
      if(this.findSVGNode(allSVGConnections[i].classList)){
        allSVGConnections[i].classList.add("greenClass");
      }
    }
  }
  findSVGNode(listOfClasses:any){
    let colorGreen = false;
    let nodeOutClass = "";
    let nodeInClass = "";
    listOfClasses.forEach( (element:any) => {
      if(element.indexOf("node_out") > -1){
        nodeOutClass = element;
      }
      if(element.indexOf("node_in") > -1){
        nodeInClass = element;
      }
    });
    nodeOutClass = nodeOutClass.split("node_out_")[1];
    nodeInClass = nodeInClass.split("node_in_")[1];
    let findNodeClass:any = document.getElementById(nodeOutClass)?.classList;
    if(findNodeClass.contains("waterCooledChiller") && (listOfClasses.contains("output_1") || listOfClasses.contains("output_2")) ){
      colorGreen = true;
    }
    return colorGreen
  }
  ngAfterViewInit(): void {
    this.drawFlowHtmlElement = <HTMLElement>document.getElementById('drawflow');
    this.initDrawFlow(this.drawFlowHtmlElement);

    // Events!
    this.editor.on('nodeCreated', (id: any) => {
      console.log(
        'Editor Event :>> Node created ' + id,
        this.editor.getNodeFromId(id)
      );
    });

    this.editor.on('nodeRemoved', (id: any) => {
      console.log('Editor Event :>> Node removed ' + id);
    });

    this.editor.on('nodeSelected', (id: any) => {
      console.log(
        'Editor Event :>> Node selected ' + id,
        this.editor.getNodeFromId(id)
      );
      // this.selectedItemInChart = this.editor.getNodeFromId(id);
      // var selectedItem;
      // if(this.selectedItemInChart.name.indexOf("waterCooledChiller") > -1){
      //   // this.selectedItemInChart.innerHTML = "<div class='drag-drawflow  waterCooledChiller selected'></div><p class='hiddenName'>waterCooledChiller</p>"
      //   selectedItem = document.getElementById("node-"+this.selectedItemInChart.id);
      //   console.log(selectedItem);
      // }
    });

    this.editor.on('moduleCreated', (name: any) => {
      console.log('Editor Event :>> Module Created ' + name);
    });

    this.editor.on('moduleChanged', (name: any) => {
      console.log('Editor Event :>> Module Changed ' + name);
    });

    this.editor.on('connectionCreated', (connection: any) => {
      console.log('Editor Event :>> Connection created ', connection);
      this.getConnectionCustomization(connection);
    });

    this.editor.on('connectionRemoved', (connection: any) => {
      console.log('Editor Event :>> Connection removed ', connection);
    });

    // this.editor.on('mouseMove', (position: any) => {
    //   console.log('Editor Event :>> Position mouse x:' + position.x + ' y:' + position.y);
    // });

    this.editor.on('nodeMoved', (id: any) => {
      console.log('Editor Event :>> Node moved ' + id);
    });

    this.editor.on('zoom', (zoom: any) => {
      console.log('Editor Event :>> Zoom level ' + zoom);
    });

    // this.editor.on('translate', (position: any) => {
    //   console.log(
    //     'Editor Event :>> Translate x:' + position.x + ' y:' + position.y
    //   );
    // });

    this.editor.on('addReroute', (id: any) => {
      console.log('Editor Event :>> Reroute added ' + id);
    });

    this.editor.on('removeReroute', (id: any) => {
      console.log('Editor Event :>> Reroute removed ' + id);
    });
  }

  ngOnInit(): void {
    this.initializeList(5);
  }
  getConnectionCustomization(connection:any){
    let outputConnected = this.editor.getNodeFromId(connection.output_id);
    let inputConnected = this.editor.getNodeFromId(connection.input_id);
    if(outputConnected.class =="waterCooledChiller" && (connection.output_class =="output_1" || connection.output_class =="output_2" || connection.output_class =="output_3" )){
      document.getElementsByClassName("node_out_node-"+ connection.output_id +" "+ "node_in_node-"+ connection.input_id)[0].classList.add("greenClass");
    }
  }
  // Drag Events
  onDragStart(e: any) {
    if (e.type === 'dragstart') {
      console.log('onDragStart :>> e :>> ', e);
      this.selectedItem = <NodeElement>(
        this.nodes.find((node: NodeElement) => node.name === e.target.children[0].innerHTML)
        // this.nodes.find((node: NodeElement) => node.name === e.target.outerText)0
      );
    }
  }

  onDragEnter(e: any) {
    console.log('onDragEnter :>> e :>> ', e);
  }

  onDragLeave(e: any) {
    console.log('onDragLeave :>> e :>> ', e);
  }

  onDragOver(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.lastMousePositionEv = e;
    // console.log('onDragOver :>> e :>> ', e);
  }

  onDragEnd(e: any) {
    console.log('onDragend :>> e :>> ', e);
  }

  onDrop(e: any) {
    // After dropping the element, create a node
    if (e.type === 'drop') {
      console.log('onDrop :>> e :>> ', e);
      e.preventDefault();
      this.addNodeToDrawBoard(e.clientX, e.clientY);
      // this.resetAllInputsOutputs();
    }
  }

  resetAllInputsOutputs() {
    this.nodes.forEach((node) => {
      node.inputs = 0;
      node.outputs = 0;
    });
  }

  // Drawflow Editor Operations
  addNodeToDrawBoard(pos_x: number, pos_y: number) {
    if (this.editor.editor_mode === 'edit') {
      pos_x =
        pos_x *
          (this.editor.precanvas.clientWidth /
            (this.editor.precanvas.clientWidth * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().x *
          (this.editor.precanvas.clientWidth /
            (this.editor.precanvas.clientWidth * this.editor.zoom));

      pos_y =
        pos_y *
          (this.editor.precanvas.clientHeight /
            (this.editor.precanvas.clientHeight * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().y *
          (this.editor.precanvas.clientHeight /
            (this.editor.precanvas.clientHeight * this.editor.zoom));

      const htmlTemplate = `
          <div
          class="drag-drawflow">
         </div>
          <p class="hiddenName">${this.selectedItem.class}</p>
          `;

      const nodeName = this.selectedItem.name;
      const nodeId = this.editor.addNode(
        this.selectedItem.name,
        this.selectedItem.inputs,
        this.selectedItem.outputs,
        pos_x,
        pos_y,
        this.selectedItem.class,
        {},
        htmlTemplate,
        false
      );

      this.nodesDrawn.push({
        nodeId,
        nodeName,
      });
      console.log(this.nodesDrawn);
      // const newNode = <DrawflowNode>this.editor.getNodeFromId(nodeId);
    }
  }

  onClear() {
    this.editor.clear();
  }

  changeMode() {
    this.locked = !this.locked;
    this.editor.editor_mode = this.locked ? 'fixed' : 'edit';
  }

  onZoomOut() {
    this.editor.zoom_out();
  }

  onZoomIn() {
    this.editor.zoom_in();
  }

  onZoomReset() {
    this.editor.zoom_reset();
  }

  onSubmit() {
    const dataExport = this.editor.export();
    // JSON.stringify(dataExport).replaceAll('\\"',"'").replaceAll('\\n',"").replaceAll(' ',"");
    // JSON.stringify(dataExport).replaceAll('\\n',"");
    // JSON.stringify(dataExport).replaceAll(' ',"")
    console.log('dataExport :>> ', dataExport);
  }
}
