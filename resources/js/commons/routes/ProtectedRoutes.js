import PropTypes from "prop-types";
import React from 'react'
import {connect} from "react-redux";
import {Outlet, useLocation} from 'react-router'
import {Route, Routes} from 'react-router-dom'
import PageWrapper from "../../components/admin/page-wrapper";
import AllStudents from "../../components/students/all-students";
import {ModalRoutes} from "./ModalRoutes";
import AllPrograms from "../../components/programs/all-programs";
import AllStaff from "../../components/staff/all-staff";
import AllBatches from "../../components/batches/all-batches";
import Dashboard from "../../components/dashboard";
import AllEnquires from "../../enquiry/all-enquires";
import BatchStudents from "../../components/batches/batch-students";
import AllRegistrations from "../../components/registrations/all-registrations";
import EnquiryDetail from "../../enquiry/details";
import AllFollowUps from "../../components/follow-ups/all-follow-ups";
import MyPrograms from "../../components/students/my-programs/my-programs";
import MyProgramDetail from "../../components/students/my-programs/my-program-detail";
import ExamLayout from "../../components/exam/exam-layout";
import Instructions from "../../components/exam/instructions";
import AppLayout from "../app-layout";
import TakeExam from "../../components/exam/take-exam";

const ProtectedRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <React.Fragment>
            {background && (<React.Fragment><ModalRoutes/> <Outlet/></React.Fragment>)}
            <Routes location={background || location}>
                <Route element={<AppLayout/>}>
                    <Route exact element={<Dashboard/>} path='home'/>
                    <Route exact element={<Dashboard/>} path='/'/>
                    <Route exact element={<Dashboard/>} path='/js/*'/>
                    <Route path='/' element={<PageWrapper/>}>
                        <Route path='enquires' element={<AllEnquires/>}/>
                        <Route exact path="enquires/:name" element={<EnquiryDetail/>}/>
                        <Route exact path="enquires/:name/details" element={<EnquiryDetail/>}/>
                        <Route path='students' element={<AllStudents/>}/>
                        <Route path='registrations' element={<AllRegistrations/>}/>
                        <Route path='follow-ups' element={<AllFollowUps/>}/>
                        <Route path='programs' element={<AllPrograms/>}/>
                        <Route path='staff' element={<AllStaff/>}/>
                        <Route path='batches' element={<AllBatches/>}/>
                        <Route path='my-batches' element={<AllBatches/>}/>
                        <Route path='my-programs' element={<MyPrograms/>}/>
                        <Route path='my-programs/:id/details' element={<MyProgramDetail/>}/>
                        <Route path='batches/students' element={<BatchStudents/>}/>
                    </Route>
                </Route>
                <Route path='take-exams/:name' element={<ExamLayout/>}>
                    <Route index element={<Instructions/>}/>
                </Route>
                <Route path={'take-exams/:name/begin'} element={<TakeExam/>}/>
                <Route exact>
                    <>not found</>
                </Route>
            </Routes>
        </React.Fragment>
    )
}

ProtectedRoutes.propTypes = {
    activeRoles: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})

export default connect(mapStateToProps, null)(ProtectedRoutes)
