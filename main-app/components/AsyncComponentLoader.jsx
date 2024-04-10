import React, { useEffect, useState } from 'react';

const AsyncComponentLoader = (props) => {
  const [Component, setComponent] = useState(null);

  const willMount = async () => {
    if (!Component) {
      setComponent({ WrappedComponent: await props.moduleProvider() });
    }
  };

  useEffect(() => {
    willMount();
  }, [Component]);

  return Component ? React.createElement(Component.WrappedComponent) : null;
};

export { AsyncComponentLoader };
