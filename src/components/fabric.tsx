import {
  Checkbox,
  ChoiceGroup,
  Dropdown,
  PrimaryButton,
  Stack,
  IComboBoxOption,
  IChoiceGroupOption,
} from "@fluentui/react";

import type { CheckboxProps } from "@fluentui/react-components";
import React from "react";

const options = [
  { key: "horizontal", text: "Horizontal" },
  { key: "vertical", text: "Vertical" },
];
function Fabric() {
  const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(true);
  return (
    <>
      <Checkbox
        checked={checked as any}
        onChange={(ev, data) => setChecked(data ? true : false)}
        label="Checked"
      />
      <ChoiceGroup options={options} />
      <Stack>
        <Dropdown options={[
             { key: "horizontal", text: "Horizontal" },
             { key: "vertical", text: "Vertical" },
        ]} />
      </Stack>
      <PrimaryButton>Primary Button</PrimaryButton>
    </>
  );
}

export default Fabric;
