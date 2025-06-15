import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/logo.png';
import Loader from '../../../common/Loader/loader';
import { toast } from 'react-toastify';
import { authRequests } from '../../../api/auth-api';
import { useAuth } from '../../../utils/authContext';
import OTPInput from '../../../common/otpInput';
import { TextField } from '@mui/material';
import { useGeolocated } from 'react-geolocated';

const SignIn = () => {
  const [showCodeStep, setShowCodeStep] = useState(false);
  const [formData, setFormData] = useState({ phone: '', code: '' });
  const [errors, setErrors] = useState({ phone: null, code: null });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);

  const navigate = useNavigate();
  const { signin } = useAuth();
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    const saved = localStorage.getItem('rememberMePhone');
    if (saved) {
      setFormData(prev => ({ ...prev, phone: saved }));
      setRememberMe(true);
    }
  }, []);

  const generateDeviceId = () => {
    const userAgent = navigator.userAgent;
    const hash = [...userAgent].reduce((h, ch) => {
      h = (h << 5) - h + ch.charCodeAt(0);
      return h & h;
    }, 0);
    localStorage.setItem('user_deviceid', `device-${hash}`);
  };

  useEffect(() => {
    if (!resendDisabled) return;

    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [resendDisabled]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    let msg = '';
    // if (name === 'phone' && !/^\d{10,15}$/.test(value)) msg = 'Please enter a valid phone number';
    if (name === 'code' && !value.trim()) msg = 'Please enter the code';

    setErrors(prev => ({ ...prev, [name]: msg }));
  };

  const formValid = useMemo(() => {
    const requiredField = showCodeStep ? 'code' : 'phone';
    return Object.values(errors).every(v => !v) && formData[requiredField];
  }, [errors, showCodeStep, formData]);

  const handleLogin = async () => {
    if (!formValid) return;
    setLoading(true);

    try {
      generateDeviceId();
      if (coords) localStorage.setItem('user_geolocation', 'Unknown');

      rememberMe
        ? localStorage.setItem('rememberMePhone', formData.phone)
        : localStorage.removeItem('rememberMePhone');

      const res = await authRequests.loginUser(formData.phone);

      if (!res.error) {
        setShowCodeStep(true);
        toast.info(res.data.message);
      } else {
        toast.error('Failed to send verification code.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!formValid) return;
    setLoading(true);

    try {
      const res = await authRequests.verifyLoginCode(formData.phone, formData.code);

      if (!res.error) {
        setFormData({ phone: '', code: '' });
        setShowCodeStep(false);
       signin(res.data, () => {
          navigate('/dashboard');
      });
      } else {
        toast.error(res.data?.response?.data?.messages || 'Invalid code');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await authRequests.loginUser(formData.phone);
      if (!res.error) {
        toast.info(res.data.message);
        setResendDisabled(true);
      } else {
        toast.error('Failed to send verification code.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const stopEnterSubmit = e => e.key === 'Enter' && e.preventDefault();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow border-0">
              <div className="row g-0">
                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-white p-4">
                  <img src={Logo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
                </div>

                <div className="col-md-6 p-4">
                  <div className="text-center mb-4">
                    <img src={Logo} alt="Logo" className="img-fluid d-md-none mb-3" style={{ maxWidth: '150px' }} />
                    <h4>{showCodeStep ? 'Enter Code to Verify' : 'Welcome Back! Please Log In'}</h4>
                  </div>

                  <form onKeyDown={stopEnterSubmit}>
                    <div className="mb-3">
                      {showCodeStep ? (
                        <>
                          <OTPInput length={6} onChange={val => handleChange('code', val)} />
                          {errors.code && <div className="text-danger small mt-1">{errors.code}</div>}

                          <div className="mt-3 text-center">
                            {resendDisabled ? (
                              <span className="text-muted small">Resend code in {timer}s</span>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-link p-0 small"
                                onClick={handleResend}
                                disabled={loading}
                              >
                                Resend Code
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                            variant="outlined"
                          />
                          {errors.phone && <div className="text-danger small mt-1">{errors.phone}</div>}

                          <div className="form-check mt-3">
                            <input
                              id="rememberMe"
                              type="checkbox"
                              className="form-check-input"
                              checked={rememberMe}
                              onChange={() => setRememberMe(prev => !prev)}
                            />
                            <label htmlFor="rememberMe" className="form-check-label">
                              Remember Me
                            </label>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="d-grid">
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={!formValid}
                        onClick={showCodeStep ? handleVerifyCode : handleLogin}
                      >
                        {showCodeStep ? 'Verify' : 'Sign In'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {loading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
