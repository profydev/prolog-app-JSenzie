import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Select } from "./select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = ({
  options,
  icon,
  label,
  hint,
  error,
  onChange,
}) => (
  <div style={{ padding: 10 }}>
    <Select
      icon={icon}
      label={label}
      hint={hint}
      error={error}
      options={options}
      onChange={onChange}
    ></Select>
  </div>
);

export const Default = Template.bind({});
Default.parameters = {
  viewMode: "docs",
};

const testOptions = [
  { value: "", label: "option 1" },
  { value: "option 2", label: "option 2" },
];

Default.args = {
  options: testOptions,
};
