const formValidator = {}

const validateEmail = (email) => {
   return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

formValidator.validateAccountRegistration = (form, builder, setError) => {
   setError("")

   // Category
   if (!form.category) {
      return setError("Category is required")
   }
   builder.category = form.category

   // Premium
   if (!form.premium_type) {
      return setError("Premium Type is required")
   }
   builder.premium_type = form.premium_type

   // Association code
   builder.social_no = form.social_no ?? ''

   builder.enrolee_size = form.enrolee_size

   // Name
   if (!form.name) {
      return setError("Full Name is required")
   }
   builder.name = form.name

   // Email
   if (!form.email) {
      return setError("Email is required")
   }
   if (!validateEmail(form.email)) {
      return setError("Invalid Email Input")
   }
   builder.email = form.email

   // Email
   if (form.email !== form.confirm_email) {
      return setError("Email does not match")
   }

   builder.additional_heads = form.additional_heads ?? 0


   //validate the phone
   if (!form.phone) {
      return setError("phone number is required")
   }
   if (!/^[0-9]+$/.test(form.phone)) {
      return setError("Phone number should be digits only")
   }
   if (!/^0/.test(form.phone)) {
      return setError("Phone number must start with zero. e.g (070........)")
   }
   if (form.phone.length !== 11) {
      return setError("Invalid phone number. Phone number expects 11 digits")
   }
   builder.phone = form.phone

    // Email
    if (form.phone !== form.confirm_phone) {
      return setError("Phone number does not match")
   }
   


   // validate password
   if (!form.password) {
      return setError("Password is required")
   }
   if (form.confirm_password !== form.password) {
      return setError("Confirm Password Mismatch")
   } else {
      builder.password = form.password
   }

   // disclaimer
   builder.disclaimer = 1;

   return builder
}






// validate Principal form
formValidator.validatePrincipal = (form, builder, setError) => {
   setError("");

   // First name 
   if (!form.first_name) {
      return setError("First Name is required")
   }
   builder.first_name = form.first_name

   // Middle name
   if (!form.middle_name) {
      return setError("Middle Name is required")
   }
   builder.middle_name = form.middle_name

   // Last name
   if (!form.surname) {
      return setError("Surname is required")
   }
   builder.surname = form.surname

   // State
   builder.state = form.state

   // LGA
   builder.lga = form.lga

   // DOB
   builder.date_of_birth = form.date_of_birth

   // Gender

   builder.gender = form.gender

   // Religion
   builder.religion = form.religion

   // Marital Status
   builder.marital_status = form.marital_status

   // Job title
   builder.job_title = form.job_title

   // Primary Health Care Facility
   builder.primary_health_facility = form.primary_health_facility

   // Secondary Health Care Facility
   builder.secondary_health_facility = form.secondary_health_facility

   // Contact Address
   builder.contact_address = form.contact_address

   // Existing Medical Condition
   builder.existing_medical_condition = form.existing_medical_condition

   // Previous Medical Condition
   builder.previous_medical_condition = form.previous_medical_condition


   // return payload
   return builder
}

// validate Dependent form
formValidator.validateDependent = (form, builder, setError) => {
   setError("");

   // First name 
   if (!form.first_name) {
      return setError("First Name is required")
   }
   builder.first_name = form.first_name

   // Middle name
   if (!form.middle_name) {
      return setError("Middle Name is required")
   }
   builder.middle_name = form.middle_name

   // Last name
   if (!form.surname) {
      return setError("Surname is required")
   }
   builder.surname = form.surname

   builder.email = form.email

   // State
   builder.state = form.state

   // LGA
   builder.lga = form.lga

   // DOB
   builder.birth_day = form.birth_day

   // Gender

   builder.gender = form.gender

   // Religion
   builder.religion = form.religion

   // Marital Status
   builder.relationship = form.relationship

   // Job title
   builder.job_title = form.job_title

   // Primary Health Care Facility
   builder.primary_health_facility = form.primary_health_facility

   // Secondary Health Care Facility
   builder.secondary_health_facility = form.secondary_health_facility

   // Contact Address
   builder.contact_address = form.contact_address

   // Existing Medical Condition
   builder.existing_medical_condition = form.existing_medical_condition

   // Previous Medical Condition
   builder.previous_medical_condition = form.previous_medical_condition


   // return payload
   return builder
}



export default formValidator