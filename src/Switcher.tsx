import React, { useContext } from 'react';
import AppContext from './contexts/appContext';
import { Context } from './init';
import { AppError } from './util/errors';

const getSelectedComponent = (componentName: string) => {
  switch (componentName) {
    default:
      throw new AppError("Invalid component name provided");
  }
}

const Switcher = () => {
  const appContext = useContext<AppContext>(Context);
  const componentName = appContext.getComponentName();
  const SelectedComponent = getSelectedComponent(componentName);

  return (
    <SelectedComponent />
  )
}

export default Switcher