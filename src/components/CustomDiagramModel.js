import { DiagramModel } from "@projectstorm/react-diagrams";
import {Command} from "../helpers/Command";

export class CustomDiagramModel extends DiagramModel {

    removeLink(link) {
        
        let command = new Command(
            () => super.removeLink(link),
            () => super.addLink(link),
        );

        // @ts-ignore
        window.commandManager.addCommand(command);

        return super.removeLink(link);
    }

    addLink(link) {
        let command = new Command(
            () => super.addLink(link),
            () => super.removeLink(link),
        );

        // @ts-ignore
        window.commandManager.addCommand(command);

        return super.addLink(link);
    }

    addNode(node) {
        const command = new Command(
            () => super.addNode(node),
            () => super.removeNode(node),
        );
        
        node.registerListener({
            eventDidFire: (e) => {console.log("********************"); console.log(e); console.log("********************")}
        });

        // @ts-ignore
        window.commandManager.addCommand(command);

        return super.addNode(node);
    }

    removeNode(node) {
        const command = new Command(
            () => super.removeNode(node),
            () => super.addNode(node),
        );

        // @ts-ignore
        window.commandManager.addCommand(command);

        return super.removeNode(node);
    }

    addAll(...models) {
        return super.addAll(...models);
    }
}