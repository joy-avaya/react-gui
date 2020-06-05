import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';

// export interface DiamondNodeModelGenerics {
// 	PORT: DiamondPortModel;
// }

export class DiamondNodeModel extends NodeModel {
	constructor(props) {
		super({
			type: 'diamond',
			color: props.color,
			data: {1: 2}
		});
		this.addPort(new DiamondPortModel(PortModelAlignment.TOP));
		this.addPort(new DiamondPortModel(PortModelAlignment.LEFT));
		this.addPort(new DiamondPortModel(PortModelAlignment.BOTTOM));
		this.addPort(new DiamondPortModel(PortModelAlignment.RIGHT));
	}
}