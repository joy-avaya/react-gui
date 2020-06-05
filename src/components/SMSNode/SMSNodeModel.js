import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { SMSPortModel } from './SMSPortModel';

import * as _ from 'lodash';

// export interface SMSSNodeModelGenerics {
// 	PORT: SMSSPortModel;
// }

export class SMSNodeModel extends NodeModel {
	constructor(options) {
		super({
			type: 'SMS',
			message: "",
			color: options.color
		});
		this.addPort(new SMSPortModel(PortModelAlignment.LEFT));
		this.addPort(new SMSPortModel(PortModelAlignment.RIGHT));
	}

	serialize() {
		return {
			...super.serialize(),
			name: this.options.name,
			color: this.options.color,
			message: this.options.message,
		};
	}
}