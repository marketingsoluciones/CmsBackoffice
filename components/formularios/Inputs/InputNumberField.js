import { Box, Divider, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { FormLabelMod } from './FormLabelMod';

export const InputNumberField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField({ ...props });
  const parse = (val) => val.replace(/^\$/, '')
  return (
    <Box >
      <Divider />
      <FormLabelMod >
        {label}
        <Box my={{ base: "0rem", md: "0.3rem" }} >
          <NumberInput variant={"filled"}  {...field} {...props} onChange={(e) => helpers.setValue(parse(e))} value={field.value ?? undefined}  >
            <NumberInputField fontSize={"sm"} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </FormLabelMod>
    </Box>
  )
};


