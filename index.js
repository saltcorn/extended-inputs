const {
  textarea,
  text,
  table,
  th,
  tr,
  td,
  code,
  pre,
  input,
  i,
  button,
  text_attr,
  select,
  script,
  domReady,
  option,
  span,
  nbsp,
  section,
  div,
  a,
} = require("@saltcorn/markup/tags");

const isdef = (x) => (typeof x === "undefined" || x === null ? false : true);

const enhancedSlider = (type) => ({
  type,
  isEdit: true,
  blockDisplay: true,
  handlesTextStyle: true,
  configFields: (field) => [
    ...(!isdef(field.attributes.min)
      ? [{ name: "min", type, required: true }]
      : []),
    ...(!isdef(field.attributes.max)
      ? [{ name: "max", type, required: true }]
      : []),
    { type: "Integer", name: "entry_width", label: "Entry width (px)" },
    {
      type: "String",
      name: "prefix",
      label: "Prefix",
      sublabel: "E.g. currency symbol",
    },
    {
      type: "String",
      name: "postfix",
      label: "Postfix",
      sublabel: "E.g. units or %",
    },
  ],
  run: (nm, v, attrs, cls, required, field) => {
    const id = `input${text_attr(nm)}`;
    const name = text_attr(nm);
    return div(
      { class: "d-flex" },
      div(
        { class: "d-flex align-self-center" },
        attrs.prefix,
        attrs.min.toLocaleString(),
        attrs.postfix
      ),
      input({
        type: "range",
        class: ["d-block w-100", cls, "mx-2"],
        disabled: attrs.disabled,
        readonly: attrs.readonly,
        oninput: `enhsli_range(this, false);`,
        onchange: `enhsli_range(this, true);${attrs.onChange || ""}`,
        ...(isdef(attrs.max) && { max: attrs.max }),
        ...(isdef(attrs.min) && { min: attrs.min }),
        ...(isdef(v) && { value: text_attr(v) }),
      }),
      div(
        { class: "d-flex align-self-center" },
        attrs.prefix,
        attrs.max.toLocaleString(),
        attrs.postfix
      ),
      input({
        style: { width: attrs.entry_width + "px" },
        type: attrs?.type || "number",
        inputmode: attrs?.inputmode,
        pattern: attrs?.pattern,
        autocomplete: attrs?.autocomplete,
        class: ["form-control", cls, "ms-4"],
        disabled: attrs.disabled,
        readonly: attrs.readonly,
        autofocus: attrs.autofocus,
        "data-fieldname": text_attr(field.name),
        name,
        onChange: `enhsli_number(this);${attrs.onChange || ""}`,
        id,
        step: "1",
        required: !!required,
        ...(attrs.max && { max: attrs.max }),
        ...(attrs.min && { min: attrs.min }),
        ...(isdef(v) && { value: text_attr(v) }),
      })
    );
  },
});

module.exports = {
  sc_plugin_api_version: 1,
  plugin_name: "extended-inputs",
  fieldviews: {
    enhanced_slider_integer: enhancedSlider("Integer"),
    enhanced_slider_float: enhancedSlider("Float"),
  },
  headers: [
    {
      script: `/plugins/public/extended-inputs${
        "@" + require("./package.json").version
      }/custom.js`,
    },
  ],
};
