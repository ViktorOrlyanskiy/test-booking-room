import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import {
    getRouteConfirmation,
    getRouteŠ”alculation,
} from 'shared/consts/routes';
import { Field } from 'shared/ui/Field';
import { Input } from 'shared/ui/Input';
import { MuiDateTimePicker } from 'shared/ui/MuiDatePicker';
import { UserDataSchema } from '../model/userDataSchema';
import { useUserDataStore } from '../model/userDataStore';
import { validationScheme } from '../lib/validationScheme';

const StContainer = styled(Stack)`
    max-width: 640px;
    width: 100%;
    height: 700px;
    padding: 16px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 6px 1px rgba(36, 72, 99, 0.2);

    @media (max-width: 500px) {
        height: 100vh;
        padding: 10px;
        border-radius: none;
        box-shadow: none;
    }
`;

const StButtonContainer = styled(Stack)`
    margin-top: auto;
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 500px) {
        flex: 1 1 auto;
        flex-direction: column-reverse;
        justify-content: flex-start;
        padding-bottom: 10px;
        &:last-child {
            margin-bottom: 0 !important;
        }
    }
`;

const StButton = styled(Button)`
    padding: 5px 30px;
    margin-top: auto;

    @media (max-width: 500px) {
        width: 100%;
        padding: 5px 10px;
        margin-left: 0;
        margin-top: 0;
    }
`;

const StLastButton = styled(Button)`
    padding: 5px 30px;
    margin-top: auto;

    @media (max-width: 500px) {
        width: 100%;
        padding: 5px 10px;
        margin-top: 10px;
    }
`;

const UserDataPage: FC = () => {
    const navigate = useNavigate();
    const setValues = useUserDataStore((state) => state.setValues);
    const {
        register,
        getValues,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserDataSchema>({
        mode: 'onChange',
        defaultValues: {
            surname: useUserDataStore((state) => state.surname),
            name: useUserDataStore((state) => state.name),
            fullName: useUserDataStore((state) => state.fullName),
            phone: useUserDataStore((state) => state.phone),
            dateBirth: useUserDataStore((state) => state.dateBirth),
        },
        resolver: yupResolver(validationScheme),
    });

    const handleChangeDatePicker = (value: any) => {
        setValue('dateBirth', value);
    };

    const handleClickBack = () => {
        navigate(getRouteŠ”alculation());
    };

    const handleClickNext = () => {
        navigate(getRouteConfirmation());
    };

    useEffect(() => {
        const subscription = watch((values: UserDataSchema) => {
            setValues(values);
        });
        return () => subscription.unsubscribe();
    }, [setValues, watch]);

    return (
        <StContainer direction="column">
            <Typography fontSize={32} fontWeight={700}>
                ŠŃŠ¾Š½ŠøŃŠ¾Š²Š°Š½ŠøŠµ Š½Š¾Š¼ŠµŃŠ°
            </Typography>
            <Typography fontSize={18} mb={3}>
                ŠŠ°Š½Š½ŃŠµ ŠæŠ¾ŠŗŃŠæŠ°ŃŠµŠ»Ń
            </Typography>
            <Field label="Š¤Š°Š¼ŠøŠ»ŠøŃ" errorMessage={errors?.surname?.message}>
                <Input
                    error={!!errors?.surname?.message}
                    {...register('surname')}
                />
            </Field>
            <Field label="ŠŠ¼Ń" errorMessage={errors?.name?.message}>
                <Input error={!!errors?.name?.message} {...register('name')} />
            </Field>
            <Field label="ŠŃŃŠµŃŃŠ²Š¾">
                <Input error={false} {...register('fullName')} />
            </Field>
            <Field label="ŠŠ¾Š¼ŠµŃ ŃŠµŠ»ŠµŃŠ¾Š½Š°" errorMessage={errors?.phone?.message}>
                <Input
                    type="tel"
                    placeholder="+7 XXX-XXX-XX-XX"
                    error={!!errors?.phone?.message}
                    {...register('phone')}
                />
            </Field>
            <Field label="ŠŠ°ŃŠ° ŃŠ¾Š¶Š“ŠµŠ½ŠøŃ">
                <MuiDateTimePicker
                    selectedDate={getValues('dateBirth')}
                    setSelectedDate={handleChangeDatePicker}
                />
            </Field>

            <StButtonContainer>
                <StLastButton variant="outlined" onClick={handleClickBack}>
                    ŠŠ°Š·Š°Š“ Šŗ ŃŠ°ŃŃŠµŃŃ ŃŃŠ¾ŠøŠ¼Š¾ŃŃŠø
                </StLastButton>
                <StButton
                    variant="contained"
                    onClick={handleSubmit(handleClickNext)}
                >
                    ŠŠ°Š»ŠµŠµ
                </StButton>
            </StButtonContainer>
        </StContainer>
    );
};

export default UserDataPage;
