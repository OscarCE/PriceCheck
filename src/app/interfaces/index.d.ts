import
{
  Component as ReactComponent,
  PureComponent as ReactPureComponent,
  ComponentType,
} from 'react';

interface AnyObject
{
  [key: string]: any;
}
interface GlobalState
{
  [key: string]: any;
}

export class Component<P = {}, S = {}> extends ReactComponent<P, S> {
  static getDerivedGlobalFromProps?: (props: AnyObject, prevGloba: GlobalState, prevState: AnyObject) => NewGlobal;
  private _globalCallback: () => void;
  readonly global: Readonly<GlobalState>;
  setGlobal(newGlobal: NewGlobal, callback?: GlobalCallback): Promise<void> | void;
}
export class PureComponent<P = {}, S = {}> extends ReactPureComponent<P, S> {
  static getDerivedGlobalFromProps?: (props: AnyObject, prevGloba: GlobalState, prevState: AnyObject) => NewGlobal;
  private _globalCallback: () => void;
  readonly global: Readonly<GlobalState>;
  setGlobal(newGlobal: NewGlobal, callback?: GlobalCallback): Promise<void> | void;
}
export function setGlobal(newGlobal: NewGlobal, callback?: GlobalCallback): Promise<void> | void;
export function useGlobal(): [ GlobalState, GlobalStateSetter ];
export function useGlobal<Property extends keyof GlobalState>(property: Property, setterOnly?: boolean): [ GlobalState[Property], GlobalPropertySetter ];
export function useGlobal(reducer: GlobalReducer): LocalReducer;
export function withGlobal<CP, NP>(getGlobal: MapGlobalToProps<CP, NP>): (Component: ComponentType<CP & NP>) => PureComponent<CP, never>;


type NewGlobal = NewGlobalFunction | null | Partial<GlobalState> | Promise<NewGlobalFunction> | Promise<null> | Promise<Partial<GlobalState>>;
type NewGlobalFunction = (global: GlobalState) => NewGlobal;
type GlobalCallback = (global: GlobalState) => void;
type GlobalStateSetter = (newGlobal: NewGlobal, callback?: GlobalCallback) => Promise<void> | void;
type GlobalReducer = (state: GlobalState, ...args: any[]) => NewGlobal;
type LocalReducer = (...args: any[]) => void;
type MapGlobalToProps<ComponentProps, NewProps> = (global: GlobalState, props: ComponentProps) => NewProps;
type GlobalPropertySetter = (value: any) => void;


interface IReactN
{
  (Component: ComponentType): Component;
  Component: Component;
  setGlobal: (newGlobal: NewGlobal, callback?: GlobalCallback) => Promise<void> | void;
  useGlobal:
  (() => [GlobalState, GlobalStateSetter]) |
  (<Property extends keyof GlobalState>(property: Property, setterOnly?: boolean) => [GlobalState[Property], GlobalPropertySetter]) |
  ((reducer: GlobalReducer) => LocalReducer);
  withGlobal: <CP, NP>(getGlobal: MapGlobalToProps<CP, NP>) => (Component: ComponentType<CP & NP>) => PureComponent<CP, never>;
}

declare namespace ReactN {}
export default ReactN;
