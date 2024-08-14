/**
 * @file CSRInner.tsx
 * @module CSRInner - CSRInner Component
 * @see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
 *
 * SSR is disabled for this component.
 *
 * @param {({ children: JSX.Element | JSX.Element[] })} param0
 * @param {*} param0.children
 * @returns {*}
 */
const CSRInner = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <>{children}</>;
};

export default CSRInner;
