import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Address {
  line1: string;
  line2?: string;
  city: string;
  pincode: string;
}

interface FormData {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: Address;
}

interface Errors {
  [key: string]: string | undefined;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      pincode: ''
    }
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validateSignUpForm = () => {
    let tempErrors: Errors = {};
    const nameRegex = /^[a-zA-Z]{2,50}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^.{4,9}$/;
    const pincodeRegex = /^\d{6}$/;
    const phoneRegex = /^\d{10}$/;
    const addressRegex = /^[a-zA-Z]{2,50}$/;

    if (!phoneRegex.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = 'Phone number must be 10 digits.';
    }
    if (!nameRegex.test(formData.firstName)) {
      tempErrors.firstName = 'First name must be 2 to 50 letters.';
    }
    if (!nameRegex.test(formData.lastName)) {
      tempErrors.lastName = 'Last name must be 2 to 50 letters.';
    }
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Email is not valid.';
    }
    if (!passwordRegex.test(formData.password)) {
      tempErrors.password = 'Password must be between 4 and 9 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }
    if (formData.address.line1 && !addressRegex.test(formData.address.line1)) {
      tempErrors.line1 = 'Line1 must be 2 to 50 characters if provided.';
    }
    if (formData.address.line2 && !addressRegex.test(formData.address.line2)) {
      tempErrors.line2 = 'Line2 must be 2 to 50 characters if provided.';
    }
    if (formData.address.city && !addressRegex.test(formData.address.city)) {
      tempErrors.city = 'City must be 2 to 50 characters if provided.';
    }
    if (formData.address.pincode && !pincodeRegex.test(formData.address.pincode)) {
      tempErrors.pincode = 'Pincode must be 6 digits.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const addressField = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateSignUpForm()) {
      setLoading(true);
      try {
        const response = await axios.post('/api/signup', formData);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <div>
        <label>Address Line 1:</label>
        <input
          type="text"
          name="address.line1"
          value={formData.address.line1}
          onChange={handleChange}
        />
        {errors.line1 && <p>{errors.line1}</p>}
      </div>
      <div>
        <label>Address Line 2:</label>
        <input
          type="text"
          name="address.line2"
          value={formData.address.line2}
          onChange={handleChange}
        />
        {errors.line2 && <p>{errors.line2}</p>}
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
        />
        {errors.city && <p>{errors.city}</p>}
      </div>
      <div>
        <label>Pincode:</label>
        <input
          type="text"
          name="address.pincode"
          value={formData.address.pincode}
          onChange={handleChange}
        />
        {errors.pincode && <p>{errors.pincode}</p>}
      </div>
      <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
