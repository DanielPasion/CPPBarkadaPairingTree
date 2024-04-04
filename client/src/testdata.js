const position = { x: 0, y: 0 };

/////////////////////////////////UBAES/////////////////////////////////////////////
export const initialNodesUbaes = [
  {
    id: 'Renard Pascual',
    data: { label: 'Renard Pascual' },
    position,
  },
  {
    id: 'Daniel Pasion',
    data: { label: 'Daniel Pasion' },
    position,
  },
  {
    id: 'Christie Young-Tayag',
    data: { label: 'Christie Young-Tayag' },
    position,
  }
];

export const initialEdgesUbaes = [
  { id: 'RenardPascual-DanielPasion', source: 'Renard Pascual', target: 'Daniel Pasion', type: 'smoothstep' },
  { id: 'RenardPascual-ChristieYoung-Tayag', source: 'Renard Pascual', target: 'Christie Young-Tayag', type: 'smoothstep' }
];

/////////////////////////////SiniGangGang////////////////////////////////////////
export const initialNodesSiniGangGang = [
  {
    id: 'Natalie Sarabia',
    data: { label: 'Natalie Sarabia' },
    position,
  },
  {
    id: 'Noah Mendoza',
    data: { label: 'Noah Mendoza' },
    position,
  },
  {
    id: 'Julia Patricia',
    data: { label: 'Julia Patricia' },
    position,
  },
  {
    id: 'Leanna Nguyen',
    data: { label: 'Leanna Nguyen' },
    position,
  },
];

export const initialEdgesSiniGangGang = [
  { id: 'NatalieSarabia-NoahMendoza', source: 'Natalie Sarabia', target: 'Noah Mendoza', type: 'smoothstep' },
  { id: 'JuliaPatricia-LeannaNguyen', source: 'Julia Patricia', target: 'Leanna Nguyen', type: 'smoothstep' },
];

/////////////////////////////Pakwans////////////////////////////////////////
export const initialNodesPakwans = [
  {
    id: 'Cesar de Paula',
    data: { label: 'Cesar de Paula' },
    position,
  },
  {
    id: 'Markus Thomas',
    data: { label: 'Markus Thomas' },
    position,
  },
];

export const initialEdgesPakwans = [
  { id: 'CesardePaula-MarkusThomas', source: 'Markus Thomas', target: 'Cesar de Paula', type: 'smoothstep' },
];

/////////////////////////////Pakwans////////////////////////////////////////
export const initialNodesBasaBuddies = [
  {
    id: 'Robechelle Mina',
    data: { label: 'Robechelle Mina' },
    position,
  },
  {
    id: 'Alyssa Arcena',
    data: { label: 'Alyssa Arcena' },
    position,
  },
  {
    id: 'Ethan Bolos',
    data: { label: 'Ethan Bolos' },
    position,
  },
];

export const initialEdgesBasaBuddies = [
  { id: 'RobechelleMina-AlyssaArcena', source: 'Robechelle Mina', target: 'Alyssa Arcena', type: 'smoothstep' },
  { id: 'AlyssaArcena-EthanBolos', source: 'Alyssa Arcena', target: 'Ethan Bolos', type: 'smoothstep' },
];