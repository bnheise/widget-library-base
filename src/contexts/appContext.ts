import { ToastKey } from "../components/alertProvider/AlertProvider";
import { COMPONENT, CONFIG_ID } from "../util/constants";
import { ConfigError } from "../util/errors";

export default class AppContext {
  readonly elementId: string;
  private rootReactElement: Element | null;
  private componentName: string | null;
  private rootRemoteAppElement: Element | null;
  private _setToastItems: React.Dispatch<
    React.SetStateAction<Map<string, [ToastKey, string]>>
  > | null;

  constructor(elementId: string) {
    this.elementId = elementId;
    this.rootReactElement = null;
    this.componentName = null;
    this.rootRemoteAppElement = null;
    this._setToastItems = null;
  }

  clone() {
    const newContext = new AppContext(this.elementId);
    if (this.rootReactElement)
      newContext.setRootReactElement(this.rootReactElement);
    return newContext;
  }

  setRootReactElement(rootElement: Element) {
    this.rootReactElement = rootElement;
  }

  getRootReactElement(): Element {
    if (this.rootReactElement === null)
      throw new ConfigError("Root react element not set");
    return this.rootReactElement;
  }

  private getRootRemoteAppElement(): Element {
    if (this.rootRemoteAppElement === null) {
      let element = this.getRootReactElement();
      while (element.tagName !== this.elementId.toUpperCase()) {
        if (element.parentElement === null) {
          throw new ConfigError(
            `Could not find element with tag name ${this.elementId}`
          );
        }
        element = element.parentElement;
      }

      this.rootRemoteAppElement = element;
    }

    return this.rootRemoteAppElement;
  }

  private getAttribute(key: string, val: string | null): string {
    if (val === null) {
      const root = this.getRootRemoteAppElement();
      val = root.getAttribute(key);
    }

    if (val === null) {
      throw new ConfigError(
        `Element ${this.elementId} did not have an attribute called ${key}`
      );
    }

    return val;
  }

  getComponentName(): string {
    this.componentName = this.getAttribute(COMPONENT, this.componentName);
    return this.componentName;
  }

  setSetToastItems(
    setToastItems: React.Dispatch<
      React.SetStateAction<Map<string, [ToastKey, string]>>
    >
  ): void {
    this._setToastItems = setToastItems;
  }

  setToastItems(
    items:
      | Map<ToastKey, [ToastKey, string]>
      | ((
          prevState: Map<string, [ToastKey, string]>
        ) => Map<string, [ToastKey, string]>)
  ): void {
    if (this._setToastItems === null)
      throw new Error("setToastItems is not initialized");
    this._setToastItems(items);
  }
}
