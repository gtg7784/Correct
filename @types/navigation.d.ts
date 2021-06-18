export {};

interface IAnswer {
  [key: number]: number | string;
}
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
    SelectQuestionCheckNumberScreen: {
      workbookId: number;
    };
    WriteAnswerCheckScreen: {
      workbookId: number;
      firstNumber: number;
      lastNumber: number;
    };
    CheckAnswerScreen: {
      workbookId: number;
      firstNumber: number;
      lastNumber: number;
      answers: IAnswer;
    };
  };

  export type AnswerStackType = {
    SelectBookScreen: undefined;
    SelectQuestionNumberScreen: {
      workbookId: number;
    };
    WriteAnswerScreen: {
      workbookId: number;
      firstNumber: number;
      lastNumber: number;
    };
  };

  export type SettingStaackType = {
    SettingScreen: undefined;
    ProfileScreen: undefined;
    NoticeScreen: undefined;
    NoticeDetailScreen: undefined;
    ReportScreen: undefined;
  };
}
