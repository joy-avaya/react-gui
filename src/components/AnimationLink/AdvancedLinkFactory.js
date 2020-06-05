import  {
	DefaultLinkFactory,
} from '@projectstorm/react-diagrams';
import * as React from 'react';
import {AdvancedLinkModel} from "./AdvancedLinkModel";
import {AdvancedLinkSegment} from "./AdvancedLinkSegment";


export class AdvancedLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('advanced');
	}

	generateModel() {
		return new AdvancedLinkModel();
	}

	generateLinkSegment(model, selected, path) {
		return (
			<g>
				<AdvancedLinkSegment model={model} path={path} />
			</g>
		);
	}
}