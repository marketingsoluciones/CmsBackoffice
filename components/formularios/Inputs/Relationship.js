import { Box, Checkbox, Divider, Grid, Flex, Text } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import { useFetch } from "../../../hooks/useFetch";
import { useEffect, memo } from "react";
import { AuthContextProvider } from "../../../context/AuthContext"
import { FormLabelMod } from "./FormLabelMod";

const Relationship = memo(({ label, tabList = {}, ...props }) => {
  const { development } = AuthContextProvider()
  const [field, meta, helpers] = useField(props);
  const [dataTabList, isError, isLoading, setQueryTabList] = useFetch();

  useEffect(() => {
    setQueryTabList({ ...tabList, variables: { development: development }, type: "json" });
  }, []);

  useEffect(() => {
    field?.value?.length > 0 && field?.value[0] instanceof Object && helpers?.setValue(field?.value?.map(item => item?._id))
  }, []);

  return (
    <Box>
      <FieldArray
        name={props.name}
        render={({ push, remove, form }) => {
          return (
            <>
              <Divider />
              <FormLabelMod>
                {label}{" "}
                <Flex gap={"0.3rem"} alignItems={"center"}>
                  {meta.touched && meta.error && (
                    <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
                      {meta.error}
                    </Text>
                  )}
                </Flex>
                <Box my={{ base: "0rem", md: "0.3rem" }} >
                  <Grid templateColumns={"repeat(3, 1fr)"} gap={"1rem"}>
                    {!isError &&
                      !isLoading &&
                      dataTabList?.results
                        ?.filter((item) => item && item)
                        ?.sort((a, b) => a.title.localeCompare(b.title))
                        ?.map((item) => {
                          return (
                            <Checkbox
                              key={item?._id}
                              size={"sm"} variant={""}
                              isChecked={form?.values[props?.name]?.includes(item._id)} textTransform={"capitalize"} onChange={(e) => {
                                const idx = form?.values[props?.name]?.length > 0 && form.values[props.name].findIndex(el => el === item._id)
                                e.currentTarget.checked ? push(item._id) : remove(idx)
                              }}
                              mt={"0.5rem"}
                              alignItems={"start"}
                            >
                              <label className="flex mt-[-1px] leading-[95%]">
                                {item?.title}
                              </label>
                            </Checkbox>
                          )
                        })}
                  </Grid>
                </Box>
              </FormLabelMod>
            </>
          )
        }}
      />

    </Box>
  );
});

export default Relationship;
