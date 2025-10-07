import { useNavigation as useRNNavigation } from "@react-navigation/native";
import { NavigationService } from "../navigation/NavigationService";

export const useNavigation = () => {
  const navigation = useRNNavigation();

  return {
    ...navigation,
    // Enhanced navigation methods with error handling
    navigate: (routeName: string, params?: object) => {
      NavigationService.navigateWithValidation(routeName, params);
    },
    goBack: () => {
      NavigationService.goBack();
    },
    reset: (routeName: string, params?: object) => {
      NavigationService.reset(routeName, params);
    },
    replace: (routeName: string, params?: object) => {
      NavigationService.replace(routeName, params);
    },
    // Helper methods
    navigateToAuth: () => NavigationService.navigateToAuth(),
    navigateToMain: () => NavigationService.navigateToMain(),
    navigateToBottleDetail: (bottleId?: string) =>
      NavigationService.navigateToBottleDetail(bottleId),
    navigateToTab: (tabName: string) =>
      NavigationService.navigateToTab(tabName),
  };
};
