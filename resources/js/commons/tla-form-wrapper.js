import React, {useState} from "react";
import {Button, Form, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import {TlaModal} from "./pop-ups/tla-modal";
import PropTypes from "prop-types";
import CloseModal from "./close-modal";
import {TlaError, TlaSuccess} from "../utils/messages";

function TlaFormWrapper(props) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const {
        onSubmit,
        initialValues,
        formTitle,
        children,
        file,
        width,
        customForm,
        submitText,
        resourceId,
        raw,
        afterSubmit
    } = props;

    const submit = (values) => {
        setLoading(true)
        const formData = new FormData();
        values.id !== 0 && formData.append("_method", "PUT");
        file !== null ? formData.append('file', file) : ''

        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                if (values[key] === undefined || values[key] === 'undefined') {
                    formData.append(key, '');
                } else {
                    formData.append(key, values[key]);
                }
            }
        }

        (resourceId ? onSubmit(raw ? values : formData, resourceId) : onSubmit(raw ? values : formData))
            .then((res) => {
                setLoading(false)
                TlaSuccess();
                customForm ? customForm.resetFields() : form.resetFields();
                afterSubmit ? afterSubmit(res.data) : navigate(-1);
            }).catch((error) => {
            setLoading(false)
            TlaError(error.response.data.message)
        });
    };

    return (
        <TlaModal title={formTitle} width={width}>
            <Spin spinning={loading} tip={'Please Wait'}>
                <Form
                    form={customForm ? customForm : form}
                    onFinish={(values) => {
                        submit(values)
                    }}
                    layout="vertical"
                    name="createForm"
                    initialValues={initialValues}>
                    {children}
                    <Form.Item>
                        <div align={"right"} className={'flex gap-x-2 justify-end'}>
                            <CloseModal/>
                            <Button size={"large"}
                                    block
                                    type="primary"
                                    className={'btn-primary'} htmlType="submit">
                                {submitText}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Spin>
        </TlaModal>
    );
}

TlaFormWrapper.defaultProps = {
    file: null,
    resourceId: null,
    customForm: null,
    raw: false,
    width: 520,
    submitText: 'Submit',
    afterSubmit: null
}

TlaFormWrapper.propTypes = {
    initialValues: PropTypes.object,
    submitValues: PropTypes.object,
    formTitle: PropTypes.any,
    onSubmit: PropTypes.func,
    file: PropTypes.any,
    width: PropTypes.any,
    children: PropTypes.any,
    customForm: PropTypes.any,
    submitText: PropTypes.string,
    resourceId: PropTypes.any,
    raw: PropTypes.bool,
    afterSubmit: PropTypes.func
};

export default TlaFormWrapper
