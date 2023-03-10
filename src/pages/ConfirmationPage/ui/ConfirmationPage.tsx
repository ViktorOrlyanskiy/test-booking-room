import styled from '@emotion/styled';
import { Button, CircularProgress, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteSuccess, getRouteUserData } from 'shared/consts/routes';
import { useCalculationStore } from '../../–°alculationPage/model/store/calculationStore';
import { useUserDataStore } from '../../UserDataPage/model/userDataStore';
import { mapTypeRoom } from 'shared/lib/mapTypeRoom';
import { getNightWord } from 'shared/lib/getNightWord';
import { getAdultWord } from 'shared/lib/getAdultWord';
import { getChildrenWord } from 'shared/lib/getChildrenWord';

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

const ConfirmationPage: FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        surname,
        name,
        fullName,
        phone,
        resetStore: resetUserDataStore,
    } = useUserDataStore((state) => state);
    const {
        adults,
        teenagers,
        children,
        roomType,
        nights,
        insurance,
        fullCost,
        resetStore: resetCalculationStore,
    } = useCalculationStore((state) => state);

    const handleClickBack = () => {
        navigate(getRouteUserData());
    };

    const handleClickNext = () => {
        setLoading(true);
        setTimeout(() => {
            resetCalculationStore();
            resetUserDataStore();
            setLoading(false);
            navigate(getRouteSuccess());
        }, 1500);
    };

    const teenagersStr =
        teenagers !== '0'
            ? `, ${teenagers} ${getChildrenWord(teenagers)} –ĺ—ā 5 –ī–ĺ 12 –Ľ–Ķ—ā`
            : '';
    const childrenStr =
        children !== '0'
            ? ` –ł ${children} ${getChildrenWord(children)} –ī–ĺ 5 –Ľ–Ķ—ā`
            : '';

    return (
        <StContainer
            direction="column"
            sx={{ position: loading ? 'relative' : 'inherit' }}
        >
            <Typography fontSize={32} fontWeight={700}>
                –Ď—Ä–ĺ–Ĺ–ł—Ä–ĺ–≤–į–Ĺ–ł–Ķ –Ĺ–ĺ–ľ–Ķ—Ä–į
            </Typography>
            <Typography fontSize={18} mb={3}>
                –ü–ĺ–ī–≤–Ķ—Ä–∂–ī–Ķ–Ĺ–ł–Ķ –∑–į–ļ–į–∑–į
            </Typography>
            <Typography mb={0.5} fontWeight={700}>
                {surname} {name} {fullName}
            </Typography>
            <Typography mb={0.5}>
                {phone.replace(/^(\+7)(\d{3})(\d{3})(\d{2})/g, '$1 $2 $3 $4-')}
            </Typography>
            <Typography mb={0.5}>
                –Ě–ĺ–ľ–Ķ—Ä ¬ę{mapTypeRoom(roomType)}¬Ľ –Ĺ–į {nights}{' '}
                {getNightWord(nights)}
            </Typography>
            <Typography mb={0.5}>
                {adults} {getAdultWord(adults)}
                {teenagersStr} {childrenStr}
            </Typography>
            <Typography mb={0.5}>
                –°—ā—Ä–į—Ö–ĺ–≤–ļ–į {insurance ? '–≤–ļ–Ľ—é—á–Ķ–Ĺ–į' : '–Ĺ–Ķ –≤–ļ–Ľ—é—á–Ķ–Ĺ–į'}
            </Typography>
            <Typography mb={0.5}>
                –ö –ĺ–Ņ–Ľ–į—ā–Ķ <b>{Number(fullCost).toLocaleString()} ‚āĹ</b>
            </Typography>
            <StButtonContainer>
                <StLastButton variant="outlined" onClick={handleClickBack}>
                    –Ě–į–∑–į–ī –ļ –ī–į–Ĺ–Ĺ—č–ľ –Ņ–ĺ–ļ—É–Ņ–į—ā–Ķ–Ľ—Ź
                </StLastButton>
                <StButton variant="contained" onClick={handleClickNext}>
                    –ě–Ņ–Ľ–į—ā–ł—ā—Ć
                </StButton>
            </StButtonContainer>
            {loading && (
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        position: 'absolute',
                        width: '95%',
                        height: '95%',
                    }}
                >
                    <CircularProgress />
                </Stack>
            )}
        </StContainer>
    );
};

export default ConfirmationPage;
