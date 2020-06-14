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
  x: string | number;
  y: string | number;
  children?: JSX.Element[] | JSX.Element | string;
  tileType: 'normal' | 'corner';
  alignment: 'vertical' | 'horizontal';
}

export const Tile = (props: TileProps) => {
  let { Width, Height } = useSelector((state: State) => ({
    Width: props.tileType === 'corner' ? state.Height : state.Width,
    Height: state.Height
  }));

  if (props.alignment === 'horizontal') {
    [Width, Height] = [Height, Width];
  }

  return (
    <svg width={Width} height={Height} stroke={'black'} x={props.x} y={props.y}>
      <g>
        <rect x={0} y={0} width={'100%'} height={'100%'} fill={'#CCFFCC'} stroke={'black'} />
        {props.children}
      </g>
    </svg>
  );
};

interface PropertyTileProps {
  x: string | number;
  y: string | number;
  color?: string;
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
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment}>
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
  x: string | number;
  y: string | number;
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
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment}>
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
  x: string | number;
  y: string | number;
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
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment}>
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
  x: string | number;
  y: string | number;
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
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment}>
      <text style={RotateStyle} x={Width * .5} y={Height * .2} textAnchor={'middle'}>CHANCE</text>
      <text style={RotateStyle} x={Width * .5} y={Height * .8} fontSize={'500%'} textAnchor={'middle'}>?</text>
    </Tile>
  );
};

interface CommunityChestTileProps {
  x: string | number;
  y: string | number;
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
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment}>
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
  x: string | number;
  y: string | number;
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
    <Tile x={props.x} y={props.y} tileType={'normal'} alignment={alignment}>
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
  x: string | number;
  y: string | number;
}

export const FreeParkingTile = (props: FreeParkingTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Height,
    Height: state.Height
  }));

  return (
    <Tile x={props.x} y={props.y} tileType={'corner'} alignment={'horizontal'}>
      <text x={Width * .5} y={Height * .2} textAnchor={'middle'}>FREE</text>
      <text x={Width * .5} y={Height * .6} fontSize={'400%'} textAnchor={'middle'}>&#128664;</text>
      <text x={Width * .5} y={Height * .8} textAnchor={'middle'}>PARKING</text>
    </Tile>
  );
};

interface GoToJailTileProps {
  x: string | number;
  y: string | number;
}

export const GoToJailTile = (props: GoToJailTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Height,
    Height: state.Height
  }));

  return (
    <Tile x={props.x} y={props.y} tileType={'corner'} alignment={'horizontal'}>
      <text x={Width * .5} y={Height * .2} textAnchor={'middle'}>GO TO</text>
      <text x={Width * .5} y={Height * .6} fontSize={'300%'} textAnchor={'middle'}>	&#128110;</text>
      <text x={Width * .5} y={Height * .9} textAnchor={'middle'}>JAIL</text>
    </Tile>
  );
};

interface GoTileProps {
  x: string | number;
  y: string | number;
}

export const GoTile = (props: GoTileProps) => {
  const { Width, Height } = useSelector((state: State) => ({
    Width: state.Height,
    Height: state.Height
  }));

  return (
    <Tile x={props.x} y={props.y} tileType={'corner'} alignment={'vertical'}>
      <text x={Width * .5} y={Height * .2} textAnchor={'middle'}>COLLECT $ 200</text>
      <text x={Width * .5} y={Height * .6} textAnchor={'middle'} fontSize={'400%'}>GO</text>
      <text x={Width * .5} y={Height * .9} textAnchor={'middle'} fontSize={'600%'}>&#8592;</text>
    </Tile>
  );
};

interface JailTileProps {
  x: string | number;
  y: string | number;
}

export const JailTile = (props: JailTileProps) => {
  return (
    <Tile x={props.x} y={props.y} tileType={'corner'} alignment={'vertical'}>
      <text x={'50%'} y={'20%'} textAnchor={'middle'}>JAIL</text>
    </Tile>
  );
};
