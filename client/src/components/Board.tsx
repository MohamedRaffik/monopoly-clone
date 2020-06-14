import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, updateSize } from  '../store';
import { PropertyTile, RailRoadTile, UtilityTile, ChanceTile, CommunityChestTile, TaxTile, FreeParkingTile, GoToJailTile, GoTile, JailTile } from './Tile';

const resolveComponent = (TileInfo: TileCoordInfo, key: Number) => {
  switch (TileInfo.info.type) {
    case 'Chance':
      return <ChanceTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'CommunityChest':
      return <CommunityChestTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'FreeParking':
      return <FreeParkingTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} />
    case 'Go':
      return <GoTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} />
    case 'GoToJail':
      return <GoToJailTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} />
    case 'Jail':
      return <JailTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} />
    case 'Property':
      return <PropertyTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'RailRoad':
      return <RailRoadTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'Tax':
      return <TaxTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
    case 'Utility':
      return <UtilityTile key={key.toString()} x={TileInfo.x} y={TileInfo.y} {...TileInfo.info.props} />
   }
}

const Board = () => {
  const dispatch = useDispatch();
  const { Size, Width, Height, Board } = useSelector((state: State) => ({
    Size: state.Size,
    Width: state.Width,
    Height: state.Height,
    Board: state.Board
  }));

  const [p1coords, updateP1Coords] = useState({ x: Height + 9.05 * Width, y: Size * .95 })
  const p1ref = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    const checkHeight = () => {
      if (Size === window.innerHeight) return;
      dispatch(updateSize(window.innerHeight));
    };
    const a = setInterval(checkHeight, 500);
    return () => clearInterval(a);
  });

  const onTokenClick = (index: number) => {
    const transform = `translate(-${Width * 5}px, 0)`; 
    const a = p1ref.current?.animate([{ transform: `translate(0, 0)` }, { transform }], { duration: 500 });
    a?.addEventListener('finish', () => {
      console.log('GO')
      updateP1Coords({ x: p1coords.x - Width * 5, y: p1coords.y });
    })
  };

  return (
    <svg width={Size} height={Size}>
      <g x={0} y={0} width={Size} height={Size}>
        {
          Board.map((info, index) => resolveComponent(info, index))
        }
        <rect ref={p1ref} x={p1coords.x} y={p1coords.y} width={'1%'} height={'1%'} fill={'black'} onClick={() => onTokenClick(1)} />

      </g>
    </svg>
  );
};

export default Board;


