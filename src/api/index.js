import database from "./database.json";
import { check_auth, filter_data, apply_pagination } from "./util";

export const checkLogin = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user = database.owners.find(
        (owner) => owner.id === username && owner.password === password
      );
      return user
        ? resolve({ data: { owner_id: user.id } })
        : reject(new Error("Email or password is incorrect"));
    }, 600);
  });
};
export const checkSession = (token_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user = database.owners.find((owner) => owner.id == token_id);
      return user
        ? resolve({ data: { owner_id: user.id } })
        : reject(new Error("Invalid session"));
    }, 600);
  });
};
export const loadCardsData = (filter = {}) => {
  const DEFAULT_PAGE = 1,
    DEFAULT_LIMIT = 10;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let cards = filter_data(database.cards, filter);
      let limit = parseInt(
        filter.limit ? filter.limit.toString() : DEFAULT_LIMIT
      );
      let page = parseInt(filter.page ? filter.page.toString() : DEFAULT_PAGE);
      cards = apply_pagination(cards, page, limit);
      resolve({ data: cards, page, limit });
    }, 1000);
  });
};
export default {
  checkLogin,
  checkSession,
  loadCardsData,
};
