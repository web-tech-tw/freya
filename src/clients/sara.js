import ky from "ky";

const {
  VITE_SARA_RECV_HOST: baseUrl,
} = import.meta.env;

export const useClient = () => {
  return ky.create({
    prefixUrl: baseUrl,
  });
};

const hashToGravatar = (hash, size=20) => {
  return `https://api.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
};

export const getUserProfile = async (client, id, size=20) => {
  const user = await client.get(`users/${id}`).json();
  const {nickname, avatar_hash: avatarHash} = user.profile;
  const avatarUrl = hashToGravatar(avatarHash, size);
  return {id, nickname, avatarUrl};
};
