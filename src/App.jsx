import { initialNodesUbaes, initialEdgesUbaes, initialEdgesSiniGangGang,initialNodesSiniGangGang, initialEdgesPakwans,initialNodesPakwans, initialEdgesBasaBuddies, initialNodesBasaBuddies} from './tests.js';
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import logo from './barkadalogo.jpg'
import './App.css'
import 'reactflow/dist/style.css';

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

//Used to edit the way the tree is diplayed
const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

//Used to render all the data
function LayoutFlow() {
  const [initialNodes, setInitialNodes] = useState(initialNodesUbaes);
  const [initialEdges, setInitialEdges] = useState(initialEdgesUbaes);
  const [fam, setFam] = useState("UBAES");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  //This is what is changed upon clicking the buttons on the top right
  function ubaes(){
    setFam("UBAES")
  }
  function siniganggang(){
    setFam("SINIGANGGANG")
  }
  function pakwans(){
    setFam("PAKWANS")
  }
  function basabuddies(){
    setFam("BASA BUDDIES")
  }

  //Used to update which fam the user is currently selected on
  useEffect(() => {
    if (fam == "BASA BUDDIES") {
      document.body.style.background = "#89CFF0";
      setInitialNodes(initialNodesBasaBuddies);
      setInitialEdges(initialEdgesBasaBuddies);
    }
    else if (fam == "SINIGANGGANG") {
      document.body.style.background = "#FF7074";
      setInitialNodes(initialNodesSiniGangGang);
      setInitialEdges(initialEdgesSiniGangGang);
    }
    else if (fam == "PAKWANS") {
      document.body.style.background = "#4F7942";
      setInitialNodes(initialNodesPakwans);
      setInitialEdges(initialEdgesPakwans);
    }
    else {
      document.body.style.background = "#CBC3E3";
      setInitialNodes(initialNodesUbaes);
      setInitialEdges(initialEdgesUbaes);
    }
  },[fam]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true });
  }, []);

  //Used to rerender the tree
  useEffect(() => {
    let useInitialNodes = true;
    const opts = { 'elk.direction': 'DOWN', ...elkOptions };
    const ns = useInitialNodes ? initialNodes : nodes;
    const es = useInitialNodes ? initialEdges : edges;
    getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      window.requestAnimationFrame(() => fitView());
    });
  },[initialNodes,initialEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel position="top-left">
        <button onClick={ubaes}>UBAES</button>
        <button onClick={siniganggang}>SINIGANGGANG</button>
        <button onClick={pakwans}>PAKWANS</button>
        <button onClick={basabuddies}>BASA BUDDIES</button>
      </Panel>

      <Panel position='top-center'>
        <h1>{fam}</h1>
      </Panel>
      <Panel position="top-right">
        <img src={logo} />
      </Panel>
    </ReactFlow>
  );
}

export default () => (
  <div style={{ height: 800 }}>
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  </div>

);
