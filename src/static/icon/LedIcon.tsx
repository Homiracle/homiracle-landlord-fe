import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function LedIcon(props: any) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Circle opacity={0.05} cx={20} cy={20} r={20} fill='#A55EEA' />
      <Path
        d='M12.166 13.125l1.5 1a.754.754 0 01.209 1.04.753.753 0 01-1.04.21l-1.5-1a.754.754 0 01-.21-1.04.753.753 0 011.04-.21zm16.5 1.25l-1.5 1a.748.748 0 01-1.041-.21.748.748 0 01.21-1.04l1.5-1a.748.748 0 011.04.21.748.748 0 01-.21 1.04zM10.75 18h2c.416 0 .75.334.75.75s-.334.75-.75.75h-2a.748.748 0 01-.75-.75c0-.416.334-.75.75-.75zm16.5 0h2c.416 0 .75.334.75.75s-.334.75-.75.75h-2a.748.748 0 01-.75-.75c0-.416.334-.75.75-.75zm-13.584 5.375l-1.5 1a.748.748 0 01-1.041-.21.748.748 0 01.21-1.04l1.5-1a.748.748 0 011.04.21.748.748 0 01-.21 1.04zm13.5-1.247l1.5 1a.754.754 0 01.209 1.04.753.753 0 01-1.04.21l-1.5-1a.754.754 0 01-.21-1.04.753.753 0 011.04-.21zm-3.128.178c-.62.847-1.241 1.7-1.538 2.694h-5c-.3-.997-.922-1.847-1.537-2.694a32.787 32.787 0 01-.482-.669 5.5 5.5 0 119.038-.003c-.156.225-.319.447-.481.669v.003zM22.5 26.5a2.5 2.5 0 11-5 0V26h5v.5zM20 16c.275 0 .5-.225.5-.5s-.225-.5-.5-.5a3.498 3.498 0 00-3.5 3.5c0 .275.225.5.5.5s.5-.225.5-.5A2.5 2.5 0 0120 16z'
        fill='#A55EEA'
      />
    </Svg>
  );
}

export default LedIcon;
