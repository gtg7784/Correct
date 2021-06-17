export {};

declare global {
  export type RootStackType = {
    LoginStack: AuthStackType;
    MainTab: MainTabType;
  };

  export type AuthStackType = {
    SignInScreen: undefined;
    SignUpScreen: undefined;
  };

  export type MainTabType = {
    HomeStack: HomeStackType;
    AnswerStack: undefined;
    SettingStack: undefined;
  };

  export type HomeStackType = {
    HomeScreen: undefined;
  };

  export type AnswerStackType = {
    SelectBookScreen: undefined;
  };

  export type SettingStaackType = {
    SettingScreen: undefined;
  };
}
