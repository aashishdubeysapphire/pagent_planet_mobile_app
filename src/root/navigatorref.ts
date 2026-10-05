import React from 'react';

export const navigationRef = React.createRef();

export const navigate = (path, params) => {
  navigationRef.current.navigate(path, params);
};
