import ReactDOM from "react-dom";
import React, { createContext } from "react";
import "./app.scss";
import AppContext from "./contexts/appContext";
import WidgetProvider from "./components/widgetProvider/WidgetProvider";

const ELEMENT_ID = 'sugar-components';
const contextData = new AppContext(ELEMENT_ID);

export const Context = createContext(contextData);

class WebComponent extends HTMLElement {

  connectedCallback() {
    const internalContext = contextData.clone();
    internalContext.setRootReactElement(this);

    ReactDOM.render(
      <WidgetProvider internalContext={internalContext} />,
      this
    );
  }
}

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, WebComponent);
}