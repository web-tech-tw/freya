import {
  redirectLogin,
} from "../plugins/profile";

export const title = "Freya 芙蕾雅";
export const subtitle = "LINE 社群加入申請驗證平台";

export const isSaraEnabled = true;
export const onClickSara = (profile) => {
  const isLoggedIn = !!profile;
  redirectLogin(!isLoggedIn);
};

export const menuItems = [];
