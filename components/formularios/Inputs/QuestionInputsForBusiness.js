import { Badge, Box, Checkbox, Divider, Flex, FormLabel, Grid, GridItem, SimpleGrid, Input, List, ListItem, Text, Tooltip } from "@chakra-ui/react";
import { LoadingComponent } from "../../../components/LoadingComponent";
import { FieldArray, useField } from "formik";
import { useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { FetchGraphQL } from "../../../utils/Fetching";
import { useFormikContext } from 'formik'
import { memo } from "react";
import { AuthContextProvider } from "../../../context/AuthContext";
import { TextareaFieldSizable } from "./TextareaFieldSizable";

const queryResults = `query ($id: [inputObjectID]){
  getQuestionsAndCharacteristics(_id: $id){
    characteristics{
      _id
      title
      items{
        _id
        title
      }
    }
    questions{
      _id
      title
    }
  }
}`;

const QuestionInputsForBusiness = memo(({ label, values, setValues, ...props }) => {
  const { development } = AuthContextProvider()
  const [field, meta, helpers] = useField(props);

  //Fetching de lista de subcategorias
  const [catBusiness, isError, isLoading, setQueryTabList] = useFetch();
  //Fetching de questions y characteristics
  const [results, isErrorResults, isLoadingResults, setQueryResults] = useFetch();

  // Al montar el componente traer las subcategorias para listar
  useEffect(() => {
    setQueryTabList({
      ...FetchGraphQL.subCatBusiness.getSubCategoryBusiness,
      variables: { development: development },
      type: "json",
    });
  }, []);

  const compareSelected = (selection = [], options = []) => {
    const r = selection?.filter(select => select === options._id)
    return r
  }

  // Cada vez que cambie la seleccion de categorias solicitar preguntas y caracteristicas
  useEffect(() => {
    if (field?.value?.length >= 0 && ["object", "undefined"].includes(typeof field.value[0])) {
      setQueryResults({
        query: queryResults,
        variables: { id: field.value },
        type: "json",
      });
    }
  }, [field.value]);

  return (
    <Box >
      <FieldArray
        name={props.name}
        render={({ push, remove, form }) => {
          return (
            <Box>
              <Divider />
              <FormLabel py={{ base: "0.2rem", md: "1rem" }} fontWeight={"900"} textAlign={"left"}>
                <Flex gap={"0.3rem"} alignItems={"center"}>
                  {label}
                  {meta.touched && meta.error && (
                    <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
                      {meta.error}
                    </Text>
                  )}
                </Flex>
              </FormLabel>

              <Grid templateColumns={"repeat(3, 1fr)"} gap={{ base: "0.2rem", md: "1rem" }} alignItems={"start"}>
                {!isError &&
                  !isLoading &&
                  catBusiness?.results
                    ?.filter((item) => item && item)
                    ?.map((item) => {
                      return (
                        <Checkbox
                          key={item?._id}
                          size={"sm"}
                          isChecked={values[props?.name]?.filter((el) => el._id === item._id)?.length > 0}
                          textTransform={"capitalize"}
                          onChange={(e) => {
                            const idx =
                              form?.values[props?.name]?.length > 0 &&
                              form.values[props.name].findIndex(
                                (el) => el._id === item._id
                              );
                            e.currentTarget.checked
                              ? push({ _id: item._id })
                              : remove(idx);

                          }}
                          mt={"0.5rem"}
                          alignItems={"start"}
                        >
                          <label className="flex mt-[-1px] leading-[95%]">
                            {item?.title}
                          </label>
                        </Checkbox>
                      );
                    })}
              </Grid>
            </Box>
          );
        }}
      />

      <Flex w={"100%"} flexDir={"column"} py={{ base: "0.2rem", md: "1rem" }}  >
        <Divider />
        <FormLabel py={{ base: "0.2rem", md: "1rem" }} fontWeight={"900"} textAlign={"left"}>
          Preguntas frecuentes
        </FormLabel>
        {!isLoadingResults && !isErrorResults ? (
          <QuestionsComponent data={results?.questions} setValues={setValues} values={values} />
        ) : (
          <LoadingComponent />
        )}
      </Flex>

      <Flex w={"100%"} flexDir={"column"} py={{ base: "0.2rem", md: "1rem" }} >
        <Divider />
        <FormLabel py={{ base: "0.2rem", md: "1rem" }} fontWeight={"900"} textAlign={"left"}>
          Caracteristicas
        </FormLabel>
        {!isLoadingResults && !isErrorResults ? (
          <CharactesticsComponent
            name={"characteristics"}
            data={results?.characteristics}
          />
        ) : (
          <LoadingComponent />
        )}
      </Flex>
    </Box>
  );
})

export default QuestionInputsForBusiness;

const QuestionsComponent = ({ data = [] }) => {

  const { values, setFieldValue } = useFormikContext()

  useEffect(() => {
    if (values.questionsAndAnswers) {
      const mapResult = values.questionsAndAnswers.reduce((acc, item) => {
        acc[item.questions._id] = item.answers
        return acc
      }, {})
      setFieldValue("questionsAndAnswers2", mapResult)
    }
  }, [])


  useEffect(() => {
    if (values.questionsAndAnswers2) {
      const arrCharac = Object?.entries(values?.questionsAndAnswers2 ?? {});
      const reduce = arrCharac?.reduce((acc, item) => {
        acc.push({ questions: { _id: item[0] }, answers: item[1] });
        return acc;
      }, []);
      values && setFieldValue("questionsAndAnswers", reduce);
    }
  }, [values.questionsAndAnswers2]);


  return (
    <>
      {data.length > 0 ? (
        <>
          {data?.map((item) => (
            <TextareaFieldSizable
              key={item._id}
              label={item.title}
              name={`questionsAndAnswers2.${item._id}`}
              question={item._id}
            />
          ))}
        </>
      ) : (
        <Text
          fontSize={"sm"}
          textAlign={"center"}
          color={"gray.400"}
          py={"4rem"}
        >
          Debes seleccionar una categoria que contenga items
        </Text>
      )}
    </>
  );
};

const CharactesticsComponent = ({ data = [] }) => {

  const { values, setFieldValue } = useFormikContext()

  useEffect(() => {
    if (values.characteristics) {
      const mapResult = values.characteristics.reduce((acc, item) => {
        if (item.characteristic._id) {
          acc[item.characteristic._id] = item.items.map((character) => character.title)
        }
        return acc
      }, {})
      setFieldValue("characteristics2", mapResult)
    }
  }, [])

  useEffect(() => {
    if (values.characteristics2) {
      const arrCharac = Object?.entries(values?.characteristics2 ?? {});
      const reduce = arrCharac?.reduce((acc, item) => {
        if (item[1]?.length > 0) {
          acc.push({ characteristic: { _id: item[0] }, items: item[1]?.map((item) => ({ title: item })) });
        }
        return acc;
      }, []);
      values && setFieldValue("characteristics", reduce);
    }
  }, [values.characteristics2]);

  return (
    <Grid templateColumns={"repeat(3, 1fr)"} gap={{ base: "0.2rem", md: "1rem" }}>
      {data?.length > 0 ? (
        <>
          {data
            ?.filter((item) => item && item)
            ?.map((item, idx) => {
              return (
                <GridItem key={idx} colSpan={[3]}>
                  <FieldArrayWithProps
                    key={item?._id}
                    data={item?.items}
                    label={item?.title}
                    name={`characteristics2.${item?._id}`}
                    values={values?.characteristics2 && values?.characteristics2[item._id]}
                  />
                </GridItem>
              );
            })}
        </>
      ) : (
        <GridItem colSpan={[3]}>
          <Text
            fontSize={"sm"}
            textAlign={"center"}
            color={"gray.400"}
            w={"100%"}
            py={"4rem"}
          >
            Debes seleccionar una categoria que contenga items
          </Text>
        </GridItem>
      )}
    </Grid>
  );
};

const FieldArrayWithProps = ({
  data,
  label,
  name,
  values
}) => {
  const [dataArray, setDataArray] = useState(data ?? []);

  useEffect(() => {
    setDataArray(data);
  }, [data]);

  const handleRemove = (values, id) => {
    return values.findIndex((item) => item === id);
  };

  return (
    <div className="w-full">
      <h3 className="text-primary font-medium capitalize *bg-red-500">{label}</h3>
      <FieldArray name={name}>
        {({ remove, push }) => (
          <SimpleGrid columns={"3"} paddingBlock={{ base: "0.2rem", md: "1rem" }} gap={{ base: "0.3rem", md: "1rem" }} >
            {dataArray?.map((item) => (
              <Checkbox
                key={item._id}
                isChecked={values?.includes(item.title)}
                name={item.title}
                size={"sm"}
                textTransform={"capitalize"}
                onChange={(e) =>
                  e.target.checked
                    ? push(item.title)
                    : remove(
                      handleRemove(values, item.title)
                    )
                }
                mt={"0.5rem"}
                alignItems={"start"}
              >
                <label className="flex mt-[-1px] leading-[95%]">
                  {item.title}
                </label>
              </Checkbox>
            ))}
          </SimpleGrid>
        )}
      </FieldArray>
    </div>
  );
};
