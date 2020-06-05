import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { Application } from '../Application';
import { TrayItemWidget } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from '../helpers/DemoCanvasWidget';
import styled from '@emotion/styled';

import { DiamondNodeModel } from "./DiamondNode/DiamondNodeModel";
import { SMSNodeModel } from "./SMSNode/SMSNodeModel";

import PropertiesView from "./Properties";
import { AdvancedPortModel } from './AnimationLink/AdvancedPortModel';

export let BodyWidgetProps = {
	app: Application
}

class S {
	static Body = styled.div` flex-grow: 1; display: flex; flex-direction: column; min-height: 100%; `;

	static Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

	static Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

	static Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;
}

export class BodyWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedNode: null };
	}

	serialize = () => {
		console.log(JSON.stringify(this.props.app.getDiagramEngine().getModel().serialize(), null, 2))
	}

	render() {
		return (
			<S.Body>
				<S.Header>
					<div className="title">GUI Designer</div>
					<button onClick={() => this.serialize()}> serialize </button>
				</S.Header>
				<S.Content>
					<TrayWidget>
						<TrayItemWidget model={{ type: 'rect', name: "incoming call" }} name="Rect Node" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: 'sms', name: "sms" }} name="SMS" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: 'diamond'}} name="Diamond Node" color="red" />
					</TrayWidget>
					<S.Layer id="main-display"
						onDrop={event => {
							var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
							var nodesCount = _.keys(
								this.props.app
									.getDiagramEngine()
									.getModel()
									.getNodes()
							).length;

							var node;
							if (data.type === 'rect') {
								node = new DefaultNodeModel(data.name, 'rgb(192,255,0)');
								node.addPort(new AdvancedPortModel(false, 'out-1', 'Out thick'));
								node.addPort(new AdvancedPortModel(true, 'in-1', 'In thick'));

							} else if (data.type === "diamond") {
								node = new DiamondNodeModel('Node ' + (nodesCount + 1), 'rgb(0,192,255)');
								node.registerListener({
									eventDidFire: (e) => {console.log("********************"); console.log(e); console.log("********************")}
								});
							} else {
								node = new SMSNodeModel({name: 'SMS', color: 'rgb(0,192,255)'});
								node.registerListener({
									eventDidFire: (e) => {
										if(e.isSelected === true && e.function === "selectionChanged") {
											this.setState({ selectedNode: e.entity })
										} 
									}
								});
							}
							
							var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.setPosition(point);
							this.props.app
								.getDiagramEngine()
								.getModel()
								.addNode(node);
							this.forceUpdate();
						}}
						onDragOver={event => {
							event.preventDefault();
						}}>
						<DemoCanvasWidget>
							<CanvasWidget engine={this.props.app.getDiagramEngine()} />
						</DemoCanvasWidget>
					</S.Layer>
					<div></div>
					{this.state.selectedNode!==null ? <PropertiesView node={this.state.selectedNode}></PropertiesView>: <div></div>}
				</S.Content>
			</S.Body>
		);
	}
}