import React from 'react';
import ReactSelect from 'react-select';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { updateObject } from 'src/store/utility';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CRow,
    CCol,
    CInput,
} from '@coreui/react';

import {
    FormControl,
    TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        margin: theme.spacing(0)
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    rightAlign: {
        textAlign: 'right',
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

// \n\nBIOMETRIC PARAMETERS :\nA) Biparietal diameter (BPD)                      8.08 cm               32 weeks and 3 days\nB) Head Circumference (HC)                     29.63 cm              32  weeks and 5 days\nC) Abdominal Circumference(AC)             29.16 cm              33 weeks and 1 day\nD) Femoral length (FL)                              6.35 cm                32 weeks and 6 days

const tvs = "FINDINGS :\n\nWithin  the  fundus   of  the  gravid anteverted uterus   is  a  well  formed  gestational  sac   containing a  single  live   embryo    with  good somatic  and   cardiac  activities.\n\nHeart  rate  is  151  beats  per  minute.\n\nCrown-rump length (CRL) measures about  5.9 cm  equivalent  to  12  weeks and  3  days\n\nThe developing placenta is seen  anteriorly, grade zero maturity, high lying.\nNo subchorionic hemorrhage  is  noted.  \nAdequate amniotic fluid is seen.Both ovaries are obscured by bowel gas echoes.\nNo uterine nor adnexal mass seen.\nThe cervix is unremarkable. No mass lesion seen.\nEDD :   Nov. 27, 2021";
const pelvicHeader = "I FETUS NUMBER                    ONE\nPRESENTATION                      CEPHALIC\nFetal Heart Rate                           137.82 beats per minute";
const pelvicFooter = "\n\nESTIMATED WEIGHT :                         2088 grams  ( 4 lbs 10 oz)\n\nII PLACENTA\nLOCATION : POSTERIOR IN LOCATION, GRADE 2  MATURITY, HIGH LYING\nIII AMNIOTIC FLUID INDEX :    ADEQUATE\n\nAOG by ULTRASOUND                        32 WEEKS  4 DAYS\nEDD :                                                       JULY 09 2021\nGENITALIA                                            Labia majora\nColor Doppler scan shows a single loop of umbilical cord coil in the fetal neck area."
const wAbdomen = "      The  liver  is  normal  in  size with homogeneous parenchymal  echopattern  . No  solid mass nor\ncystic lesion seen in the parenchyma.  Biliary    ducts    are  not  dilated.  Common duct is not dilated which\nmeasures about 0.2  cm without intraluminal echoes.\n      The  gallbladder is physiologically distended with intraluminal diameter of  2.4 cm. No intraluminal\nmass nor lithiasis seen. The wall is not thickened.\n       The pancreas is normal in size and parenchymal echopattern measuring about 1.8  cm (head), 1.5 cm \n(body), and 1.6 cm (tail). No mass nor cystic lesion seen in the parenchyma. No peripancreatic \nlymphadenopathy noted.\nThe spleen is normal in size and parenchymal echopattern with a span of  8.2 cm. No mass nor cystic lesion seen in the parenchyma.\n       Both   kidneys  are  normal  in size with homogeneous  parenchymal    echopattern.  No  evident\nmass lesion  nor   lithiasis . Both pelvocalyceal systems and ureters are not dilated.\nRight  kidney :  9.2 x 3.6 x 3.7 cm with cortical   thickness:1.6 cm\nLeft kidney :     9.5 x 2.8 x 4 cm  with cortical thickness 1.6 cm\n         The urinary bladder is physiologically distended. No intraluminal lithiasis nor mass seen. The wall is not thickened. Pre void volume is 225  ml. Post void volume is 6 ml.\n       No free fluid collection seen in the abdomen.";
const kub = "For Kub";

const impressionWAbdomen = "ULTRASONICALLY NORMAL LIVER,GALLBLADDER,\nPANCREAS, SPLEEN, KIDNEYS AND URINARY BLADDER"

let pelvicFlag = false;
const UltrasoundEditInfo = (props) => {



    const classes = useStyles();

    const remarksOptions = [
        { value: true, label: 'For Recommendation' },
        { value: false, label: 'Normal' }
    ]

    const ultrasoundOptions = [
        { value: "TVS", label: 'Transvaginal' },
        { value: "PELVIC", label: 'Pelvic' },
        { value: "WHOLE ABDOMEN", label: 'Whole Abdomen' },
        { value: "KUB", label: 'KUB' },
    ]

    const handleChange = (opt, prop) => (event) => {
        const updateUltrasoundData = updateObject(props.ultrasoundData, {
            [opt]: updateObject(props.ultrasoundData[opt], {
                [prop]: event.target.value,
            })
        });

        props.setUltrasoundData(updateUltrasoundData);
    };

    const handleRadioChangeType = (opt, prop) => (event) => {


        let xrTemp = '';
        let findingHeaderPelvic= '';
        let findingFooterPelvic= '';
        let xrayImpression = '';
        if (prop === 'ultrasoundType') {

            if (event !== null) {
                // if (event.value === 'TVS') xrTemp = tvs;
                if (event.value === 'PELVIC') {
                    // findingHeaderPelvic = pelvicHeader;
                    // findingFooterPelvic = pelvicFooter;
                    pelvicFlag = true;
                } else {
                    pelvicFlag = false;
                }


                if (event.value === 'WHOLE ABDOMEN') {
                    // xrTemp = wAbdomen;
                    // xrayImpression = impressionWAbdomen
                }

                // if (event.value === 'KUB') xrTemp = kub;

            }
        }


        const updateUltrasoundData = updateObject(props.ultrasoundData, {
            [opt]: updateObject(props.ultrasoundData[opt], {
                [prop]: event,
                findings: xrTemp,
                impressions: xrayImpression,
                finding_header_pelvic: findingHeaderPelvic,
                finding_footer_pelvic: findingFooterPelvic,
            })
        });

        props.setUltrasoundData(updateUltrasoundData);
    }

    const handleRadioChange = (opt, prop) => (event) => {
        const updateUltrasoundData = updateObject(props.ultrasoundData, {
            [opt]: updateObject(props.ultrasoundData[opt], {
                [prop]: event,
            })
        });

        props.setUltrasoundData(updateUltrasoundData);
    }

    const handleSelectChange = (opt, prop) => (event) => {
        const updateUltrasoundData = updateObject(props.ultrasoundData, {
            [opt]: updateObject(props.ultrasoundData[opt], {
                [prop]: event,
            })
        });
        props.setUltrasoundData(updateUltrasoundData);
    }

    // const [collapse, setCollapse] = useState(false);

    // const toggle = (e) => {
    //     setCollapse(!collapse);
    //     e.preventDefault();
    // }


    return (
        <div>
            <CRow className="m-0 p-0">
                <CCol className="m-0 p-0">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Imaging Personnel</span>
                        </CCardHeader>

                        <CCardBody>
                            <FormControl className={clsx(classes.margin, "col-5 m-0 p-0 mr-1")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Radiologist</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.ultrasoundData.ultrasound.radiologist}
                                    onChange={handleRadioChange('ultrasound', 'radiologist')}
                                    isClearable={true}
                                    isSearchable={false}
                                    isLoading={false}
                                    options={props.doctorSelect}
                                    menuPlacement="bottom"
                                />
                            </FormControl>

                            <FormControl className={clsx(classes.margin, "col-3 m-0 p-0 mr-1")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Ultrasound Type</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    onChange={handleRadioChangeType('ultrasound', 'ultrasoundType')}
                                    isClearable={true}
                                    isSearchable={false}
                                    isLoading={false}
                                    options={ultrasoundOptions}
                                    menuPlacement="bottom"
                                />
                            </FormControl>

                            <FormControl className={clsx(classes.margin, "col-3  m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Remarks</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.ultrasoundData.ultrasound.remarks}
                                    onChange={handleSelectChange('ultrasound', 'remarks')}
                                    isClearable={true}
                                    isSearchable={false}
                                    isLoading={false}
                                    options={remarksOptions}
                                />
                            </FormControl>

                        </CCardBody>
                    </CCard>
                </CCol>

            </CRow>
            <CRow className="m-0 p-0">
                <CCol className="m-0 p-0">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Ultrasound Results</span>
                        </CCardHeader>

                        <CCardBody>
                            {
                                pelvicFlag ?
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                                        <TextField
                                            name="findings"
                                            label="Findings Header"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            value={props.ultrasoundData.ultrasound.finding_header_pelvic}
                                            onChange={handleChange('ultrasound', 'finding_header_pelvic')}
                                        />
                                    </FormControl>
                                    :
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                                        <TextField
                                            name="findings"
                                            label="Findings"
                                            multiline
                                            rows={16}
                                            variant="outlined"
                                            value={props.ultrasoundData.ultrasound.findings}
                                            onChange={handleChange('ultrasound', 'findings')}
                                        />
                                    </FormControl>
                            }

                            {
                                pelvicFlag ?
                                    <>
                                        {/* <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Fetus 1</h6>
                                        </CCardHeader> */}
                                        <CRow>
                                            <CCol md="4" className="p-1">
                                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> Biparietal diameter (BPD) Size</CLabel>
                                                    <CInput
                                                        value={props.ultrasoundData.ultrasound.bpd_size}
                                                        onChange={handleChange('ultrasound', 'bpd_size')
                                                        }
                                                    />
                                                </FormControl>
                                            </CCol>
                                            <CCol md="1" className="p-2">
                                                <p>
                                                </p>cm</CCol>
                                            <CCol md="5" className="p-1">
                                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> Biparietal diameter (BPD) Age</CLabel>
                                                    <CInput
                                                        value={props.ultrasoundData.ultrasound.bpd_old}
                                                        onChange={handleChange('ultrasound', 'bpd_old')
                                                        }
                                                    />
                                                </FormControl>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md="4" className="p-1">
                                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> Head Circumference (HC) Size</CLabel>
                                                    <CInput
                                                        value={props.ultrasoundData.ultrasound.hc_size}
                                                        onChange={handleChange('ultrasound', 'hc_size')
                                                        }
                                                    />
                                                </FormControl>
                                            </CCol>
                                            <CCol md="1" className="p-2">
                                                <p>
                                                </p>cm</CCol>
                                            <CCol md="5" className="p-1">
                                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> Head Circumference (HC) Age</CLabel>
                                                    <CInput
                                                        value={props.ultrasoundData.ultrasound.hc_old}
                                                        onChange={handleChange('ultrasound', 'hc_old')
                                                        }
                                                    />
                                                </FormControl>
                                            </CCol>
                                        </CRow>

                                        <CRow>
                                            <CCol md="4" className="p-1">
                                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> Abdominal Circumference(AC) Size</CLabel>
                                                    <CInput
                                                        value={props.ultrasoundData.ultrasound.ac_size}
                                                        onChange={handleChange('ultrasound', 'ac_size')
                                                        }
                                                    />
                                                </FormControl>
                                            </CCol>
                                            <CCol md="1" className="p-2">
                                                <p>
                                                </p>cm</CCol>
                                            <CCol md="5" className="p-1">
                                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> Abdominal Circumference(AC) Age</CLabel>
                                                    <CInput
                                                        value={props.ultrasoundData.ultrasound.ac_old}
                                                        onChange={handleChange('ultrasound', 'ac_old')
                                                        }
                                                    />
                                                </FormControl>
                                            </CCol>
                                        </CRow>

                                        <CRow>
                                            <CCol md="4" className="p-1">
                                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> Femoral length (FL) Size</CLabel>
                                                    <CInput
                                                        value={props.ultrasoundData.ultrasound.fl_size}
                                                        onChange={handleChange('ultrasound', 'fl_size')
                                                        }
                                                    />
                                                </FormControl>
                                            </CCol>
                                            <CCol md="1" className="p-2">
                                                <p>
                                                </p>cm</CCol>
                                            <CCol md="5" className="p-1">
                                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> Femoral length (FL) Age</CLabel>
                                                    <CInput
                                                        value={props.ultrasoundData.ultrasound.fl_old}
                                                        onChange={handleChange('ultrasound', 'fl_old')
                                                        }
                                                    />
                                                </FormControl>
                                            </CCol>
                                        </CRow>
                                    </>
                                    : null
                            }
                            <br></br>
                            {
                                pelvicFlag ?
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                                        <TextField
                                            name="findings"
                                            label="Findings Footer"
                                            multiline
                                            rows={12}
                                            variant="outlined"
                                            value={props.ultrasoundData.ultrasound.finding_footer_pelvic}
                                            onChange={handleChange('ultrasound', 'finding_footer_pelvic')}
                                        />
                                    </FormControl>
                                    : null
                            }
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                                <TextField
                                    name="impressions"
                                    label="Impression"
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    value={props.ultrasoundData.ultrasound.impressions}
                                    onChange={handleChange('ultrasound', 'impressions')}
                                />
                            </FormControl>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
           
        </div>
    )
}

export default UltrasoundEditInfo;