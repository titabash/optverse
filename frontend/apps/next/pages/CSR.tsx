import dynamic from "next/dynamic";

/**
 * This is a dynamic import of the CSRInner component.
 *
 * SSR is disabled for this component.
 */
const CSR = dynamic(() => import("./CSRInner"), { ssr: false });

export default CSR;
