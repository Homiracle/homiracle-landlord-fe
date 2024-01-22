import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function AirPurifier() {
  return (
    <Svg width={40} height={40} viewBox='0 0 40 40' fill='none'>
      <Circle opacity={0.05} cx={20} cy={20} r={20} fill='#6F1E51' />
      <Path
        d='M14.75 11.25V15h5v-3.75c0-.691-.559-1.25-1.25-1.25H16c-.691 0-1.25.559-1.25 1.25zm0 5C12.68 16.25 11 17.93 11 20v8.125C11 29.16 11.84 30 12.875 30h8.75c1.035 0 1.875-.84 1.875-1.875V20c0-2.07-1.68-3.75-3.75-3.75h-5zm2.5 3.75a3.125 3.125 0 110 6.25 3.125 3.125 0 010-6.25zM26 11.875a.171.171 0 00-.086-.14l-1.164-.485-.484-1.164a.171.171 0 00-.141-.086.171.171 0 00-.14.086L23.5 11.25l-1.164.484a.171.171 0 00-.086.141c0 .055.04.117.086.14l1.164.485.484 1.164a.171.171 0 00.141.086c.055 0 .117-.04.14-.086l.485-1.164 1.164-.484a.171.171 0 00.086-.141zm2.984 1.79a.171.171 0 00.141.085c.055 0 .117-.04.14-.086l.485-1.164 1.164-.484a.171.171 0 00.086-.141.171.171 0 00-.086-.14l-1.164-.485-.484-1.164a.171.171 0 00-.141-.086.171.171 0 00-.14.086L28.5 11.25l-1.164.484a.171.171 0 00-.086.141c0 .055.04.117.086.14l1.164.485.484 1.164zm.282 3.92a.171.171 0 00-.141-.085.171.171 0 00-.14.086L28.5 18.75l-1.164.484a.171.171 0 00-.086.141c0 .055.04.117.086.14L28.5 20l.484 1.164a.171.171 0 00.141.086c.055 0 .117-.04.14-.086L29.75 20l1.164-.484a.171.171 0 00.086-.141.171.171 0 00-.086-.14l-1.164-.485-.484-1.164zm-.766-1.96a.171.171 0 00-.086-.14L27.25 15l-.484-1.164a.171.171 0 00-.141-.086.171.171 0 00-.14.086L26 15l-1.164.484a.171.171 0 00-.086.141c0 .055.04.117.086.14L26 16.25l.484 1.164a.171.171 0 00.141.086c.055 0 .117-.04.14-.086l.485-1.164 1.164-.484a.171.171 0 00.086-.141z'
        fill='#6F1E51'
      />
    </Svg>
  );
}

export default AirPurifier;
