/* import React from 'react';
import VectorImage from 'src/assets/images/Main_Vector.png';
import Vector1Image from 'src/assets/images/Main_Vector_1.png';
import { styled } from '@mui/material/styles';
import DivCss1285AclImage from 'src/assets/images/Main_div_css_1285acl.png';
import Image101Image from 'src/assets/images/Main_image_101.png';
import Image83Image from 'src/assets/images/Main_image_83.png';
import Image102Image from 'src/assets/images/Main_image_102.png';
import Banquete from 'src/components/Banquete/Banquete';
import Actualidad from 'src/components/Actualidad/Actualidad';
import Fotografos from 'src/components/Fotografos/Fotografos';

const Main1 = styled('div')({
    backgroundColor: `rgba(240, 240, 240, 1)`,
    borderRadius: `0px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    width: '100%',
    height: `1067px`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `8px 8px 391.20001220703125px 8px`,
    boxSizing: `border-box`,
});

const DivWFull = styled('div')({
    borderRadius: `0px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `7px 20px 0px 20px`,
    boxSizing: `border-box`,
    width: `1296px`,
    height: `48px`,
    margin: `0px`,
});

const Heading2EmpresasMarc = styled('div')({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(255, 88, 135, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `600`,
    fontSize: `32px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `37.49760055541992px`,
    textTransform: `capitalize`,
    height: `41px`,
    width: `537px`,
    margin: `0px`,
});

const DivCss1285Acl = styled('div')({
    backgroundImage: `url(${DivCss1285AclImage})`,
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    borderRadius: `12px`,
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px 0px 62px 0px`,
    boxSizing: `border-box`,
    width: `1256px`,
    height: `628px`,
    left: `28px`,
    top: `64px`,
    overflow: `hidden`,
});

const DivCss1Jd1Rtx = styled('div')({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    borderRadius: `12px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `1256px`,
    height: `628px`,
    margin: `0px`,
    overflow: `hidden`,
});

const Group2388 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `983px`,
    height: `401px`,
    left: `127px`,
    top: `114px`,
});

const Group2387 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `983px`,
    height: `401px`,
    left: `0px`,
    top: `0px`,
});

const Group2381 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `881px`,
    height: `60px`,
    left: `51px`,
    top: `0px`,
});

const CoordinaDesdeTuPanelSpan1 = styled('span')({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
});

const CoordinaDesdeTuPanelSpan2 = styled('span')({
    whiteSpace: `pre-wrap`,
    color: `rgba(255, 88, 135, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `700`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
});

const CoordinaDesdeTuPanelSpan3 = styled('span')({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
});

const CoordinaDesdeTuPanel = styled('div')({
    textAlign: `center`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(0, 0, 0, 1)`,
    fontStyle: `normal`,
    fontFamily: 'unset',
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
    width: `881px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
});

const Group2386 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `983px`,
    height: `289px`,
    left: `0px`,
    top: `112px`,
});

const Group2380 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `983px`,
    height: `289px`,
    left: `0px`,
    top: `0px`,
});

const Group2368 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `281px`,
    height: `289px`,
    left: `0px`,
    top: `0px`,
});

const Group2383 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `281px`,
    height: `289px`,
    left: `0px`,
    top: `0px`,
});

const PublicaTusServiciosCSpan1 = styled('span')(({ theme }) => ({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `600`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
}));

const PublicaTusServiciosCSpan2 = styled('span')(({ theme }) => ({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `600`,
    fontSize: `20px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
}));

const PublicaTusServiciosCSpan3 = styled('span')(({ theme }) => ({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `400`,
    fontSize: `14px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `25px`,
    textTransform: `none`,
}));

const PublicaTusServiciosC = styled('div')(({ theme }) => ({
    textAlign: `center`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: 'unset',
    fontWeight: `400`,
    fontSize: `nullpx`,
    letterSpacing: `NaNpx`,
    textDecoration: `none`,
    textTransform: `none`,
    width: `281px`,
    position: `absolute`,
    left: `0px`,
    top: `184px`,
}));

const Image101 = styled('div')({
    backgroundImage: `url(${Image101Image})`,
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    borderRadius: `10px`,
    width: `270px`,
    height: `154px`,
    position: `absolute`,
    left: `5px`,
    top: `0px`,
});

const Group2370 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `281px`,
    height: `288px`,
    left: `702px`,
    top: `0px`,
});

const Group2384 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `281px`,
    height: `288px`,
    left: `0px`,
    top: `0px`,
});

const GestionaTusEventosDeSpan1 = styled('span')(({ theme }) => ({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `600`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
}));

const GestionaTusEventosDeSpan2 = styled('span')(({ theme }) => ({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `400`,
    fontSize: `14px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `25px`,
    textTransform: `none`,
}));

const GestionaTusEventosDe = styled('div')(({ theme }) => ({
    textAlign: `center`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: 'unset',
    fontWeight: `400`,
    fontSize: `nullpx`,
    letterSpacing: `NaNpx`,
    textDecoration: `none`,
    textTransform: `none`,
    width: `281px`,
    position: `absolute`,
    left: `0px`,
    top: `184px`,
}));

const Image83 = styled('div')({
    backgroundImage: `url(${Image83Image})`,
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    borderRadius: `5px`,
    width: `271px`,
    height: `154px`,
    position: `absolute`,
    left: `5px`,
    top: `0px`,
});

const Group2382 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `294px`,
    height: `284px`,
    left: `344px`,
    top: `4px`,
});

const Group2369 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `294px`,
    height: `284px`,
    left: `0px`,
    top: `0px`,
});

const Group2385 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `294px`,
    height: `284px`,
    left: `0px`,
    top: `0px`,
});

const ComunicaciónDirectaVSpan1 = styled('span')(({ theme }) => ({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `600`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
}));

const ComunicaciónDirectaVSpan2 = styled('span')(({ theme }) => ({
    whiteSpace: `pre-wrap`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `400`,
    fontSize: `14px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `25px`,
    textTransform: `none`,
}));

const ComunicaciónDirectaV = styled('div')(({ theme }) => ({
    textAlign: `center`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: 'unset',
    fontWeight: `400`,
    fontSize: `nullpx`,
    letterSpacing: `NaNpx`,
    textDecoration: `none`,
    textTransform: `none`,
    width: `281px`,
    position: `absolute`,
    left: `7px`,
    top: `180px`,
}));

const Image102 = styled('div')({
    backgroundImage: `url(${Image102Image})`,
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    borderRadius: `10px`,
    width: `294px`,
    height: `145px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
});

const Group2379 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `1091px`,
    height: `186px`,
    left: `111px`,
    top: `759px`,
});

const NavegaEnLosMódulosEs = styled('div')(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(255, 88, 135, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `400`,
    fontSize: `24px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
    width: `562px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
}));

const Group2371 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `239px`,
    height: `110px`,
    left: `284px`,
    top: `76px`,
});

const Group2375 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `112px`,
    height: `110px`,
    left: `0px`,
    top: `0px`,
});

const Rectangle1355 = styled('div')(({ theme }) => ({
    backgroundColor: `rgba(248, 248, 248, 1)`,
    borderRadius: `56.045196533203125px`,
    width: `112px`,
    height: `110px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
}));

const Banquete1 = styled(Banquete)(({ theme }) => ({
    width: `45px`,
    height: `45px`,
    position: `absolute`,
    left: `33px`,
    top: `30px`,
}));

const CateringParaBodas = styled('div')(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `500`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
    width: `112px`,
    position: `absolute`,
    left: `127px`,
    top: `25px`,
}));

const Group2372 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `239px`,
    height: `110px`,
    left: `568px`,
    top: `76px`,
});

const Group2376 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `112px`,
    height: `110px`,
    left: `0px`,
    top: `0px`,
});

const Rectangle13551 = styled('div')(({ theme }) => ({
    backgroundColor: `rgba(248, 248, 248, 1)`,
    borderRadius: `56.045196533203125px`,
    width: `112px`,
    height: `110px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
}));

const Actualidad1 = styled(Actualidad)(({ theme }) => ({
    width: `39px`,
    height: `39px`,
    position: `absolute`,
    left: `36px`,
    top: `36px`,
}));

const WeddingPlanner = styled('div')(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `500`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
    width: `112px`,
    position: `absolute`,
    left: `127px`,
    top: `25px`,
}));

const Group2373 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `239px`,
    height: `110px`,
    left: `852px`,
    top: `76px`,
});

const Group2377 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `112px`,
    height: `110px`,
    left: `0px`,
    top: `0px`,
});

const Rectangle13552 = styled('div')(({ theme }) => ({
    backgroundColor: `rgba(248, 248, 248, 1)`,
    borderRadius: `56.045196533203125px`,
    width: `112px`,
    height: `110px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
}));

const Fotografos1 = styled(Fotografos)(({ theme }) => ({
    width: `41px`,
    height: `30px`,
    position: `absolute`,
    left: `36px`,
    top: `40px`,
}));

const Fotógrafos = styled('div')(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `500`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
    width: `112px`,
    position: `absolute`,
    left: `127px`,
    top: `40px`,
}));

const Group2378 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `239px`,
    height: `110px`,
    left: `0px`,
    top: `76px`,
});

const Group2365 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `112px`,
    height: `60px`,
    left: `127px`,
    top: `25px`,
});

const LugaresParaBodas = styled('div')(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(73, 81, 111, 1)`,
    fontStyle: `normal`,
    fontFamily: `Poppins`,
    fontWeight: `500`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    lineHeight: `30px`,
    textTransform: `none`,
    width: `112px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
}));

const Group2374 = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `112px`,
    height: `110px`,
    left: `0px`,
    top: `0px`,
});

const Rectangle13553 = styled('div')(({ theme }) => ({
    backgroundColor: `rgba(248, 248, 248, 1)`,
    borderRadius: `56.045196533203125px`,
    width: `112px`,
    height: `110px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
}));

const Capa1 = styled('div')({
    borderRadius: `0px`,
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `33px`,
    height: `45px`,
    left: `40px`,
    top: `32px`,
    overflow: `hidden`,
});

const Vector = styled('img')({
    height: `45px`,
    width: `33px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
});

const Vector1 = styled('img')({
    height: `17.6px`,
    width: `17.47px`,
    position: `absolute`,
    left: `8px`,
    top: `8px`,
});

 export const Mainet = (props) => {
    return (
        <Main1 className={props.className}>
            
            <DivWFull>
                <Heading2EmpresasMarc>{`Panel de gestión `}</Heading2EmpresasMarc>
            </DivWFull>
            <DivCss1285Acl>
                <DivCss1Jd1Rtx>
                    <Group2388>
                        <Group2387>
                            <Group2381>
                                <CoordinaDesdeTuPanel>
                                    <CoordinaDesdeTuPanelSpan1>{`Coordina desde tu `}</CoordinaDesdeTuPanelSpan1>
                                    <CoordinaDesdeTuPanelSpan2>{`panel de gestión para empresas`}</CoordinaDesdeTuPanelSpan2>
                                    <CoordinaDesdeTuPanelSpan3>{` tus publicaciones en Bodas de Hoy y tus eventos activos.`}</CoordinaDesdeTuPanelSpan3>
                                </CoordinaDesdeTuPanel>
                            </Group2381>
                            <Group2386>
                                <Group2380>
                                    <Group2368>
                                        <Group2383>
                                            <PublicaTusServiciosC>
                                                <PublicaTusServiciosCSpan1>{`Publica tus servicios`}</PublicaTusServiciosCSpan1>
                                                <PublicaTusServiciosCSpan2>{` `}</PublicaTusServiciosCSpan2>
                                                <PublicaTusServiciosCSpan3>{`Crea tu ficha y promociona tus servicios, además de crear artículos colaborativos`}</PublicaTusServiciosCSpan3>
                                            </PublicaTusServiciosC>
                                            <Image101></Image101>
                                        </Group2383>
                                    </Group2368>
                                    <Group2370>
                                        <Group2384>
                                            <GestionaTusEventosDe>
                                                <GestionaTusEventosDeSpan1>{`Gestiona tus eventos`}</GestionaTusEventosDeSpan1>
                                                <GestionaTusEventosDeSpan2>{`de forma simultánea y con la diversidad que necesites. Aforos grandes y pequeños`}</GestionaTusEventosDeSpan2>
                                            </GestionaTusEventosDe>
                                            <Image83></Image83>
                                        </Group2384>
                                    </Group2370>
                                </Group2380>
                                <Group2382>
                                    <Group2369>
                                        <Group2385>
                                            <ComunicaciónDirectaV>
                                                <ComunicaciónDirectaVSpan1>{`Comunicación directa`}</ComunicaciónDirectaVSpan1>
                                                <ComunicaciónDirectaVSpan2>{`vincula tu cronograma con tus eventos y permanece en comunicación con los novios`}</ComunicaciónDirectaVSpan2>
                                            </ComunicaciónDirectaV>
                                            <Image102></Image102>
                                        </Group2385>
                                    </Group2369>
                                </Group2382>
                            </Group2386>
                        </Group2387>
                    </Group2388>
                </DivCss1Jd1Rtx>
            </DivCss1285Acl>
            <Group2379>
                <NavegaEnLosMódulosEs>
                    {`Navega en los módulos especiales`}
                </NavegaEnLosMódulosEs>
                <Group2371>
                    <Group2375>
                        <Rectangle1355></Rectangle1355>
                    </Group2375>
                    <Banquete1 />
                    <CateringParaBodas>{`Catering para bodas`}</CateringParaBodas>
                </Group2371>
                <Group2372>
                    <Group2376>
                        <Rectangle13551></Rectangle13551>
                    </Group2376>
                    <Actualidad1 />
                    <WeddingPlanner>{`Wedding Planner`}</WeddingPlanner>
                </Group2372>
                <Group2373>
                    <Group2377>
                        <Rectangle13552></Rectangle13552>
                        <Fotografos1 />
                    </Group2377>
                    <Fotógrafos>{`Fotógrafos`}</Fotógrafos>
                </Group2373>
                <Group2378>
                    <Group2365>
                        <LugaresParaBodas>{`Lugares para bodas`}</LugaresParaBodas>
                    </Group2365>
                    <Group2374>
                        <Rectangle13553></Rectangle13553>
                        <Capa1>
                            <Vector src={VectorImage} loading="lazy" alt={'Vector'} />
                            <Vector1 src={Vector1Image} loading="lazy" alt={'Vector'} />
                        </Capa1>
                    </Group2374>
                </Group2378>
            </Group2379>
        </Main1>
    );
}

export default Main; */