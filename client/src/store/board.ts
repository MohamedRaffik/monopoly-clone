const BoardInfo: TileInfo[] = [
  { type: 'Go' },
  { type: 'Property', props: { color: 'brown', propertyName: 'Mediterranean Avenue' } },
  { type: 'CommunityChest', props: { direction: 'S' } },
  { type: 'Property', props: { color: 'brown', propertyName: 'Baltic Avenue' } },
  { type: 'Tax', props: { direction: 'S', taxName: 'Income', image: 128176 } },
  { type: 'RailRoad', props: { direction: 'S', railroadName: 'Reading Railroad' } },
  { type: 'Property', props: { color: 'lightblue', propertyName: 'Oriental Avenue' } },
  { type: 'Chance', props: { direction: 'S' } },
  { type: 'Property', props: { color: 'lightblue', propertyName: 'Vermont Avenue' } },
  { type: 'Property', props: { color: 'lightblue', propertyName: 'Connecticut Avenue' } },
  { type: 'Jail' },
  { type: 'Property', props: { color: 'hotpink', propertyName: 'St. Charles Place' } },
  { type: 'Utility', props: { direction: 'W', utilityName: 'Electric Company', image: 128161 } },
  { type: 'Property', props: { color: 'hotpink', propertyName: 'States Avenue' } },
  { type: 'Property', props: { color: 'hotpink', propertyName: 'Virginia Avenue' } },
  { type: 'RailRoad', props: { direction: 'W', railroadName: 'Pennsylvania Railroad' } },
  { type: 'Property', props: { color: 'orange', propertyName: 'St. James Place' } },
  { type: 'CommunityChest', props: { direction: 'W' } },
  { type: 'Property', props: { color: 'orange', propertyName: 'Tennessee Avenue' } },
  { type: 'Property', props: { color: 'orange', propertyName: 'New York Avenue' } },
  { type: 'FreeParking' },
  { type: 'Property', props: { color: 'red', propertyName: 'Kentucky Avenue' } },
  { type: 'Chance', props: { direction: 'S' } },
  { type: 'Property', props: { color: 'red', propertyName: 'Indiana Avenue' } },
  { type: 'Property', props: { color: 'red', propertyName: 'Illinois Avenue' } },
  { type: 'RailRoad', props: { direction: 'S', railroadName: 'B.&O. Railroad' } },
  { type: 'Property', props: { color: 'yellow', propertyName: 'Atlantic Avenue' } },
  { type: 'Property', props: { color: 'yellow', propertyName: 'Ventnor Avenue' } },
  { type: 'Utility', props: { direction: 'S', utilityName: 'Water Works', image: 128688 } },
  { type: 'Property', props: { color: 'yellow', propertyName: 'Marvin Gardens' } },
  { type: 'GoToJail' },
  { type: 'Property', props: { color: 'green', propertyName: 'Pacific Avenue' } },
  { type: 'Property', props: { color: 'green', propertyName: 'North Carolina Avenue' } },
  { type: 'CommunityChest', props: { direction: 'E' } },
  { type: 'Property', props: { color: 'green', propertyName: 'Pennsylvania Avenue' } },
  { type: 'RailRoad', props: { direction: 'E', railroadName: 'Short Line' } },
  { type: 'Chance', props: { direction: 'E' } },
  { type: 'Property', props: { color: 'blue', propertyName: 'Park Place' } },
  { type: 'Tax', props: { direction: 'E', taxName: 'Luxury', image: 128141 } },
  { type: 'Property', props: { color: 'blue', propertyName: 'Boardwalk' } },  
]

export const createBoardCoordinateGrid = (Size: number) => {
  const board: TileCoordInfo[] = [];
  for (let i = 9; i >= 0; i--) {
    board.push({ 
      x: (Size * .131) + (i * Size * .082), 
      y: Size - (Size * .131), 
      width: board.length % 10 === 0 ? Size * .13 : Size * .082,
      height: Size * .13,
      info: BoardInfo[board.length] 
    });
  }

  for (let i = 9; i >= 0; i--) {
    board.push({ 
      x: 0, 
      y: (Size * .131) + (i * Size * .082), 
      width: Size * .13,
      height: board.length % 10 === 0 ? Size * .13 : Size * .082,
      info: BoardInfo[board.length] 
    });
  }

  board.push({ 
    x: 0, 
    y: 0,
    width: Size * .13,
    height: Size * .13,
    info: BoardInfo[board.length]
  });
  for (let i = 0; i < 9; i++) {
    board.push({ 
      x: (Size * .131) + (i * Size * .082), 
      y: 0,
      width: Size * .082,
      height: Size * .13,
      info: BoardInfo[board.length] 
    });
  }

  board.push({ 
    x: Size - (Size * .131), 
    y: 0,
    width: Size * .13,
    height: Size * .13,
    info: BoardInfo[board.length] 
  });
  for (let i = 0; i < 9; i++) {
    board.push({ 
      x: Size - (Size * .131), 
      y: (Size * .131) + (i * Size * .082),
      width: Size * .13,
      height: board.length % 10 === 0 ? Size * .13 : Size * .082,
      info: BoardInfo[board.length] 
    });
  }
  return board;
}

interface PlayerInfo {
  currentTile: number,
  move: number,
  phase: PlayerPhases
}

export const createPlayers = () => {
  const a: PlayerInfo[] = [];
  for (let i = 0; i < 8; i++) {
    a.push({ currentTile: 0, move: 0, phase: 'WAITING' })
  }
  return a;
}