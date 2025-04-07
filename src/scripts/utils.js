export const createEl = (tag, options = {}) => {
  const { parent, ...rest } = options;
  const element = document.createElement(tag);
  if (parent) parent.append(element);
  for (const key in rest) {
    element[key] = rest[key];
  }
  return element;
};
