import React from "react";

interface AppProps {
  model?: any;
  updateModel?: any;
  triggerEvent?: any;
}

function App({ updateModel = () => null }: AppProps) {
  // const {
  //   pagination: paginationProps = {},
  //   schema = {},
  //   rowActions = [],
  //   rowSelectionAction = "",
  //   actionColumn = {},
  //   rowIndexColumn = {},
  //   fetcher: { url, headers, body, accessor },
  // } = model;
  // const { enable, pageSize = 20 } = paginationProps;

  React.useEffect(() => {
    updateModel({ data: [{ id: "hello", data: "smurfs" }] });
  }, []);
  console.log('hello from CDN')
  return (
    <>
      <div className="font-bold  bg-red-400">Blah</div>
    </>
  );
}

export default App;
