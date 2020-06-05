import * as React from 'react';
import { PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

// export interface SMSNodeWidgetProps {
// 	node: SMSNodeModel;
// 	engine: DiagramEngine;
// 	size?: number;
// }

class S {
	static Port = styled.div`
		width: 16px;
		height: 16px;
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		cursor: pointer;
		&:hover {
			background: rgba(0, 0, 0, 1);
		}
	`;
}

/**
 * @author Dylan Vorster
 */
export class SMSNodeWidget extends React.Component {

	constructor(props) {
		super(props)
	}

	handleFirstNameChange = e => {
		this.setState({ message: e.target.value });
		console.log(this.props.node)
	};

	render() {
		return (
			<div
				className={'SMS-node'}
				style={{
					position: 'relative',
					width: this.props.width,
					height: this.props.height,
					backgroundColor: this.props.node.options.color,
					borderRadius: "8px",
					overflow: "hidden"
				}}>
				
				<h2 style={{}}>{this.props.node.options.type}</h2>

				<h5>Click to enter sms message"</h5>

				<PortWidget
					style={{
						top: this.props.height / 3 * 2,
						left: -8,
						position: 'absolute'
					}}
					port={this.props.node.getPort(PortModelAlignment.LEFT)}
					engine={this.props.engine}>
					<S.Port />
				</PortWidget>
				
				<PortWidget
					style={{
						left: this.props.width - 8,
						top: this.props.height / 3 * 2,
						position: 'absolute'
					}}
					port={this.props.node.getPort(PortModelAlignment.RIGHT)}
					engine={this.props.engine}>
					<S.Port />
				</PortWidget>
			</div>
		);
	}
}