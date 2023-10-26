import {Button, Form, Spin, Steps} from 'antd'
import dayjs from "dayjs";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useLocation, useNavigate} from "react-router-dom";
import PersonalInfo from "./personal-info";
import ContactInfo from "./contact-info";
import Logo from '../assets/img/logo.png'
import Programs from "./programs";
import Sponsor from "./sponsor";
import ConfirmInfo from "./confirm-info";
import {handleGetEnquiryBranches, handleSubmitEnquiry} from "../actions/enquiry/EnquiryAction";


const steps = [
    {
        title: 'Personal Information',
        // content: <Programs/>,
        content: <PersonalInfo/>,
    },
    {
        title: 'Contact Information',
        content: <ContactInfo/>,
    },
    {
        title: 'Which courses are you interested in?',
        content: <Programs/>,
    },
    {
        title: 'Other Information',
        content: <Sponsor/>,
    },
];

const inputFields = [
    'first_name',
    'last_name',
    'id_type',
    'id_number',
    'phone_number',
    'email'
]

function Enquiry({submitEnquiry, getBranches}) {
    const [loading, setLoading] = useState(true)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [current, setCurrent] = useState(0);
    let [formValues, setFormValues] = useState({})
    const [form] = Form.useForm();
    const navigate = useNavigate()

    useEffect(() => {
        getBranches().then(() => setLoading(false))
    }, []);

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const {state} = useLocation()

    const initialValues = {
        id: 0,
        gender: "",
        education_qualifications: [],
        ...state?.data,
        dob: state?.data?.dob ? dayjs(state?.data.dob) : null
    }

    const submit = (values) => {
        form.validateFields(inputFields).then(() => {
            setFormValues((prev) => ({...prev, ...values}))
            if (current < steps.length - 1) {
                setCurrent(current + 1)
            } else {
                setOpenConfirm(true)
            }
        }).catch(() => {
        });
    }

    return (
        <div>
            <ConfirmInfo
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                setOpen={() => {
                    setOpenConfirm(false)
                    setSubmitting(true)
                    submitEnquiry(formValues).then(() => {
                        setSubmitting(false)
                        navigate('submitted', {
                            state: {
                                firstName: formValues.first_name
                            }
                        })
                    }).catch(() => setSubmitting(false))
                }}/>
            <Spin spinning={submitting || loading}>
                <div className={'flex flex-col md:flex-row items-center justify-center'}>
                    <div
                        className={'w-full md:w-2/6 bg-gray-200 chat-list h-fit md:h-screen flex flex-col items-between justify-center pt-5 enquiry-side'}>
                        <div className={'flex justify-center flex-col items-center'}>
                            <img height={'auto'} width={100} src={Logo} alt="IPMC"/>
                            <h3 className={'text-4xl mb-2 md:mb-5 mt-5 md:mt-10 font-bold'}>Enquiry Form</h3>
                            <div className={'mt:2 md:mt-8'}>
                                <div className={'hidden md:block'}>
                                    <Steps direction={'vertical'} current={current} items={items}/>
                                </div>
                                <div className={'block md:hidden mobile-steps'}>
                                    <Steps direction={'horizontal'} current={current} items={items}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'w-full md:w-4/6 chat-content h-[calc(100vh-230px)] md:h-[calc(100vh-10px)]'}>
                        <div className={'flex items-center h-fit overflow-hidden md:h-screen'}>
                            <Form onFinish={submit} form={form} layout={'vertical'} initialValues={initialValues}>
                                <React.Fragment>
                                    <h3 className={'text-lg md:text-3xl font-bold mb-3 text-red-600'}>{steps[current].title}</h3>
                                    {steps[current].content}
                                </React.Fragment>
                                <div>
                                    {current < steps.length - 1 && (
                                        <Button htmlType={'submit'} size={'large'}>Next</Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Button htmlType={'submit'} size={'large'}>
                                            Submit
                                        </Button>
                                    )}
                                    {current > 0 && (
                                        <Button
                                            size={'large'} style={{margin: '0 8px'}}
                                            onClick={() => prev()}>
                                            Previous
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

Enquiry.propTypes = {
    submitEnquiry: PropTypes.func.isRequired,
    getBranches: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    submitEnquiry: (payload) => dispatch(handleSubmitEnquiry(payload)),
    getBranches: () => dispatch(handleGetEnquiryBranches()),
})

export default connect(null, mapDispatchToProps)(Enquiry)
