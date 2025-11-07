const icons = {
    logo: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z M12 12v0" />,
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    userPlus: <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />,
    login: <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />,
    settings: <circle cx="12" cy="12" r="3" />,
    profile: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />,
    account: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />,
};

const Icon = ({ name, size = 16, className }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {icons[name]}
        </svg>
    );
};

export default Icon;
