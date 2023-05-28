import {
  ActivationEnd,
  ActivationStart,
  ChildActivationEnd,
  ChildActivationStart,
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RoutesRecognized,
  Scroll,
} from '@angular/router';

export default class RouterEvents {
  private static router: Router;
  private static currentRoute: string;
  private static routeLogin: boolean;

  static routerEvents(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        console.clear();
        // * NavigationStart: Navigation starts.
        console.log('NavigationStart --- ', event.url);
        this.validateNavbar(event.url);
      } else if (event instanceof RouteConfigLoadStart) {
        // * RouteConfigLoadStart: Before the router lazy loads a route configuration.
        console.log('RouteConfigLoadStart --- ', event.toString());
      } else if (event instanceof RouteConfigLoadEnd) {
        // * RouteConfigLoadEnd: After a route has been lazy loaded.
        console.log('RouteConfigLoadEnd --- ', event.toString());
      } else if (event instanceof RoutesRecognized) {
        // * RoutesRecognized: When the router parses the URL and the routes are recognized.
        console.log('RoutesRecognized --- ', event.url);
      } else if (event instanceof GuardsCheckStart) {
        // * GuardsCheckStart: When the router begins the guards phase of routing.
        console.log('GuardsCheckStart --- ', event.url);
      } else if (event instanceof ChildActivationStart) {
        // * ChildActivationStart: When the router begins activating a route's children.
        console.log('ChildActivationStart --- ', event.toString());
      } else if (event instanceof ActivationStart) {
        // * ActivationStart: When the router begins activating a route.
        console.log('ActivationStart --- ', event.toString());
      } else if (event instanceof GuardsCheckEnd) {
        // * GuardsCheckEnd: When the router finishes the guards phase of routing successfully.
        console.log('GuardsCheckEnd --- ', event.url);
      } else if (event instanceof ResolveStart) {
        // * ResolveStart: When the router begins the resolve phase of routing.
        console.log('ResolveStart --- ', event.url);
      } else if (event instanceof ResolveEnd) {
        // * ResolveEnd: When the router finishes the resolve phase of routing successfully.
        console.log('ResolveEnd --- ', event.url);
      } else if (event instanceof ChildActivationEnd) {
        // * ChildActivationEnd: When the router finishes activating a route's children.
        console.log('ChildActivationEnd --- ', event.toString());
      } else if (event instanceof ActivationEnd) {
        // * ActivationEnd: When the router finishes activating a route.
        console.log('ActivationEnd --- ', event.toString());
      } else if (event instanceof NavigationEnd) {
        // * NavigationEnd: When navigation ends successfully.
        console.log('NavigationEnd --- ', event.url);
      } else if (event instanceof NavigationCancel) {
        // * NavigationCancel: When navigation is canceled.
        console.log('NavigationCancel --- ', event.url);
      } else if (event instanceof NavigationError) {
        // * NavigationError: When navigation fails due to an unexpected error.
        console.log('NavigationError --- ', event.error);
      } else if (event instanceof Scroll) {
        // * Scroll: When the user scrolls.
        console.log('Scroll --- ', event.position);
      }
    });
  }

  public static validateNavbar(eventUrl: string): boolean {
    return (this.routeLogin =
      eventUrl === '' ||
      eventUrl === '/' ||
      eventUrl === '/login' ||
      eventUrl === '/register' ||
      eventUrl === '/forgotPassword' ||
      eventUrl === '/changePassword');
  }
}
