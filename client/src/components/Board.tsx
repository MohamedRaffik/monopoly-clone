import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, updateSize } from  '../store';
import { PropertyTile, RailRoadTile, UtilityTile, ChanceTile, CommunityChestTile, TaxTile, FreeParkingTile, GoToJailTile, GoTile, JailTile } from './Tile';

const resolveComponent = (TileInfo: TileCoordInfo, key: number) => {
  switch (TileInfo.info.type) {
    case 'Chance':
      return <ChanceTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'CommunityChest':
      return <CommunityChestTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'FreeParking':
      return <FreeParkingTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} />
    case 'Go':
      return <GoTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} />
    case 'GoToJail':
      return <GoToJailTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} />
    case 'Jail':
      return <JailTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} />
    case 'Property':
      return <PropertyTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'RailRoad':
      return <RailRoadTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'Tax':
      return <TaxTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'Utility':
      return <UtilityTile key={key.toString()} tileID={key} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
   }
}

const Board = () => {
  const dispatch = useDispatch();
  const { Size, Board } = useSelector((state: State) => ({
    Size: state.Size,
    Board: state.Board,
  }));

  useEffect(() => {
    const checkHeight = () => {
      if (Size === window.innerHeight) return;
      dispatch(updateSize(window.innerHeight));
    };
    const a = setInterval(checkHeight, 500);
    return () => clearInterval(a);
  });

  const BoardTiles = Board.map((info, index) => resolveComponent(info, index));

  return (
    <svg width={Size} height={Size}>
      <g x={0} y={0} width={Size} height={Size}>
        { BoardTiles }
      </g>
    </svg>
  );
};

export default Board;


