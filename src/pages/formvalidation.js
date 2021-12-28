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

   // Association code
   builder.association_code = form.association_code

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
   builder.confirm_email = form.confirm_email

   if (!form.enrolee_size) {
      return setError("Select Enrollee Size")
   }
   builder.enrolee_size = form.enrolee_size


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
   builder.confirm_phone = form.confirm_phone
   


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


// validate Partner form
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



// validate vendor form
formValidator.validateNewVendor = (form, builder, setError) => {
   setError("")
   // validate first_name name
   if (!form.first_name) {
      return setError("First Name is required")
   }
   if (form.first_name < 2) {
      return setError("First Name is too short")
   }
   if (form.first_name.length > 45) {
      return setError("First Name is too long")
   }
   builder.first_name = form.first_name


   if (!form.last_name) {
      return setError("Last Name is required")
   }
   if (form.last_name.length < 2) {
      return setError("Last Name is too short")
   }
   if (form.last_name.length > 45) {
      return setError("Last Name is too long")
   }
   builder.last_name = form.last_name

   //validate the email
   if (!form.email) {
      return setError("email is required")
   }
   builder.email = form.email

   //validate the username
   if (!form.vendor_name) {
      return setError("Vendor Name is required")
   }
   builder.vendor_name = form.vendor_name

   //validate the phone
   if (!form.phone_number) {
      return setError("phone number is required")
   }
   if (!/^[0-9]+$/.test(form.phone_number)) {
      return setError("Phone number should be digits only")
   }
   if (!/^0/.test(form.phone_number)) {
      return setError("Phone number must start with zero. e.g (070........)")
   }
   if (form.phone_number.length !== 11) {
      return setError("Invalid phone number. Phone number expects 11 digits")
   }
   builder.phone_number = form.phone_number

   //check the password
   if (!form.password) {
      return setError("password is required")
   }
   //check if its above minimum number
   if (form.password.length < 6) {
      return setError("Password must be 6 characters or more")
   }
   //check if its above minimum number
   if (form.password.length > 15) {
      return setError("Password must be less than 15 characters")
   }
   //check if there's capital letter
   if (!/[A-Z]/.test(form.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   //check if there's small letter
   if (!/[a-z]/.test(form.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   //check if there's number
   if (!/[0-9]/.test(form.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   builder.password = form.password


   //check if Area
   if (!form.area) {
      return setError("Area is required")
   }
   builder.area = form.area

   //check if City
   if (!form.city) {
      return setError("City is required")
   }
   builder.city = form.city


   //check if registration_id
   if (!form.registration_id) {
      return setError("CAC No. is required")
   }
   builder.registration_id = form.registration_id

   // check if Address
   if (!form.address) {
      return setError("Address is required")
   }
   if (!/^[\w\s\-\\]+$/i.test(form.address)) {
      return setError("No special character allowed for Address")
   }
   builder.address = form.address

   // set user type
   builder.user_type = "vendor"

   // return payload
   return builder
}

export default formValidator