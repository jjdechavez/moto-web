import React from "react";

let lazyImport = (filename: string) => React.lazy(() => (import(`${filename}`)));

export default lazyImport;