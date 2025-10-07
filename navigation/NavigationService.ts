import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export interface NavigationError {
  message: string;
  code: string;
}

export class NavigationService {
  static navigate(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
      try {
        (navigationRef as any).navigate(routeName, params);
      } catch (error) {
        console.error("Navigation error:", error);
        this.navigateToFallback();
      }
    }
  }

  static goBack() {
    if (navigationRef.isReady()) {
      try {
        if (navigationRef.canGoBack()) {
          navigationRef.goBack();
        } else {
          this.navigateToFallback();
        }
      } catch (error) {
        console.error("Back navigation error:", error);
        this.navigateToFallback();
      }
    }
  }

  static reset(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
      try {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName, params }],
          })
        );
      } catch (error) {
        console.error("Reset navigation error:", error);
        this.navigateToFallback();
      }
    }
  }

  static replace(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
      try {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName, params }],
          })
        );
      } catch (error) {
        console.error("Replace navigation error:", error);
        this.navigateToFallback();
      }
    }
  }

  static getCurrentRoute() {
    if (navigationRef.isReady()) {
      return navigationRef.getCurrentRoute()?.name;
    }
    return null;
  }

  static canGoBack() {
    if (navigationRef.isReady()) {
      return navigationRef.canGoBack();
    }
    return false;
  }

  private static navigateToFallback() {
    try {
      (navigationRef as any).navigate("MainTabs");
    } catch (fallbackError) {
      console.error("Fallback navigation failed:", fallbackError);
    }
  }

  static validateRoute(route: string): boolean {
    const validRoutes = ["MainTabs", "BottleDetail", "Home", "Settings"];

    return validRoutes.includes(route);
  }

  static navigateWithValidation(routeName: string, params?: object) {
    if (this.validateRoute(routeName)) {
      this.navigate(routeName, params);
    } else {
      console.warn(`Invalid route: ${routeName}. Redirecting to home.`);
      this.navigate("MainTabs", params);
    }
  }

  // Navigation helpers for specific flows
  static navigateToAuth() {
    // No auth flow; go to main tabs
    this.reset("MainTabs");
  }

  static navigateToMain() {
    this.reset("MainTabs");
  }

  static navigateToBottleDetail(bottleId?: string) {
    this.navigate("BottleDetail", { bottleId });
  }

  static navigateToTab(tabName: string) {
    this.navigate("MainTabs", { screen: tabName });
  }
}
