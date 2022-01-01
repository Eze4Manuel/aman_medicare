import React, { useEffect, useState } from 'react';
import './register.scss';
import { Select } from 'antd';
import Structure from "../../components/layout/index";
import logom from '../../assets/images/icon/logom.png'; // Tell webpack this JS file uses this image
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { useNotifications } from '@mantine/notifications';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/Helpers';
import Loader from "react-loader-spinner";
import ErrorMessage from '../../components/error/ErrorMessage';
import { Form, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { useNavigate, useLocation } from "react-router-dom"
import { Modal } from 'antd';
import lib from '../lib';
import formValidator from '../formvalidation';

const Register = (props) => {
    const [form] = Form.useForm();
    const [,] = useState('hidden');
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [values, setValues] = React.useState({});
    const { set, } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = React.useState(false);
    const { Option } = Select;
    const notify = useNotifications();
    const [, setData] = useState();
    const [basePrice, ] = useState(state?.price);
    const [familyPrice, ] = useState(state?.sixPrice);
    const [price, setPrice] = useState('');
    const [addedHeads, setAddedHeads] = useState(0);
    const [premiumType, setPremiumType] = useState('Individual');
    const [socialwarn, setSocialWarn] = useState('');
    const [validSocial, setValidSocial] = useState(true);


    const showModal = () => {
        setIsModalVisible(true);
    };
    useEffect(() => {
        if (!state) {
            navigate('/pricing');
        }
    })

    const numberWithCommas = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    const handleOk = async () => {
        console.log(validSocial);
        if (validSocial === false) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: "Invalid Assocaition Code" })
            return
        }
        values.premium_type = premiumType
        if (premiumType === 'family') {
            values.additional_heads = 6 + parseInt(addedHeads) - 1
            values.enrolee_size = 6 + parseInt(addedHeads)
        } else {
            values.additional_heads = parseInt(addedHeads)
            values.enrolee_size = parseInt(addedHeads) + 1
        }



        let builder = formValidator.validateAccountRegistration(values, {}, setError)
        if (!builder) {
            setIsModalVisible(false);
            return
        }

        setLoading(true);
        setIsModalVisible(false);
        builder.insurance_package = state.option;
        builder.policy_cost = state.price;

        console.log(builder);

        let reqData = await lib.register(builder)

        if (reqData.status === 'error') {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData.data?.error === 0) {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.data.message })
            helpers.loadUserInStore(reqData?.data)
            set(reqData?.data)
            setTimeout(() => { navigate('/predashboard'); }, 2000)
            setData((reqData.data));
        }
        setLoading(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handlePremium = (e) => {
        if (e === 'family') {
            setPrice(state?.sixPrice);
        }
        else {
            setPrice(state?.price)
        }
        setAddedHeads(0)
        setPremiumType(e)
    }

    const handleDependent = (e) => {
        setAddedHeads(e)

        if (premiumType === 'individual') {
            setPrice(basePrice + (basePrice * e))
        } else {
            setPrice(familyPrice + (basePrice * e))

        }
    }

    const handleFocusOut = async (e) => {
        let obj = {
            social_no: values.social_no
        }
        let reqData = await lib.validatSocial(obj)

        if (reqData.status === 'error') {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: "Invalid Social Number" })
            setSocialWarn("Invalid Social Number");
            setValidSocial(false)
        }
        if (reqData?.error === 0) {
            // helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.data.message })
            setValidSocial(true);
            setSocialWarn('');
        }
        console.log(reqData);
    }

    return (
        <Structure className="users-post-profile" >
            <div style={{ width: "90%", margin: "auto" }}>
                <div>
                    <div className="profile-image" style={{ backgroundImage: `url(${logom})` }}></div>
                </div>
                <div className="profile-top" >
                    <div style={{textAlign: "center"}}>
                        <PageHeaderComp title="Create An Account" />

                    </div>
                    <div className='profile-form' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h3>Selected Plan:<b> {state?.option}</b></h3>
                        {price.length !== 0 ? <h3>Price:<b> N{numberWithCommas(price)}</b></h3> : null}
                        <br />
                        <Form form={form} layout="vertical">
                            <div className="">
                                <div className='form-group'>
                                    <Form.Item label="Premium Type" required tooltip="Select premium type">
                                        <Select defaultValue="Select premium type" onChange={e => handlePremium(e)} value={values?.premium_type} style={{ width: "250px", marginRight: "10px" }}>
                                            <Option value="individual">Indivual</Option>
                                            <Option value="family">Family</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Category" required tooltip="Select a category">
                                        <Select defaultValue="Select Category" onChange={e => setValues(d => ({ ...d, category: e }))} value={values?.category} style={{ width: "250px", marginRight: "10px" }}>
                                            <Option value="self pay">Self Pay</Option>
                                            <Option value="corporate">Corporate</Option>
                                        </Select>
                                    </Form.Item>
                                    {(values.category === 'corporate') ?
                                        <Form.Item label="Association Code" required tooltip="Enter your Association code">
                                            <Input onBlur={handleFocusOut} onChange={e => setValues(d => ({ ...d, social_no: e.target.value }))} autoFocus value={values?.social_no} placeholder="23SWIWQQ" style={{ width: "250px", marginRight: "10px" }} />
                                            <p style={{ color: "red", fontSize: "12px" }}>{socialwarn}</p>

                                        </Form.Item>
                                        : null}
                                </div>
                                <div className='form-group'>
                                    <Form.Item label="Full Name" required tooltip="Enter your Full name">
                                        <Input onChange={e => setValues(d => ({ ...d, name: e.target.value }))} autoFocus value={values?.name} placeholder="Musa Umar" style={{ width: "250px", marginRight: "10px" }} />
                                    </Form.Item>
                                    <Form.Item label="Add additional dependents" required tooltip="Input number of dependents">
                                        <Select defaultValue="0" style={{ width: "250px", marginRight: "10px" }} onChange={e => handleDependent(e)} value={addedHeads}  >
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                            <Option value="2">2</Option>
                                            <Option value="3">3</Option>
                                            <Option value="4">4</Option>
                                            <Option value="5">5</Option>
                                            <Option value="6">6</Option>
                                            <Option value="7">7</Option>
                                            <Option value="8">8</Option>
                                            <Option value="9">9</Option>
                                            <Option value="10">10</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='form-group'>
                                    <Form.Item label="Email" required tooltip={{ title: 'Enter your email address', icon: <InfoCircleOutlined /> }}>
                                        <Input type="email" onChange={e => setValues(d => ({ ...d, email: e.target.value }))} value={values?.email} placeholder="example@gmail.com" style={{ width: "250px", marginRight: "10px" }} />
                                    </Form.Item>
                                    <Form.Item label="Confirm Email" required tooltip={{ title: 'Confirm your email address', icon: <InfoCircleOutlined /> }}>
                                        <Input type="email" onChange={e => setValues(d => ({ ...d, confirm_email: e.target.value }))} value={values?.confirm_email} placeholder="example@gmail.com" style={{ width: "250px", marginRight: "10px" }} />
                                    </Form.Item>
                                </div>
                                <div className='form-group'>
                                    <Form.Item label="Phone Number" required tooltip={{ title: 'Enter your phone number', icon: <InfoCircleOutlined /> }}>
                                        <Input onChange={e => setValues(d => ({ ...d, phone: e.target.value }))} value={values?.phone} placeholder="0801 234 5678" style={{ width: "250px", marginRight: "10px" }} />
                                    </Form.Item>
                                    <Form.Item label="Confirm Phone Number" required tooltip={{ title: 'Confirm your phone number', icon: <InfoCircleOutlined /> }}>
                                        <Input onChange={e => setValues(d => ({ ...d, confirm_phone: e.target.value }))} value={values?.confirm_phone} placeholder="0801 234 5678" style={{ width: "250px", marginRight: "10px" }} />
                                    </Form.Item>
                                </div>
                                <div className='form-group'>
                                    <Form.Item label="Password" required tooltip="Password should be more than six characters">
                                        <Input onChange={e => setValues(d => ({ ...d, password: e.target.value }))} value={values?.password} type='password' placeholder="*********" style={{ width: "250px", marginRight: "10px" }} />
                                    </Form.Item>
                                    <Form.Item label="Confirm Password" required tooltip="Password should be more than six characters">
                                        <Input onChange={e => setValues(d => ({ ...d, confirm_password: e.target.value }))} value={values?.confirm_password} type='password' placeholder="*********" style={{ width: "250px", marginRight: "10px" }} />
                                    </Form.Item>
                                </div>
                            </div>
                            {error ? <ErrorMessage message={error} /> : null}
                            <div className="profile-button" >
                                <Form.Item>
                                    <div className='disney_button'>
                                        <ButtonComponent text="Submit" onClick={showModal} />
                                        <Loader type="Oval" color="#00BFFF" height={30} visible={loading} width={30} style={{ margin: "10px" }} />
                                    </div>
                                </Form.Item>
                            </div>
                            <ModalContent isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                        </Form>
                    </div>

                </div>
            </div>
        </Structure>
    )
}

export default Register;

const ModalContent = (props) => {

    return (
        <Modal width={800}
            style={{ top: 20 }}
            title="Aman Medicare Terms and Conditions" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
            <div className='terms' style={{ height: "500px", overflow: "scroll" }}>
                <div>
                    <h3>Section I - General Provisions</h3>
                    <div>
                        <h4>Policyholder, membership, insurable persons and insurance eligibility</h4>
                        <ul>
                            <li>By subscribing to any of Aman Medicare plans, policyholders automatically consent to become members of Aman Medicare association.</li>
                            <li>Only members who have fully paid up their contributions shall be entitled to health cover.</li>
                            <li>The policyholder is the natural or legal person who has subscribed to any of Aman Medicare’s health plans. The insured persons are the policyholders and their dependents. Newborn infants of insured persons shall be included in the policy after birth, on the same plan as their parents. This is subject to the following conditions:

                                <ul>
                                    <li>they are insured with Aman Medicare within 2 months of the day of birth with retrospective effect, and</li>
                                    <li>the insurance contract was concluded at least 3 months earlier without interruption and</li>
                                    <li>no other insurance cover exists.</li>
                                </ul>
                            </li>
                            <li>The following persons are not eligible and will not be insured, even if payment of contributions is made:
                                <p>Persons permanently in need of care as well as persons whose participation in everyday life is permanently exclud- ed. The mental condition and objective living conditions in particular of said persons shall be taken into account as regards classification. Persons in need of care are those persons who largely require external assistance to complete everyday tasks;</p>
                            </li>
                            <li>The insurance contract cannot be signed for persons who do not fulfill the requirements of Clauses 1.1 and 1.2, even if the premium is paid. If, however, the premium is paid for these persons, a refund is available to the person paying the premium.</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Taking out insurance, commencement, duration and termination of the policy and insurance cover</h4>
                        <div>
                            <p>Enrollment and commencement of the policy</p>
                            <ul>
                                <li>Insurance plans can be purchased at any time.</li>
                                <li>The insurance contract is concluded when Aman Medicare has received the correctly completed application form (either electronically or physically) for this and has sent you confirmation of insurance. The application is only considered correctly completed when it contains all the requested information in an unambiguous and complete form.</li>
                                <li>If clauses 2.1.1 or 2.1.2 are not met, the insurance contract is not valid even if the premium is paid. In this case, the person paying the premium is entitled to a refund.</li>
                            </ul>
                        </div>
                        <div>
                            <p>Commencement of Insurance Cover</p>
                            <ul>
                                <li>Waiting Period: means the period of time commencing on the date of commencement of the plans during which an enrollee is required to wait to be entitled to access care under plans. The length of this period is 14 days. Therefore, a cover purchased becomes active 14 days after the completion of registration.</li>
                            </ul>
                        </div>
                        <div>
                            <p>Duration</p>
                            <ul>
                                <li>All plans are quoted for a period of one year, and can be renewed annually.</li>
                            </ul>
                        </div>
                        <div>
                            <p>Termination</p>
                            <ul>
                                <p>The statutory provisions concerning the right to termination for cause remain unaffected by these agreements. The insurance cover ends upon termination of the insurance contract. The insurance contract also ends for insured events not yet concluded or pending.</p>
                                <li>at the agreed time;</li>
                                <li>with the death of the policyholder; the insured persons may extend the insurance policy within 2 months of the policy- holder’s death by nominating a future policyholder;</li>
                                <li>if the eligibility criteria are no longer met;</li>
                                <li>Aman Medicare is at liberty to cancel the cover of any insured member(s) who has/have misled it or breached any term of this agreement, giving incorrect, incomplete or misleading information, failed to provide any reasonable information which Aman Medicare requested, conspired with a third party to obtain undue benefit from this policy, or submitted a claim in which is clearly fraudulent or unfounded. In any of these circumstances, Aman Medicare has the right to cancel the insured members cover from the date of commencement (without refund of any portion of unused premium) and recover from him/her any benefit it might have paid as a result of such claim.</li>
                                <li>Enrollees making annual payments can cancel their policy within the first 30 days of the commencement of the policy. An enrollee that decides to cancel or terminate his policy/cover must notify Aman Medicare in writing, and the enrollee shall be entitled to a refund of contribution paid less (a) any amounts incurred on their behalf as medical and other expenses. (b). An administrative (Wakala fee) of 25% of the contribution paid. No refund shall apply in the case of termination/cancellation made by enrollee after 30 days of the commencement of policy.</li>
                                <li>In the rare circumstance where Aman Medicare has to terminate the policy, it shall notify the enrollee in writing to their last known address or electronically via the last known email address. In such an event, Aman Medicare will refund to the enrollee an amount equal to pro-rata value of their unused premium. </li>
                            </ul>
                        </div>
                        <div>
                            <p>Insurance Year</p>
                            <ul>
                                <li>An insurance year is considered to be a period of 12 months. The first insurance year commences on the date the insurance policy begins. If a benefit which is limited per insurance year is claimed in an insurance year, insurance cover for this benefit once the benefit limit is reached is restored only after this insurance year elapses. If a benefit is limited per insurance year, insurance cover for this benefit continues until the benefit limit is reached, even if the contract duration is less than 12 months.</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4>Scope of the Insurance Cover</h4>
                        <ul>
                            <li>The insurance cover applies only to healthcare providers within Nigeria.</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Premium amount</h4>
                        <p>The premium for an insured person is shown by the premium overview.</p>
                        <p><b>Payment of the first or one-off premium</b></p>
                        <ul>
                            <li>The first or one-time premium is due at the start of the contract.</li>
                            <li>In addition, Aman Medicare will be entitled to terminate the contract so long as the premium remains unpaid. This does not apply if the reason for non-payment is beyond your control.</li>

                        </ul>
                    </div>

                    <div>
                        <h4>Payment of subsequent premiums</h4>
                        <ul>
                            <li>If the subsequent premium is not paid on time, Aman Medicare will send you a reminder and will set a time limit of 2 weeks.</li>
                            <li>If you have still not made the payment when this deadline expires, Aman Medicare is entitled to terminate the contract, if it has drawn your attention to this when the reminder was sent.</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Collection of premiums</h4>
                        <p>If you have agreed to the premium being collected from your account by direct debit, this will take place as soon as the mandate has been set up. The payment is considered to have been made in a timely manner if Aman Medicare can collect the premium on the due  date, and you do not dispute collection of the correct payment.
                            If Aman Medicare is unable to collect the premium due for a reason beyond your control, the payment shall still be considered to be on time if payment is made immediately upon receipt of the written reminder from Aman Medicare.

                            Premiums are due annually and the full annual premium is established at the start of annual cover or a renewal period thereof.
                        </p>
                    </div>
                    <div>
                        <h4>Refunds</h4>
                        <p>Enrollees are required to access medically necessary care within Aman Medicare's network of Providers alone and not pay out of pocket for covered services. In the odd event that an enrollee has to pay out of pocket, this only has to be in an emergency situation as qualified by a medical practitioner without influence of the enrollee and only within Aman. The refund will be made by Aman Medicare upon the enrollee providing the following documents within 30 days of encounter: (1) copy of medical report from the Health care practitioner indicating history of the medical condition, diagnosis and treatment administered, (2) Original Receipt for having made payment indicating the costs separately for consultation, each investigation, each procedure and each Drug and the quantity dispensed.
                            All refunds will be made only into the enrollees designated account based only on medical  necessity  as  might  be  reviewed  by  Aman Medicare's  in-house  medical practitioners and only at Aman Medicare's designated/customary rate irrespective of the cost of care. Also, refunds are only applicable where the same is received before receipt by Aman Medicare of the notice to terminate or expiration of a plan.
                        </p>
                    </div>
                    <div>
                        <h4>Categorization of Healthcare Facilities</h4>
                        <p>Healthcare Providers are categorized by Aman Medicare for the benefit of ease of access to care by its Enrollees. Aman Medicare reserves the right to review this categorization from time to time without prior recourse to an Enrollee. This could include (but not limited to) the addition and deletion of healthcare providers from the general list and/or from a specific plan provider list. An Enrollee will however always have access to a number of healthcare facilities within their applicable Aman Medicare network of Providers.</p>
                    </div>
                </div>
                <div>
                    <h3>Section II - Description of benefits</h3>
                    <div>
                        <h4>Scope of insurance</h4>
                        <ul>
                            <li>Medically necessary treatment of an insured person due to illness or accident is considered to be an insured event. The insured event starts with your treatment. It ends once it is medically established that no further treatment is needed. If the treatment needs to be extended to an illness or consequences of an accident that is not causally linked to treatment up to that point, a new insured event shall be considered to have occurred. An insured event is also deemed to be the death of the insured person, examinations and medically necessary treatments for complaints during pregnancy and delivery, vaccinations as well as outpatient check-ups.</li>
                            <li>During your stay, you have free choice of the doctors, dentists and hospitals recognised and accredited in the country of destination. Hospitals must be under permanent medical management. They must have sufficient diagnostic and therapeutic facilities and manage case histories. For treat- ments in sanatoriums that also carry out cures or sanatorium treatments, our written confirmation must first be ob- tained. Aman Medicare reimburses the costs arising in accordance with clause 2 (Insured benefits).</li>
                            <li>Aman Medicare only pays for diagnostic and treatment methods    and medications that are universally or generally recognised by conventional medicine.</li>
                        </ul>
                        <p><b>Drugs and Medications:</b> all enrollees are covered for drugs recommended in the course of their treatment for covered services as defined in the plan benefit except for excluded items. As a standard, enrollees shall be prescribed generic drugs. except where no generic option exists, in which case, prior approval will be sought by the provider to dispense branded medication.
                            In the event that the provider or enrollee prefers a branded option where a generic option is available, such option may be paid for directly by the enrollee to the provider. Kindly note that where the provider does not maintain a stock of generic medications, a prescription should be collected and the generic medication taken from a pharmacy for which Aman Medicare will be responsible.
                        </p>

                    </div>
                    <div>
                        <h4> Restrictions to Insurance Cover</h4>
                        <ul>
                            <li><b>Exclusions of cover: </b>Aman Medicare does not pay out:</li>
                            <li>if you have wilfully brought about the insured event or attempt to make fraudulent representations to us as to the circumstances which are material to the grounds for provid- ing cover and the amount of insurance benefits;
                                Aman Medicare will not cover or pay for any treatment that was given before an Enrollee's commencement date of cover (including waiting periods) or after cancellation/termination of cover or during any period for which Aman Medicare is yet to receive premiums.
                                Aman will not cover or pay for any treatment that is not specifically covered under the Benefit Schedule of the Policy. Aman Medicare will not cover nor pay for other conditions or procedures which are not specified as covered services in the schedule of benefits for the plans. Similarly,   the   plans   do   not   cover   self-medication   or   Consultations   with unrecognized/un-orthodox consultants, hospitals, family doctors, therapists, dental practitioners  or  complementary  medicines   practitioners.  In  the  same  vein, complications from such unrecognized/un-orthodox places are not covered under the plans.
                            </li>
                            <li> <b>Transferability of Cover: </b>All Aman Medicare cover plans are person specific and non-transferable.</li>
                            <li><b> Confidentiality:</b> Aman Medicare is committed to protecting the information of its members and it’s bound by law and regulatory standards to maintain the privacy of its enrollees’ medical information and records. Aman Medicare also holds its employees, providers, and consultants to strict policies and procedures in protecting members/enrollees information. The information collected from an enrollee at enrollment. </li>
                            <li><b>Complaint Resolution</b>



                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3>Section III - TAKAFUL PRINCIPLES AND CONDITIONS</h3>
                    <div>
                        <ul>
                            <li>The principles of takaful and provisions of Shariah shall be applicable to this policy as guided by AAOIFI Shariah Standards and the advice of qualified local scholars.</li>
                            <li>Aman Medicare shall expend the cost of medical care given to the policyholders out of the takaful funds according to the terms and conditions set forth in this policy and the scope defined by the policyholder’s plan.</li>
                            <li>A policyholder shall donate all or part of his contribution to pay for the medical expenses of any of the policyholders as per the cooperative or takaful principles.</li>
                            <li> Aman Medicare shall manage the takaful operation for the benefit of the policyholders as Wakil and will charge a maximum annual administrative fee of 25% based on the principle of Wakala on the Gross Annual Contribution.</li>
                            <li> Aman Medicare shall invest policyholders’ contributions collectively for the benefit of policyholders on a Mudaraba basis for a fee equal to a percentage of the realized profits. It will be entitled to 50% share of the net investment profit (if any) as Mudarib fee which will be calculated at the end of the financial year for its management of the policyholders’ investment portfolio.</li>
                            <li> The Wakala fee and Mudarib fee percentages will be announced in advance before the beginning of the financial year and will be mentioned in every policy or in renewal notices.  </li>
                            <li> Aman Medicare shall distribute from the underwriting surplus to eligible policyholders as follows:
                                <br />a. A policyholder will not have the right to receive any share of the underwriting surplus, if he/she received medical care where the cost is equivalent to 55% or more of his/her contribution.
                                <br />b. A policyholder will have the right to receive a prorated part of his/her entitlement to the underwriting surplus (after deducting the cost of medical care) if the cost of medical benefit enjoyed is less than 55% of the contributions.
                                <br />c. For the purpose of (a) above, a Policyholder’s financial position shall be deemed as one position (aggregated) in the event of holding multiple types of health plans with Aman Medicare.
                            </li>
                            <li>If the Policyholder does not collect his/her share of surplus within a period of 12 months from the end of the financial year during which his policy expires, that share of surplus shall be considered as a donation by the policyholder to a takaful reserve fund to preserve the objective of providing health cover to current and future enrollees of Aman Medicare.</li>
                            <li>No more than 50% of the surplus shall be deducted as a donation for the takaful reserve provision. In case of the Association’s (Aman Medicare) liquidation, this reserve will be used for charity as decided by the Sharia Advisers after settlement of all the policyholders’ rights and claims from health service providers.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Modal >
    )
}