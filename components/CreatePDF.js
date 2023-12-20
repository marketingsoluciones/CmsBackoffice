import React from "react";
import { Document, Text, Page, PDFViewer, View, StyleSheet, Svg } from "@react-pdf/renderer";
import { Dividersvg } from "./Icons";

const styles = StyleSheet.create({
    page: {
    },
    text: {
        color: '#228b22',
    },
    title:{
        fontSize: 40,
        marginBottom:20
    },
    layout: {
        marginVertical: 30,
        marginHorizontal: 30,
        display: "flex",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        marginBottom:10
    },
    rowTime: {
        flexDirection: "row",
        paddingRight:10
    }
});

export const MyDocument = ({ IterArryst }) => {

    return (

        <PDFViewer style={{ width: "100%", height: "100%" }}>
            <Document>
                <Page style={styles.page}>
                    <View style={styles.layout}>
                        <View >
                            <Text style={styles.title}>
                            El gran día
                            </Text>
                        </View>
                        {IterArryst?.map((item, idx) => {
                            return (
                                <View style={styles.row} key={idx} >
                                    <View  >

                                    </View>

                                    <View style={styles.rowTime} >
                                        <Text >
                                            {item?.timeH}
                                        </Text>
                                        <Svg>
                                           <svg width="20" height="23" viewBox="0 0 5 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.47047 18.5259C3.01047 18.5259 3.44547 18.7059 3.77547 19.0659C4.13547 19.3959 4.31547 19.8159 4.31547 20.3259C4.31547 20.8359 4.13547 21.2709 3.77547 21.6309C3.44547 21.9609 3.01047 22.1259 2.47047 22.1259C1.96047 22.1259 1.52547 21.9609 1.16547 21.6309C0.835469 21.2709 0.670469 20.8359 0.670469 20.3259C0.670469 19.8159 0.835469 19.3959 1.16547 19.0659C1.52547 18.7059 1.96047 18.5259 2.47047 18.5259ZM2.47047 0.615859C3.01047 0.615859 3.44547 0.795859 3.77547 1.15586C4.13547 1.48586 4.31547 1.90586 4.31547 2.41586C4.31547 2.92586 4.13547 3.36086 3.77547 3.72086C3.44547 4.05086 3.01047 4.21586 2.47047 4.21586C1.96047 4.21586 1.52547 4.05086 1.16547 3.72086C0.835469 3.36086 0.670469 2.92586 0.670469 2.41586C0.670469 1.90586 0.835469 1.48586 1.16547 1.15586C1.52547 0.795859 1.96047 0.615859 2.47047 0.615859Z" fill="#49516F" />
    </svg>
                                        </Svg>
                                        <Text >
                                            {item?.timeM}
                                        </Text>
                                    </View>

                                    <View>
                                    
                                    </View>

                                    <View >
                                        <Text >
                                            {item?.description}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </Page>
            </Document>
        </PDFViewer>


    )
}

