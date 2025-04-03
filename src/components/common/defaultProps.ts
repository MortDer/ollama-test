export const zInputProps = {
  dense: true,
  flat: true,
  outlined: true,
  bordered: true,
  class: "z-input",
  placeholder: "Введите значение",
};

export const zSelectProps = {
  dark: true,
  outlined: true,
  square: true,
  dense: true,
  menuOffset: [0, 4],
  popupContentClass:
    "z-select-popup reset-library-styles z-2d-main-color-theme",
  class: "z-select",
};
export const zSelectFilteredProps = {
  ...zSelectProps,
  autocomplete: "off",
  useInput: true,
  fillInput: true,
  hideSelected: true,
  emitValue: true,
  mapOptions: true,
  optionLabel: "label",
  optionValue: "value",
};
