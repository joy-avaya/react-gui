import createEngine, { DefaultNodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';

import { CustomDiagramModel } from "./components/CustomDiagramModel"

import { CommandManager } from "./helpers/CommandManager"
import { SMSPortModel } from './components/SMSNode/SMSPortModel';
import { DiamondNodeFactory } from './components/DiamondNode/DiamondNodeFactory';
import { DeleteItemsAction } from '@projectstorm/react-canvas-core';
import { DiamondPortModel } from './components/DiamondNode/DiamondPortModel';
import { SMSNodeFactory } from './components/SMSNode/SMSNodeFactory';
import { SMSPortFactory } from './components/SMSNode/SMSPortFactory';
import {AdvancedLinkFactory} from "./components/AnimationLink/AdvancedLinkFactory";

/**
 * @author Dylan Vorster
 */
export class Application {

	constructor() {
		this.diagramEngine = createEngine();
		this.newModel();
	}

	newModel() {
		console.log("************************")
		window.commandManager = new CommandManager();
		this.activeModel = new CustomDiagramModel();
		this.diagramEngine.setModel(this.activeModel);

		//3-A) create a default node
		var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
		let port = node1.addOutPort('Out');
		node1.setPosition(100, 100);

		//3-B) create another default node
		var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
		let port2 = node2.addInPort('In');
		node2.setPosition(400, 100);

		// link the ports
		let link1 = port.link(port2);

		this.activeModel.addAll(node1, node2, link1);
	
		this.activeModel.registerListener({
			eventDidFire: console.log("blah")
		});

		
		this.diagramEngine
		.getPortFactories()
		.registerFactory(new DiamondNodeFactory('diamond', config => new DiamondPortModel(PortModelAlignment.RIGHT)));
		this.diagramEngine
		.getPortFactories()
		.registerFactory(new SMSPortFactory('sms', config => new SMSPortModel(PortModelAlignment.RIGHT)));
		this.diagramEngine.getNodeFactories().registerFactory(new DiamondNodeFactory());
		this.diagramEngine.getNodeFactories().registerFactory(new SMSNodeFactory());
		this.diagramEngine.getActionEventBus().registerAction(new DeleteItemsAction({ keyCodes: [46] }));
		this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());

		window.addEventListener('keydown', (event) => {
			if (event.keyCode === 90 && event.ctrlKey) {
				console.log('keydown');
		
				// @ts-ignore
				window.commandManager.undo();
		
				this.diagramEngine.repaintCanvas();
			}
		
			if (event.keyCode === 89 && event.ctrlKey) {
				console.log('keydown');
		
				// @ts-ignore
				window.commandManager.redo();
		
				this.diagramEngine.repaintCanvas();
			}
		})

	}

	getActiveDiagram() {
		return this.activeModel;
	}

	getDiagramEngine() {
		return this.diagramEngine;
	}
}