type LoadingType<T> = undefined | T | null;

interface Styles {
  [name: string]: React.CSSProperties
}

type Direction = 'S' | 'W' | 'E' | 'N';

type TileType = 'Property' | 'Utility' | 'RailRoad' | 'Chance' | 'CommunityChest' | 'FreeParking' | 'Jail' | 'GoToJail' | 'Go' | 'Tax';

interface TileInfo {
  type: TileType, 
  props?: object
}

interface TileCoordInfo {
  x: number,
  y: number,
  width: number,
  height: number,
  info: TileInfo
}

type GamePhases = 'FIRST ROLL' | 'PLAYING' | 'WAITING';