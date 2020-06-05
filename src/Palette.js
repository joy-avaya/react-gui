// import React from 'react';

// import GraphConfig, { nodeTypes} from './graph-config.js';
// import { findByLabelText } from '@testing-library/react';

// export default class Palette extends React.Component<props> {
//     constructor(props) {
//         super(props)
//     }

//     static getNodeTypeXlinkHref(data: INode, nodeTypes: any) {
//         if (data.type && nodeTypes[data.type]) {
//             return nodeTypes[data.type].shapeId;
//         } else if (nodeTypes.emptyNode) {
//             return nodeTypes.emptyNode.shapeId;
//         }

//         return null;
//     }

//     renderShape(data, nodeKey) {
//         const nodeTypeXlinkHref = Node.getNodeTypeXlinkHref(data, nodeTypes) || '';
    
//         // get width and height defined on def element
//         const defSvgNodeElement: any = nodeTypeXlinkHref
//           ? document.querySelector(`defs>${nodeTypeXlinkHref}`)
//           : null;
//         const nodeWidthAttr = defSvgNodeElement
//           ? defSvgNodeElement.getAttribute('width')
//           : 0;
//         const nodeHeightAttr = defSvgNodeElement
//           ? defSvgNodeElement.getAttribute('height')
//           : 0;
    
//         var width = nodeWidthAttr ? parseInt(nodeWidthAttr, 10) : props.width;
//         var height = nodeHeightAttr ? parseInt(nodeHeightAttr, 10) : props.height;
    
        
//         return (
//         <g className={"nodeShapeContainerClassName"} {...props}>
//             <use
//             className={"nodeClassName"}
//             x={-width / 2}
//             y={-height / 2}
//             width={width}
//             height={height}
//             xlinkHref={nodeTypeXlinkHref}
//             />
//         </g>
//         );
//     }

//     render() {

//         const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

//         return (
//             <div style={{width: '15%', display: 'flex', flexDirection: 'column'}}>
//                 { 
//                     nodeTypes.map(element => {
//                         if (NodeTypes !== undefined && NodeTypes[element] !== undefined) { 
//                             return <div style={{width: 10}} > {NodeTypes[element].shape} </div>
//                         }
//                     })
//                 }
//             </div>
//         )
//     }
// }