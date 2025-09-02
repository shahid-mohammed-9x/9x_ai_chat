import _ from 'lodash';

export const getInitials = (fullName = '') => {
  const names = fullName.split(' ');
  const initials = names
    .map((name) => name.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
  return initials;
};

export const updatePaginationData = (data, appendData) => {
  const clonedDocs = _.cloneDeep(data?.docs || []); // shallow clone to prevent mutation
  const updatedDocs = [appendData, ...clonedDocs];

  const totalDocs = (data.totalDocs ?? 0) + 1;
  const totalPages = Math.ceil(totalDocs / (data.limit ?? 1));

  const hasNext = (data.currentPage ?? 1) < totalPages;
  const hasPrev = (data.currentPage ?? 1) > 1;

  return {
    ...data,
    totalDocs,
    totalPages,
    hasNext,
    hasPrev,
    docs: updatedDocs,
  };
};
