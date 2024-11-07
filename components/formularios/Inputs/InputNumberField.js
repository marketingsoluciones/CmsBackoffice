import { Box, Divider, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { FormLabelMod } from './FormLabelMod';
import { LuAlertCircle } from 'react-icons/lu';
import { useToast } from '../../../hooks/useToast';

export const InputNumberField = ({ label, availableInput, ...props }) => {
  const [field, meta, helpers] = useField({ ...props });
  const parse = (val) => val.replace(/^\$/, '')
  const toast = useToast();

  return (
    <Box >
      <Divider />
      <FormLabelMod >
        <div className="flex  items-center space-x-1">
          <label> {label}</label>
          <label onClick={() => toast("error", "Este campo no esta disponible en tu plan")} className='cursor-pointer'> {!availableInput && <LuAlertCircle />}</label>
        </div>
        <Box my={{ base: "0rem", md: "0.3rem" }} >
          <NumberInput disabled={!availableInput} variant={"filled"}  {...field} {...props} onChange={(e) => helpers.setValue(parse(e))} value={field.value ?? undefined}  >
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


