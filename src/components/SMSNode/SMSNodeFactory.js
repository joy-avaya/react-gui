import { SMSNodeWidget } from './SMSNodeWidget';
import { SMSNodeModel } from './SMSNodeModel';
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

export class SMSNodeFactory extends AbstractReactFactory {
	constructor() {
		super('SMS');
	}

	generateReactWidget(event) {
		return <SMSNodeWidget engine={this.engine} width={200} height={100} node={event.model} />;
	}

	generateModel(event) {
		return new SMSNodeModel();
	}
}