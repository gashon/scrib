import type { ComponentType } from 'react';
import * as MUI from '@mui/material';

interface CustomComponents {
  [key: string]: () => Promise<{ default: ComponentType<any> }>;
}

const customComponents: CustomComponents = {
  //   Button: () =>
  //     import('./Button').then((module) => ({ default: module.default })),
  // Add more custom components here
};

type MUITypes = typeof MUI;

const componentProxyHandler: ProxyHandler<MUITypes> = {
  get: (target, prop: keyof MUITypes) => {
    if (Reflect.has(customComponents, prop)) {
      return customComponents[prop as string];
    }
    return target[prop];
  },
};

const MUIProxy = new Proxy<MUITypes>(MUI, componentProxyHandler);

// Export named components
type ComponentExports = {
  [K in keyof MUITypes]: MUITypes[K];
} & {
  [key: string]: any; // Add index signature to handle dynamic keys
};

const components: ComponentExports = {} as ComponentExports;

for (const componentName in MUIProxy) {
  components[componentName] = MUIProxy[componentName as keyof MUITypes];
}

export { components };
