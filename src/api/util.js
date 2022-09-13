export const apply_pagination = (data, page, limit) => {
  return (Array.isArray(data) ? data : []).slice(
    (page - 1) * limit,
    page * limit
  );
};

export const filter_data = (data, filter = {}) => {
  filter = filter || {};
  data = validOrEmptyArray(data);
  data = data.filter((obj) => {
    if (filter.type && obj.type != filter.type) return false;
    if (filter.status && obj.status != filter.status) return false;
    if (filter.owner_id && obj.owner_id != filter.owner_id) return false;
    if (filter.query && obj.name.indexOf(filter.query) == -1) return false;
    return true;
  });
  return data;
};

export const check_auth = (owners, owner_id) => {
  return !!(Array.isArray(owners) ? owners : []).find(
    (owner) => owner.id == owner_id
  );
};

export const validOrEmptyArray = (data) => (Array.isArray(data) ? data : []);
