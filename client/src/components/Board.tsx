import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, updateSize, movePlayer } from  '../store';
import { PropertyTile, RailRoadTile, UtilityTile, ChanceTile, CommunityChestTile, TaxTile, FreeParkingTile, GoToJailTile, GoTile, JailTile } from './Tile';

const resolveComponent = (TileInfo: TileCoordInfo, key: number) => {
  switch (TileInfo.info.type) {
    case 'Chance':
      return <ChanceTile key={key.toString()} tileID={key} {...TileInfo.info.props} />
    case 'CommunityChest':
      return <CommunityChestTile key={key.toString()} tileID={key} {...TileInfo.info.props} />
    case 'FreeParking':
      return <FreeParkingTile key={key.toString()} tileID={key} />
    case 'Go':
      return <GoTile key={key.toString()} tileID={key} />
    case 'GoToJail':
      return <GoToJailTile key={key.toString()} tileID={key} />
    case 'Jail':
      return <JailTile key={key.toString()} tileID={key} />
    case 'Property':
      return <PropertyTile key={key.toString()} tileID={key} {...TileInfo.info.props} />
    case 'RailRoad':
      return <RailRoadTile key={key.toString()} tileID={key} {...TileInfo.info.props} />
    case 'Tax':
      return <TaxTile key={key.toString()} tileID={key} {...TileInfo.info.props} />
    case 'Utility':
      return <UtilityTile key={key.toString()} tileID={key} {...TileInfo.info.props} />
   }
}

const Board = () => {
  const dispatch = useDispatch();

  const { Size, Board, Players } = useSelector((state: State) => ({
    Size: state.Size,
    Board: state.Board,
    Players: state.Players
  }));

  const calcPlayerCoordinates = (tile: TileCoordInfo, player: number) => {
    let { x, y, width, height } = tile;
    x += (width * .1) + (width * .1 * ((player - 1) % 4));
    y += height * (.55 + (.1 * Math.floor((player - 1) / 4)));
    return { x, y }
  }

  const animatePlayerMove = (player: number, tiles: number) => {    
    const playerElement = document.getElementById(`player${player}`) as unknown as SVGRectElement;
    let currentTile = Players[player - 1].currentTile;

    const moveOneTile = (tilesRemaining: number) => {
      if (tilesRemaining === 0) {
        dispatch(movePlayer(player, currentTile));
        return;
      }
      const nextBoardTile = Board[(currentTile + 1) % 40];
      const curX = playerElement.x.baseVal.value;
      const curY = playerElement.y.baseVal.value;
      const newCoord = calcPlayerCoordinates(nextBoardTile, player);

      const a = playerElement.animate([
        { transform: 'translate(0, 0)' }, 
        { transform: `translate(${newCoord.x - curX}px, ${newCoord.y - curY}px)` }
      ], { duration: 250 });
      
      a.addEventListener('finish', () => {
        playerElement.setAttribute('x', (newCoord.x).toString());
        playerElement.setAttribute('y', (newCoord.y).toString());
        currentTile = (currentTile + 1) % 40;
        moveOneTile(tilesRemaining - 1);
      });
    }
    moveOneTile(tiles);
  }

  useEffect(() => {
    const checkHeight = () => {
      if (Size === window.innerHeight) return;
      dispatch(updateSize(window.innerHeight));
    };
    const a = setInterval(checkHeight, 500);
    return () => clearInterval(a);
  });

  const BoardTiles = Board.map((info, index) => resolveComponent(info, index));

  const PlayerTokens = Players.map((player, index) => {
    const { x, y } = calcPlayerCoordinates(Board[player.currentTile], index + 1);
    return (
      <rect key={`player${index + 1}`} id={`player${index + 1}`} x={x} y={y} width={'1%'} height={'1%'} fill={'red'} stroke={'black'} onClick={() => animatePlayerMove(index + 1, 12)} />
    );
  });

  return (
    <svg width={Size} height={Size}>
      <g x={0} y={0} width={Size} height={Size}>
        { BoardTiles }
        { PlayerTokens }
      </g>
    </svg>
  );
};

export default Board;


