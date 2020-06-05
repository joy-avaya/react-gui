import {  PortModel, DefaultLinkModel } from '@projectstorm/react-diagrams';

export class SMSPortModel extends PortModel {
	constructor(alignment) {
		super({
			type: 'SMS',
			name: alignment,
			alignment: alignment,
			maximumLinks: 1,
		});
	}

	createLinkModel() {
		return new DefaultLinkModel();
	}
}