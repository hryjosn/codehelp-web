import { Experience } from '~/container/Home/components/MentorList/types'
import { GenderCode } from '../types'
export interface Discipline {
    id: string
    mentorId: string
    discipline: string
    created_at: string
}

export interface Tool {
    id: string
    mentorId: string
    tool: string
    created_at: string
}

export interface Skill {
    id: string
    mentorId: string
    skill: string
    created_at: string
}

export interface Props {
    userData: UserProfileData
}

export interface UserProfileData {
    id: string
    userName: string
    email: string
    avatar: string
    gender: GenderCode
    country: keyof typeof COUNTRY
    title: string
    company: string
    phoneNumber: string
    emailOtp: boolean
    introduction: string
    level: number
    url: string
    primaryExpertise: string
    secondaryExpertise: string
    tertiaryExpertise: string
    mentorDisciplines: Discipline[]
    mentorSkills: Skill[]
    mentorTools: Tool[]
    created_at: string
    updated_at: string
    quickReply: boolean
    experience: Experience[]
    education: string
    mentorAvailableTimes: MentorAvailableTimes[]
}

export interface MentorAvailableTimes {
    id: string
    mentorId: string
    day: keyof typeof WEEK_DAYS
    timeCode: number[]
}

export interface AdjustMinuteToHour {
    minute: number
    t: Function
}

export enum TimeCode {
    '00:00:00',
    '01:00:00',
    '02:00:00',
    '03:00:00',
    '04:00:00',
    '05:00:00',
    '06:00:00',
    '07:00:00',
    '08:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
    '20:00:00',
    '21:00:00',
    '22:00:00',
    '23:00:00',
}

export enum WEEK_DAYS {
    MON = 'Monday',
    TUE = 'Tuesday',
    WED = 'Wednesday',
    THU = 'Thursday',
    FRI = 'Friday',
    SAT = 'Saturday',
    SUN = 'Sunday',
}

export enum EDUCATION {
    'No Formal Education',
    'Elementary School',
    'Middle School / Junior High',
    'High School / Vocational',
    'Associate Degree',
    'Bachelor’s Degree',
    'Master’s Degree',
    'PhD / Postdoctoral',
}

export enum COUNTRY {
    AF = 'Afghanistan',
    AX = 'Åland Islands',
    AL = 'Albania',
    DZ = 'Algeria',
    AS = 'American Samoa',
    AD = 'AndorrA',
    AO = 'Angola',
    AI = 'Anguilla',
    AQ = 'Antarctica',
    AG = 'Antigua and Barbuda',
    AR = 'Argentina',
    AM = 'Armenia',
    AW = 'Aruba',
    AU = 'Australia',
    AT = 'Austria',
    AZ = 'Azerbaijan',
    BS = 'Bahamas',
    BH = 'Bahrain',
    BD = 'Bangladesh',
    BB = 'Barbados',
    BY = 'Belarus',
    BE = 'Belgium',
    BZ = 'Belize',
    BJ = 'Benin',
    BM = 'Bermuda',
    BT = 'Bhutan',
    BO = 'Bolivia',
    BA = 'Bosnia and Herzegovina',
    BW = 'Botswana',
    BV = 'Bouvet Island',
    BR = 'Brazil',
    IO = 'British Indian Ocean Territory',
    BN = 'Brunei Darussalam',
    BG = 'Bulgaria',
    BF = 'Burkina Faso',
    BI = 'Burundi',
    KH = 'Cambodia',
    CM = 'Cameroon',
    CA = 'Canada',
    CV = 'Cape Verde',
    KY = 'Cayman Islands',
    CF = 'Central African Republic',
    TD = 'Chad',
    CL = 'Chile',
    CN = 'China',
    CX = 'Christmas Island',
    CC = 'Cocos (Keeling) Islands',
    CO = 'Colombia',
    KM = 'Comoros',
    CG = 'Congo',
    CD = 'Congo, The Democratic Republic of the',
    CK = 'Cook Islands',
    CR = 'Costa Rica',
    CI = 'Cote D"Ivoire',
    HR = 'Croatia',
    CU = 'Cuba',
    CY = 'Cyprus',
    CZ = 'Czech Republic',
    DK = 'Denmark',
    DJ = 'Djibouti',
    DM = 'Dominica',
    DO = 'Dominican Republic',
    EC = 'Ecuador',
    EG = 'Egypt',
    SV = 'El Salvador',
    GQ = 'Equatorial Guinea',
    ER = 'Eritrea',
    EE = 'Estonia',
    ET = 'Ethiopia',
    FK = 'Falkland Islands (Malvinas)',
    FO = 'Faroe Islands',
    FJ = 'Fiji',
    FI = 'Finland',
    FR = 'France',
    GF = 'French Guiana',
    PF = 'French Polynesia',
    TF = 'French Southern Territories',
    GA = 'Gabon',
    GM = 'Gambia',
    GE = 'Georgia',
    DE = 'Germany',
    GH = 'Ghana',
    GI = 'Gibraltar',
    GR = 'Greece',
    GL = 'Greenland',
    GD = 'Grenada',
    GP = 'Guadeloupe',
    GU = 'Guam',
    GT = 'Guatemala',
    GG = 'Guernsey',
    GN = 'Guinea',
    GW = 'Guinea-Bissau',
    GY = 'Guyana',
    HT = 'Haiti',
    HM = 'Heard Island and Mcdonald Islands',
    VA = 'Holy See (Vatican City State)',
    HN = 'Honduras',
    HK = 'Hong Kong',
    HU = 'Hungary',
    IS = 'Iceland',
    IN = 'India',
    ID = 'Indonesia',
    IR = 'Iran, Islamic Republic Of',
    IQ = 'Iraq',
    IE = 'Ireland',
    IM = 'Isle of Man',
    IL = 'Israel',
    IT = 'Italy',
    JM = 'Jamaica',
    JP = 'Japan',
    JE = 'Jersey',
    JO = 'Jordan',
    KZ = 'Kazakhstan',
    KE = 'Kenya',
    KI = 'Kiribati',
    KP = 'Korea, Democratic People"S Republic of',
    KR = 'Korea, Republic of',
    KW = 'Kuwait',
    KG = 'Kyrgyzstan',
    LA = 'Lao People"S Democratic Republic',
    LV = 'Latvia',
    LB = 'Lebanon',
    LS = 'Lesotho',
    LR = 'Liberia',
    LY = 'Libyan Arab Jamahiriya',
    LI = 'Liechtenstein',
    LT = 'Lithuania',
    LU = 'Luxembourg',
    MO = 'Macao',
    MK = 'Macedonia, The Former Yugoslav Republic of',
    MG = 'Madagascar',
    MW = 'Malawi',
    MY = 'Malaysia',
    MV = 'Maldives',
    ML = 'Mali',
    MT = 'Malta',
    MH = 'Marshall Islands',
    MQ = 'Martinique',
    MR = 'Mauritania',
    MU = 'Mauritius',
    YT = 'Mayotte',
    MX = 'Mexico',
    FM = 'Micronesia, Federated States of',
    MD = 'Moldova, Republic of',
    MC = 'Monaco',
    MN = 'Mongolia',
    MS = 'Montserrat',
    MA = 'Morocco',
    MZ = 'Mozambique',
    MM = 'Myanmar',
    NA = 'Namibia',
    NR = 'Nauru',
    NP = 'Nepal',
    NL = 'Netherlands',
    AN = 'Netherlands Antilles',
    NC = 'New Caledonia',
    NZ = 'New Zealand',
    NI = 'Nicaragua',
    NE = 'Niger',
    NG = 'Nigeria',
    NU = 'Niue',
    NF = 'Norfolk Island',
    MP = 'Northern Mariana Islands',
    NO = 'Norway',
    OM = 'Oman',
    PK = 'Pakistan',
    PW = 'Palau',
    PS = 'Palestinian Territory, Occupied',
    PA = 'Panama',
    PG = 'Papua New Guinea',
    PY = 'Paraguay',
    PE = 'Peru',
    PH = 'Philippines',
    PN = 'Pitcairn',
    PL = 'Poland',
    PT = 'Portugal',
    PR = 'Puerto Rico',
    QA = 'Qatar',
    RE = 'Reunion',
    RO = 'Romania',
    RU = 'Russian Federation',
    RW = 'RWANDA',
    SH = 'Saint Helena',
    KN = 'Saint Kitts and Nevis',
    LC = 'Saint Lucia',
    PM = 'Saint Pierre and Miquelon',
    VC = 'Saint Vincent and the Grenadines',
    WS = 'Samoa',
    SM = 'San Marino',
    ST = 'Sao Tome and Principe',
    SA = 'Saudi Arabia',
    SN = 'Senegal',
    CS = 'Serbia and Montenegro',
    SC = 'Seychelles',
    SL = 'Sierra Leone',
    SG = 'Singapore',
    SK = 'Slovakia',
    SI = 'Slovenia',
    SB = 'Solomon Islands',
    SO = 'Somalia',
    ZA = 'South Africa',
    GS = 'South Georgia and the South Sandwich Islands',
    ES = 'Spain',
    LK = 'Sri Lanka',
    SD = 'Sudan',
    SR = 'Suriname',
    SJ = 'Svalbard and Jan Mayen',
    SZ = 'Swaziland',
    SE = 'Sweden',
    CH = 'Switzerland',
    SY = 'Syrian Arab Republic',
    TW = 'Taiwan',
    TJ = 'Tajikistan',
    TZ = 'Tanzania, United Republic of',
    TH = 'Thailand',
    TL = 'Timor-Leste',
    TG = 'Togo',
    TK = 'Tokelau',
    TO = 'Tonga',
    TT = 'Trinidad and Tobago',
    TN = 'Tunisia',
    TR = 'Turkey',
    TM = 'Turkmenistan',
    TC = 'Turks and Caicos Islands',
    TV = 'Tuvalu',
    UG = 'Uganda',
    UA = 'Ukraine',
    AE = 'United Arab Emirates',
    GB = 'United Kingdom',
    US = 'United States',
    UM = 'United States Minor Outlying Islands',
    UY = 'Uruguay',
    UZ = 'Uzbekistan',
    VU = 'Vanuatu',
    VE = 'Venezuela',
    VN = 'Viet Nam',
    VG = 'Virgin Islands, British',
    VI = 'Virgin Islands, U.S.',
    WF = 'Wallis and Futuna',
    EH = 'Western Sahara',
    YE = 'Yemen',
    ZM = 'Zambia',
    ZW = 'Zimbabwe',
}
