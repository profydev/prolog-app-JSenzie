import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Input from "./input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = ({ icon, label, disabled }) => (
  <div style={{ padding: 10 }}>
    <Input icon={icon} label={label} disabled={disabled} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
