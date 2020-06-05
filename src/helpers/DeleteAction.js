import * as _ from 'lodash';
import {  Action, InputType } from '@projectstorm/react-canvas-core';

/**
 * Deletes all selected items, but asks for confirmation first
 */

export default class DeleteItemsAction extends Action {
	constructor(options) {
		const keyCodes = options.keyCodes || [46];
		const modifiers = {
			ctrlKey: false,
			shiftKey: false,
			altKey: false,
			metaKey: false,
			...options.modifiers
		};

		super({
			type: InputType.KEY_DOWN,
			fire: (event) => {
				const { keyCode, ctrlKey, shiftKey, altKey, metaKey } = event.event;

				if (keyCodes.indexOf(keyCode) !== -1 && _.isEqual({ ctrlKey, shiftKey, altKey, metaKey }, modifiers)) {
					_.forEach(this.engine.getModel().getSelectedEntities(), model => {
						// only delete items which are not locked
						if (!model.isLocked()) {
							model.remove();
						}
					});
					this.engine.repaintCanvas();
				}
			}
		});
	}
}

