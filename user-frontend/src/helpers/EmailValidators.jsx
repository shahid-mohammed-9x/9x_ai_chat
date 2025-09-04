// simple reusable validator function
const validateEmail = (value) => {
  if (!value.includes('@')) {
    return 'Email must contain @';
  }

  const parts = value.split('@');
  if (parts.length !== 2 || !parts[0]) {
    return 'Email must have text before and after @';
  }

  const domain = parts[1].toLowerCase();

  if (!domain.endsWith('.com') && !domain.endsWith('.in')) {
    return 'Email must end with .com or .in';
  }

  if (domain.startsWith('.')) {
    return 'Domain cannot start with a dot';
  }

  return ''; // ✅ no error
};
export default validateEmail;
