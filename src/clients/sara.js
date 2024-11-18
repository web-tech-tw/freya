import ky from "ky";

const {
  VITE_SARA_RECV_HOST: baseUrl,
  VITE_SARA_TOKEN_TYPE: saraTokenType,
} = import.meta.env;

export const useClient = () => {
  return ky.create({
    prefixUrl: baseUrl,
  });
};

const hashToGravatar = (hash, size=80) => {
  return `https://api.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
};

export const getUserProfile = async (client, id, size=80) => {
  if (saraTokenType === "TEST") {
    const nickname = id.substring(0, 8);
    const avatarUrl = hashToGravatar(id, size);
    return {id, nickname, avatarUrl};
  }

  const user = await client.get(`users/${id}`).json();
  const {nickname, avatar_hash: avatarHash} = user.profile;
  const avatarUrl = hashToGravatar(avatarHash, size);
  return {id, nickname, avatarUrl};
};
