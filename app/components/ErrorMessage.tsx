import { PropsWithChildren } from 'react';
import { Badge } from '@radix-ui/themes';

// PropsWithChildren is a utility type from React that adds the children prop to the component's props
// Not necessary to code thee type or interface for the props if we are only using children, but it can be useful if we want to add more props in the future

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return <Badge color="crimson">{children}</Badge>;
};

export default ErrorMessage;
