import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, updateSize } from  '../store';
import { PropertyTile, RailRoadTile, UtilityTile, ChanceTile, CommunityChestTile, TaxTile, FreeParkingTile, GoToJailTile, GoTile, JailTile } from './Tile';

const Board = () => {
  const dispatch = useDispatch();
  const { Size, Width, Height } = useSelector((state: State) => ({
    Size: state.Size,
    Width: state.Width,
    Height: state.Height
  }));

  useEffect(() => {
    const checkHeight = () => {
      if (Size === window.innerHeight) return;
      dispatch(updateSize(window.innerHeight));
    };
    const a = setInterval(checkHeight, 500);
    return () => clearInterval(a);
  });

  const onTokenClick = (index: number) => {
    const token = document.getElementById(`P${index}`)
  };

  return (
    <svg width={Size} height={Size}>
      {/* <foreignObject x={0} y={0} width={Size} height={Size}>
        <img width={Size} height={Size} src={'https://images-na.ssl-images-amazon.com/images/I/81btrHKgO0L._AC_SL1500_.jpg'} />
      </foreignObject> */}
      <g x={0} y={0} width={Size} height={Size}>

        <FreeParkingTile x={0} y={0} />
        <PropertyTile x={Size * .131 + 0 * Size * .082} y={0} color={'red'} propertyName={'Kentucky Avenue'} />
        <ChanceTile   x={Size * .131 + 1 * Size * .082} y={0} direction={'S'} />
        <PropertyTile x={Size * .131 + 2 * Size * .082} y={0} color={'red'} propertyName={'Indiana Avenue'} />
        <PropertyTile x={Size * .131 + 3 * Size * .082} y={0} color={'red'} propertyName={'Illinois Avenue'} />
        <RailRoadTile x={Size * .131 + 4 * Size * .082} y={0} direction={'S'} railroadName={'B.&O. Railroad'} />
        <PropertyTile x={Size * .131 + 5 * Size * .082} y={0} color={'yellow'} propertyName={'Atlantic Avenue'} />
        <PropertyTile x={Size * .131 + 6 * Size * .082} y={0} color={'yellow'} propertyName={'Ventnor Avenue'} />
        <UtilityTile  x={Size * .131 + 7 * Size * .082} y={0} direction={'S'} utilityName={'Water Works'} image={128688} />
        <PropertyTile x={Size * .131 + 8 * Size * .082} y={0} color={'yellow'} propertyName={'Marvin Gardens'} />
 
        <PropertyTile       x={0} y={Size * .131 + 0 * Size * .082} color={'orange'} propertyName={'New York Avenue'} />
        <PropertyTile       x={0} y={Size * .131 + 1 * Size * .082} color={'orange'} propertyName={'Tennessee Avenue'} />
        <CommunityChestTile x={0} y={Size * .131 + 2 * Size * .082} direction={'W'} />
        <PropertyTile       x={0} y={Size * .131 + 3 * Size * .082} color={'orange'} propertyName={'St. James Place'} />
        <RailRoadTile       x={0} y={Size * .131 + 4 * Size * .082} direction={'W'} railroadName={'Pennsylvania Railroad'} />
        <PropertyTile       x={0} y={Size * .131 + 5 * Size * .082} color={'hotpink'} propertyName={'Virginia Avenue'} />
        <PropertyTile       x={0} y={Size * .131 + 6 * Size * .082} color={'hotpink'} propertyName={'States Avenue'} />
        <UtilityTile        x={0} y={Size * .131 + 7 * Size * .082} direction={'W'} utilityName={'Electric Company'} image={128161} />
        <PropertyTile       x={0} y={Size * .131 + 8 * Size * .082} color={'hotpink'} propertyName={'St. Charles Place'} />
        <JailTile           x={0} y={Size * .131 + 9 * Size * .082} />

        <GoToJailTile       x={Size - Size * .131} y={0} />
        <PropertyTile       x={Size - Size * .131} y={Size * .131 + 0 * Size * .082} color={'green'} propertyName={'Pacific Avenue'} />
        <PropertyTile       x={Size - Size * .131} y={Size * .131 + 1 * Size * .082} color={'green'} propertyName={'North Carolina Avenue'} />
        <CommunityChestTile x={Size - Size * .131} y={Size * .131 + 2 * Size * .082} direction={'E'} />
        <PropertyTile       x={Size - Size * .131} y={Size * .131 + 3 * Size * .082} color={'green'} propertyName={'Pennsylvania Avenue'} />
        <RailRoadTile       x={Size - Size * .131} y={Size * .131 + 4 * Size * .082} direction={'E'} railroadName={'Short Line'} />
        <ChanceTile         x={Size - Size * .131} y={Size * .131 + 5 * Size * .082} direction={'E'} />
        <PropertyTile       x={Size - Size * .131} y={Size * .131 + 6 * Size * .082} color={'blue'} propertyName={'Park Place'} />
        <TaxTile            x={Size - Size * .131} y={Size * .131 + 7 * Size * .082} direction={'E'} taxName={'Luxury'} image={128141} />
        <PropertyTile       x={Size - Size * .131} y={Size * .131 + 8 * Size * .082} color={'blue'} propertyName={'BoardWalk'} />

        <PropertyTile       x={Size * .131 + 0 * Size * .082} y={Size - Size * .131} color={'lightblue'} propertyName={'Connecticut Avenue'} />
        <PropertyTile       x={Size * .131 + 1 * Size * .082} y={Size - Size * .131} color={'lightblue'} propertyName={'Vermont Avenue'} />
        <ChanceTile         x={Size * .131 + 2 * Size * .082} y={Size - Size * .131} direction={'S'} />
        <PropertyTile       x={Size * .131 + 3 * Size * .082} y={Size - Size * .131} color={'lightblue'} propertyName={'Oriental Avenue'} />
        <RailRoadTile       x={Size * .131 + 4 * Size * .082} y={Size - Size * .131} direction={'S'} railroadName={'Reading Railroad'} />
        <TaxTile            x={Size * .131 + 5 * Size * .082} y={Size - Size * .131} direction={'S'} taxName={'Income'} image={128176} />
        <PropertyTile       x={Size * .131 + 6 * Size * .082} y={Size - Size * .131} color={'brown'} propertyName={'Baltic Avenue'} />
        <CommunityChestTile x={Size * .131 + 7 * Size * .082} y={Size - Size * .131} direction={'S'} />
        <PropertyTile       x={Size * .131 + 8 * Size * .082} y={Size - Size * .131} color={'brown'} propertyName={'Mediterranean Avenue'} />
        <GoTile             x={Size * .131 + 9 * Size * .082} y={Size - Size * .131} />

        <text id="P1" x={Height + 9.05 * Width} y={Size * .95}>TE</text>
        <text id="P2" x={Height + 9.4 * Width} y={Size * .95}>TE</text>
        <text id="P3" x={Height + 9.75 * Width} y={Size * .95}>TE</text>
        <text id="P4" x={Height + 10.1 * Width} y={Size * .95}>TE</text>

        <text id="P5" x={Height + 9.05 * Width} y={Size * .98}>TE</text>
        <text id="P6" x={Height + 9.4 * Width} y={Size * .98}>TE</text>
        <text id="P7" x={Height + 9.75 * Width} y={Size * .98}>TE</text>
        <text id="P8" x={Height + 10.1 * Width} y={Size * .98}>TE</text>

      </g>
    </svg>
  );
};

export default Board;


