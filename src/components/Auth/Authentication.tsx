import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button, IconButton, InputAdornment, TextField,
} from '@mui/material';
import { styled } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { createUser, IFormInput } from '../../core/api';
import './auth.css';

const CssTextField = styled(TextField)({
    width: '100%',
    margin: '10px 0',
});

export const Authentication: React.FC = () => {
    const [isErrorLogin, setErrorLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isWait, setWait] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormInput>({ mode: 'onChange' });

    const onSubmit = (data: IFormInput) => {
        setErrorLogin(true);
        setWait(true);

        createUser(data)
            .then(() => {
                navigate('/login');
                setWait(false);
            })
            .catch(() => {
                setErrorLogin(false);
                setWait(false);
            });
    };

    return (
        <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
            <h2>Зарегистрироваться</h2>
            <CssTextField
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                id="outlined-basic-1"
                label="Имя"
                variant="outlined"
                required
                {...register('name', {
                    required: true,
                    minLength: { value: 3, message: 'min 3 symbol' },
                })}
            />
            <CssTextField
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                id="outlined-basic-2"
                label="Email"
                variant="outlined"
                required
                autoComplete="on"
                {...register('email', {
                    required: true,
                    pattern: {
                        // eslint-disable-next-line max-len
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'incorrect email',
                    },
                })}
            />
            <CssTextField
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                id="outlined-basic-3"
                label="Пароль"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="off"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                {...register('password', {
                    required: true,
                    minLength: { value: 9, message: 'min length 9 symbol' },
                })}
            />
            {isErrorLogin || <p className="auth-error">такой email уже зарегистрирован</p>}

            <Button
                variant="outlined"
                type="submit"
                disabled={!isValid || isWait}
                color="primary"
                style={{
                    margin: '20px 0px',
                    width: '100%',
                    fontSize: 22,
                    fontWeight: 'bolder',
                }}
            >
                Зарегистрироваться
            </Button>
            <h3 style={{ textAlign: 'center' }}>
                Уже есть аккаунт?
                {'  '}
                <Link to="/login" style={{ textDecoration: 'underline' }}>
                    Войти
                </Link>
            </h3>
        </form>
    );
};
