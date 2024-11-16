import {jwtDecode} from "jwt-decode";

const {
  VITE_SARA_INTE_HOST: saraInteHost,
  VITE_SARA_TOKEN_NAME: saraTokenName,
} = import.meta.env;

const hashToGravatar = (hash, size=80) => {
  return `https://api.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
};

export const useProfile = (avatarSize=80) => {
  const saraToken = localStorage.getItem(saraTokenName);
  if (!saraToken) {
    return null;
  }

  try {
    const data = jwtDecode(saraToken);
    if (Date.now() >= data.exp * 1000) {
      throw new Error("sara token expired");
    }
    const profile = data?.user;
    const avatarHash = profile?.avatar_hash;
    const avatarUrl = hashToGravatar(avatarHash, avatarSize);
    return {...profile, avatarUrl};
  } catch (e) {
    console.warn(e);
    localStorage.removeItem(saraTokenName);
    location.reload();
    return null;
  }
};

export const redirectLogin = (isWithRefer = false) => {
  if (!isWithRefer) {
    location.assign(saraInteHost);
    return;
  }

  const {href: refer} = location;
  const params = new URLSearchParams({refer});
  location.assign(`${saraInteHost}/?${params}`);
};

export const isAllowed = (profile, roleName) => {
  const roles = profile?.roles;
  if (!Array.isArray(roles)) {
    return false;
  }
  return roles.includes(roleName);
};
