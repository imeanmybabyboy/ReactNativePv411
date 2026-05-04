import IRoute from '../../Router/model/IRoute';

export default interface IAppContext {
  navigate: (route: IRoute | string) => void;
  activeRoute: IRoute;
}
