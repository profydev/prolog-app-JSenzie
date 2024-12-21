import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox, CheckboxSize, CheckboxState } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = ({
  checkboxSize,
  checkboxState,
  label,
  disabled,
}) => (
  <div style={{ padding: 10 }}>
    <Checkbox
      checkboxState={checkboxState}
      checkboxSize={checkboxSize}
      label={label}
      disabled={disabled}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  checkboxSize: CheckboxSize.sm,
  checkboxState: CheckboxState.unchecked,
  label: "Label",
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
