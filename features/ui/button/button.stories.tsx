import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonSize, ButtonColor } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ size, color, children }) => (
  <div style={{ padding: 10 }}>
    <Button color={color} size={size}>
      {children}
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  children: "Button CTA",
};
Default.parameters = {
  viewMode: "docs",
};
