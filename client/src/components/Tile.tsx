import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../store';

const calcAlignment = (array: any[], value: any) => {
  return array.includes(value) ? 'horizontal' : 'vertical';
};

const calcRotation = (array: any[], value: any, alignment?: 'horizontal' | 'vertical') => {
  const style: React.CSSProperties = { transformOrigin: 'center', transform: '' };
    for (let i in array) {
      if (array[i].includes(value)) {
        style.transform = `rotate(${parseInt(i) * 90}deg) ${alignment === 'horizontal' ? 'translate(19%, -30%)' : ''}`
      }
    }
    return style;
};

interface TileProps {
  x: number;
  y: number;
  tileID: number;
  children?: JSX.Element[] | JSX.Element | string;
  tileType: 'normal' | 'corner';
  alignment: 'vertical' | 'horizontal';
}

export const Tile = (props: TileProps) => {
  const { Players } = useSelector((state: State) => ({
    Players: state.Players
  }));

  let { Width, Height } = useSelector((state: State) => ({
    Width: props.tileType === 'corner' ? state.Height : state.Width,
    Height: state.Height
  }));

  if (props.alignment === 'horizontal') {
    [Width, Height] = [Height, Width];
  }

  const PlayerTokens = Players.map((tile, index) => {
    if (tile === props.tileID) {
      return (
        <rect id={`player${index + 1}`} x={`${(10 * (index + 1))}%`} y={'55%'} width={'5%'} height={'5%'} fill={'red'} />
      );
    }
  });

  return (
    <svg width={Width} height={Height} stroke={'black'} x={props.x} y={props.y}>
      <g>
        <rect x={0} y={0} width={'100%'} height={'100%'} fill={'#CCFFCC'} stroke={'black'} />
        { props.children }
        { PlayerTokens }
      </g>
    </svg>
  );
};

interface PropertyTileProps {
  x: number;
  y: number;
  color?: string;
  tileID: number;
  propertyName?: string;
}

export const PropertyTile = (props: PropertyTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Width,
    Height: state.Height
  }));

  const alignment = useMemo(() => calcAlignment(['orange', 'hotpink', 'green', 'blue'], props.color), [props.color]);

  const RotateStyle = useMemo(() => {
    const colors = [ ['lightblue', 'brown'], ['orange', 'hotpink'], ['', ''], ['green', 'blue'] ];
    return calcRotation(colors, props.color, alignment);
  }, [props.color, alignment]);

  return (
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment} tileID={props.tileID}>
      <rect style={RotateStyle} x={0} y={0} width={Width} height={Height * .2} fill={props.color} />
      <text style={RotateStyle}>
      {
        (props.propertyName || '').toLocaleUpperCase().split(' ').map((string, index) => (
          <tspan key={string} x={Width * .5} y={(Height * .35) + (Height * index * .10)} textAnchor={'middle'} fontSize={'70%'}>{string}</tspan>
        ))
      }
      </text>
      <text style={RotateStyle} x={Width * .5} y={Height * .9} textAnchor={'middle'} fontSize={'70%'}>{'$ 100'.toLocaleUpperCase()}</text>
    </Tile>
  );
};

interface RailRoadTileProps {
  x: number;
  y: number;
  tileID: number;
  direction?: Direction;
  railroadName?: string;
}

export const RailRoadTile = (props: RailRoadTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Width,
    Height: state.Height
  }));

  const alignment = useMemo(() => calcAlignment(['W', 'E'], props.direction), [props.direction]);

  const RotateStyle = useMemo(() => {
    const directions = [['S'], ['W'], ['N'], ['E']];
    return calcRotation(directions, props.direction, alignment);
  }, [props.direction, alignment]);

  return (
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment} tileID={props.tileID}>
      <text style={RotateStyle}>
        {
          (props.railroadName || '').split(' ').map((string, index) => (
            <tspan key={string} x={Width * .5} y={(Height * .15) + (Height * index * .10)} textAnchor={'middle'} fontSize={'70%'}>{string}</tspan>
          ))
        }
      </text>
      <text style={RotateStyle} x={Width * .5} y={Height * .65} textAnchor={'middle'} fontSize={'250%'}>&#128646;</text>
      <text style={RotateStyle} x={Width * .5} y={Height * .9} textAnchor={'middle'} fontSize={'70%'}>{'$ 100'.toLocaleUpperCase()}</text>
    </Tile>
  );
};

interface UtilityTileProps {
  x: number;
  y: number;
  tileID: number;
  direction?: Direction;
  utilityName?: string;
  image?: number;
}

export const UtilityTile = (props: UtilityTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Width,
    Height: state.Height
  }));

  const alignment = useMemo(() => calcAlignment(['W', 'E'], props.direction), [props.direction]);

  const RotateStyle = useMemo(() => {
    const directions = [['S'], ['W'], ['N'], ['E']];
    return calcRotation(directions, props.direction, alignment);
  }, [props.direction, alignment]);

  return (
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment} tileID={props.tileID}>
      <text style={RotateStyle}>
        {
          (props.utilityName || '').toLocaleUpperCase().split(' ').map((string, index) => (
            <tspan key={string} x={Width * .5} y={(Height * .15) + (Height * index * .10)} textAnchor={'middle'} fontSize={'70%'}>{string}</tspan>
          ))
        }
      </text>
      <text x={Width * .5} y={Height * .65} style={RotateStyle} textAnchor={'middle'} fontSize={'250%'}>{String.fromCodePoint(props.image || 0)}</text>
      <text style={RotateStyle} x={Width * .5} y={Height * .9} textAnchor={'middle'} fontSize={'70%'}>{'$ 100'.toLocaleUpperCase()}</text>
    </Tile>
  );
};

interface ChanceTileProps {
  x: number;
  y: number;
  tileID: number;
  direction?: Direction;
}

export const ChanceTile = (props: ChanceTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Width,
    Height: state.Height
  }));

  const alignment = useMemo(() => calcAlignment(['W', 'E'], props.direction), [props.direction]);

  const RotateStyle = useMemo(() => {
    const directions = [['S'], ['W'], ['N'], ['E']];
    return calcRotation(directions, props.direction, alignment);
  }, [props.direction, alignment]);
  
  return (
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment} tileID={props.tileID}>
      <text style={RotateStyle} x={Width * .5} y={Height * .2} textAnchor={'middle'}>CHANCE</text>
      <text style={RotateStyle} x={Width * .5} y={Height * .8} fontSize={'500%'} textAnchor={'middle'}>?</text>
    </Tile>
  );
};

interface CommunityChestTileProps {
  x: number;
  y: number;
  tileID: number;
  direction?: Direction;
}

export const CommunityChestTile = (props: CommunityChestTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Width,
    Height: state.Height
  }));

  const alignment = useMemo(() => calcAlignment(['W', 'E'], props.direction), [props.direction]);

  const RotateStyle = useMemo(() => {
    const directions = [['S'], ['W'], ['N'], ['E']];
    return calcRotation(directions, props.direction, alignment);
  }, [props.direction, alignment]);

  return (
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment} tileID={props.tileID}>
      <text style={RotateStyle}>
        {
          'COMMUNITY CHEST'.split(' ').map((string, index) => (
            <tspan key={string} x={Width * .5} y={(Height * .15) + (Height * index * .10)} textAnchor={'middle'} fontSize={'70%'}>{string}</tspan>
          ))
        }
      </text>
      <text style={RotateStyle} x={Width * .5} y={Height * .8} fontSize={'500%'} textAnchor={'middle'}>[]</text>
    </Tile>
  );
};

interface TaxTileProps {
  x: number;
  y: number;
  tileID: number;
  direction?: Direction;
  taxName?: string;
  image?: number;
}

export const TaxTile = (props: TaxTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Width,
    Height: state.Height
  }));

  const alignment = useMemo(() => calcAlignment(['W', 'E'], props.direction), [props.direction]);

  const RotateStyle = useMemo(() => {
    const directions = [['S'], ['W'], ['N'], ['E']];
    return calcRotation(directions, props.direction, alignment);
  }, [props.direction, alignment]);
  
  return (
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment} tileID={props.tileID}>
      <text style={RotateStyle}>
        {
          (props.taxName + ' tax').toLocaleUpperCase().split(' ').map((string, index) => (
            <tspan key={string} x={Width * .5} y={(Height * .15) + (Height * index * .10)} textAnchor={'middle'} fontSize={'70%'}>{string}</tspan>
          ))
        }
      </text>
      <text x={Width * .5} y={Height * .65} style={RotateStyle} textAnchor={'middle'} fontSize={'250%'}>{String.fromCodePoint(props.image || 0)}</text>
      <text style={RotateStyle} x={Width * .5} y={Height * .9} textAnchor={'middle'} fontSize={'70%'}>{'$ 100'.toLocaleUpperCase()}</text>
    </Tile>
  );
};

interface FreeParkingTileProps {
  x: number;
  y: number;
  tileID: number;
}

export const FreeParkingTile = (props: FreeParkingTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Height,
    Height: state.Height
  }));

  return (
    <Tile x={props.x} y={props.y} tileType={'corner'} alignment={'horizontal'} tileID={props.tileID}>
      <text x={Width * .5} y={Height * .2} textAnchor={'middle'}>FREE</text>
      <text x={Width * .5} y={Height * .6} fontSize={'400%'} textAnchor={'middle'}>&#128664;</text>
      <text x={Width * .5} y={Height * .8} textAnchor={'middle'}>PARKING</text>
    </Tile>
  );
};

interface GoToJailTileProps {
  x: number;
  y: number;
  tileID: number;
}

export const GoToJailTile = (props: GoToJailTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Height,
    Height: state.Height
  }));

  return (
    <Tile x={props.x} y={props.y} tileType={'corner'} alignment={'horizontal'} tileID={props.tileID}>
      <text x={Width * .5} y={Height * .2} textAnchor={'middle'}>GO TO</text>
      <text x={Width * .5} y={Height * .6} fontSize={'300%'} textAnchor={'middle'}>	&#128110;</text>
      <text x={Width * .5} y={Height * .9} textAnchor={'middle'}>JAIL</text>
    </Tile>
  );
};

interface GoTileProps {
  x: number;
  y: number;
  tileID: number;
}

export const GoTile = (props: GoTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Height,
    Height: state.Height
  }));

  return (
    <Tile x={props.x} y={props.y} tileType={'corner'} alignment={'vertical'} tileID={props.tileID}>
      <text x={Width * .5} y={Height * .2} textAnchor={'middle'}>COLLECT $ 200</text>
      <text x={Width * .5} y={Height * .6} textAnchor={'middle'} fontSize={'400%'}>GO</text>
      <text x={Width * .5} y={Height * .9} textAnchor={'middle'} fontSize={'600%'}>&#8592;</text>
    </Tile>
  );
};

interface JailTileProps {
  x: number;
  y: number;
  tileID: number;
}

export const JailTile = (props: JailTileProps) => {
  return (
    <Tile x={props.x} y={props.y} tileType={'corner'} alignment={'vertical'} tileID={props.tileID}>
      <text x={'50%'} y={'20%'} textAnchor={'middle'}>JAIL</text>
    </Tile>
  );
};
