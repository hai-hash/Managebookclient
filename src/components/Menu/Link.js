import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';
export const linkmenu = [
    {
        lable : "Home",
        to : "/",
        exact : true,
    },
    {
        lable : "About",
        to : "/about",
        exact : false,
    },
    {
        lable : "Books",
        to : "/books",
        exact : false,
    },
    {
        lable : "cart",
        to : "/cart",
        exact : false,
    },
];

export const linkmenuright = [
    {
        lable : <LockOpenIcon fontSize="large">Login</LockOpenIcon>,
        to : "/login",
    },
    {
        lable : <PowerSettingsNewIcon fontSize="large"/>,
        to : "/logout",
    },
    {
        lable : <AccountCircleIcon fontSize="large"/>,
        to : "/profile",
    },
    {
        lable : <InfoIcon fontSize="large"/>,
        to : "/about",
    },
]