import {
  redirectLogin,
} from "../plugins/profile";

import router from "../router";

export const title = "Freya 芙蕾雅";
export const subtitle = "LINE 社群加入申請驗證平台";

export const isSaraEnabled = true;
export const onClickSara = (profile) => {
  const isLoggedIn = !!profile;
  if (isLoggedIn) {
    router.push("/profile");
  } else {
    redirectLogin(true);
  }
};

export const menuItems = [];
