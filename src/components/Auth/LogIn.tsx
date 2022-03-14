import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
    Alert, Button, IconButton, InputAdornment, Snackbar, TextField,
} from '@mui/material';
import { styled } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { signIn, IFormInput } from '../../core/api';
import './auth.css';
import { MyContext } from '../../core/context';
import { IGetCurrentUser, ILoginResponse } from '../../utils/alias';

const CssTextField = styled(TextField)({
    width: '100%',
    margin: '10px 0',
});

export const LogIn: React.FC = () => {
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isWait, setWait] = useState(false);
    const navigation = useNavigate();
    const { setCurrentUser } = useContext(MyContext);

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleCloseSnackbar = () => {
        setIncorrectEmail(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormInput>({ mode: 'onChange' });

    const onSubmit = (data: IFormInput) => {
        setWait(true);
        signIn(data)
            .then((loginResponse: ILoginResponse) => {
                localStorage.setItem('token', loginResponse.token);
                localStorage.setItem('refreshToken', loginResponse.refreshToken);
                localStorage.setItem('id', loginResponse.userId);
                setWait(false);
                const user: IGetCurrentUser = { email: '', name: loginResponse.name, id: loginResponse.userId };
                setCurrentUser!(user);
                navigation('/');
            })
            .catch(() => {
                setWait(false);
                setIncorrectEmail(true);
            });
    };

    return (
        <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
            <h2>Войти</h2>
            <CssTextField
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                id="outlined-basic-2"
                label="Email"
                variant="outlined"
                required
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
                autoComplete="off"
                required
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
                Войти
            </Button>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={incorrectEmail}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert severity="error" sx={{ width: '350px' }}>
                    неверный email или пароль!
                </Alert>
            </Snackbar>
            <h3>
                Нет аккаунта?
                {'  '}
                <Link to="/auth" style={{ textDecoration: 'underline' }}>
                    Создать
                </Link>
            </h3>
        </form>
    );
};
