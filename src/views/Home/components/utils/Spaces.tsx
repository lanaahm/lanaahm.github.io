import React from 'react';
import styledComponents from 'styled-components';

export const spaces = styledComponents.div`
  height: ${(props) => (props.size ? props.size : '1em')};
`;
