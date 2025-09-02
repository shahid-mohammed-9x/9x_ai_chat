export const getInitials = (fullName = '') => {
  const names = fullName.split(' ');
  const initials = names
    .map((name) => name.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
  return initials;
};

export const updatePaginationData = (data, appendData) => {
  // Append new data to docs
  const updatedDocs = [appendData, ...data.docs];

  // Update totalDocs
  const totalDocs = data.totalDocs + 1;

  // Calculate totalPages based on limit
  const totalPages = Math.ceil(totalDocs / data.limit);

  // Determine hasNext and hasPrev
  const hasNext = data.currentPage < totalPages;
  const hasPrev = data.currentPage > 1;

  // Return updated data
  return {
    ...data,
    totalDocs,
    totalPages,
    hasNext,
    hasPrev,
    docs: updatedDocs,
  };
};
