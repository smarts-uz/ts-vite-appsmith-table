import React from "https://cdn.jsdelivr.net/npm/react@18.3.1/+esm";
import ReactDOM from "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/+esm";
import { ClientTable } from "https://cdn.jsdelivr.net/npm/@teamprodevs/appsmith-custom-table@0.4.1/+esm";

function App() {
  return (
    <ClientTable
      indexRow={appsmith.model.indexColumn}
      rowActions={appsmith.model.rowActions || []}
      actionColumn={appsmith.model.actionColumn || undefined}
      data={appsmith.model.data || []}
      schema={appsmith.model.schema}
      triggerEvent={appsmith.triggerEvent}
      updateModel={appsmith.updateModel}
    />
  );
}
appsmith.onReady(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
