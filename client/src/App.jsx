//import { initialNodesUbaes, initialEdgesUbaes, initialEdgesSiniGangGang,initialNodesSiniGangGang, initialEdgesPakwans,initialNodesPakwans, initialEdgesBasaBuddies, initialNodesBasaBuddies} from './testdata.js';
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
import logo from './assets/barkadalogo.jpg'
import './App.css'
import 'reactflow/dist/style.css';
import axios from 'axios';

//Creating Elk
const elk = new ELK();
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
  };

//Used to edit the way the tree is diplayed
const getLayoutedElements = async (nodes, edges, options = {}) => {
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
  try {
    const layoutedGraph = await elk
      .layout(graph);
    return ({
      nodes: layoutedGraph.children.map((node_1) => ({
        ...node_1,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node_1.x, y: node_1.y },
      })),

      edges: layoutedGraph.edges,
    });
  } catch (message) {
    return console.error(message);
  }
};


  //Used to render all the data
function LayoutFlow() {
  //Fetching all the data
  const [initialNodesUbaes, setInitialNodesUbaes] = useState([]);
  const [initialEdgesUbaes, setInitialEdgesUbaes] = useState([]);
  const [initialNodesSiniGangGang, setInitialNodesSiniGangGang] = useState([]);
  const [initialEdgesSiniGangGang, setInitialEdgesSiniGangGang] = useState([]);
  const [initialNodesPakwans, setInitialNodesPakwans] = useState([]);
  const [initialEdgesPakwans, setInitialEdgesPakwans] = useState([]);
  const [initialNodesBasaBuddies, setInitialNodesBasaBuddies] = useState([]);
  const [initialEdgesBasaBuddies, setInitialEdgesBasaBuddies] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const host = "https://cppbarkadapairingtree.onrender.com/"
  useEffect(() => {
    async function fetchData() {
      const family = await axios.get(host + "/ubaes");
      setInitialNodesUbaes(family.data["nodes"]);
      setInitialEdgesUbaes(family.data["edges"]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const family = await axios.get(host + "/siniganggang");
      setInitialNodesSiniGangGang(family.data["nodes"]);
      setInitialEdgesSiniGangGang(family.data["edges"]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const family = await axios.get(host + "/pakwans");
      setInitialNodesPakwans(family.data["nodes"]);
      setInitialEdgesPakwans(family.data["edges"]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const family = await axios.get(host + "/basabuddies");
      setInitialNodesBasaBuddies(family.data["nodes"]);
      setInitialEdgesBasaBuddies(family.data["edges"]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (
      initialNodesUbaes.length > 0 &&
      initialEdgesUbaes.length > 0 &&
      initialNodesSiniGangGang.length > 0 &&
      initialEdgesSiniGangGang.length > 0 &&
      initialNodesPakwans.length > 0 &&
      initialEdgesPakwans.length > 0 &&
      initialNodesBasaBuddies.length > 0 &&
      initialEdgesBasaBuddies.length > 0
    ) {
      setAllDataLoaded(true);
    }
  }, [
    initialNodesUbaes,
    initialEdgesUbaes,
    initialNodesSiniGangGang,
    initialEdgesSiniGangGang,
    initialNodesPakwans,
    initialEdgesPakwans,
    initialNodesBasaBuddies,
    initialEdgesBasaBuddies
  ]);

  // Log data when all data is loaded
  useEffect(() => {
    if (allDataLoaded) {
      console.log(
        initialNodesBasaBuddies,
        initialEdgesBasaBuddies,
        initialNodesPakwans,
        initialEdgesPakwans,
        initialNodesSiniGangGang,
        initialEdgesSiniGangGang,
        initialNodesUbaes,
        initialEdgesUbaes
      );
    }
  }, [allDataLoaded]);


  const [initialNodes, setInitialNodes] = useState();
  const [initialEdges, setInitialEdges] = useState();
  const [fam, setFam] = useState("Welcome");
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
    else if (fam == "UBAES") {
      document.body.style.background = "#CBC3E3";
      setInitialNodes(initialNodesUbaes);
      setInitialEdges(initialEdgesUbaes);
    }
    else {
      document.body.style.background = "#AAAAAA";
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
  },[initialNodes,initialEdges,]);

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
    <Panel position="bottom-right">
      <div id="bug">See a bug? Contact dnpaxion@gmail.com or .theDaniel on discord to report it.</div>
    </Panel>
    </ReactFlow>
  );
}

  export default () => (
  <div style={{ height:900 }}>
  <ReactFlowProvider>
  <LayoutFlow />
  </ReactFlowProvider>
  </div>

);