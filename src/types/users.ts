export type SupportedLanguage = "en-US" | "pt-BR";

export type UserProfile = {
  language: SupportedLanguage;
};

export type User = {
  profile: UserProfile;
};
