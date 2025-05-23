export const PC_CONFIG = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun.l.google.com:5349' },
        { urls: 'stun:stun1.l.google.com:3478' },
        { urls: 'stun:stun1.l.google.com:5349' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:5349' },
        { urls: 'stun:stun3.l.google.com:3478' },
        { urls: 'stun:stun3.l.google.com:5349' },
        { urls: 'stun:stun4.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:5349' },
        {
            urls: 'turn:relay1.expressturn.com:3478',
            credential: 'vk2nkqnghHY6Nanb',
            username: 'efDNY4K2DS3KJZEKAZ',
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808',
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808',
        },
        {
            urls: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo',
        },
        {
            urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc',
        },
    ],
}

export const MOCK_MESSAGE_LIST = [
    {
        name: 'user1',
        time: '下午1:00',
        message:
            'hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi',
    },
    { name: 'user2', time: '下午1:01', message: 'hello' },
    { name: 'user1', time: '下午1:10', message: 'hi' },
    { name: 'user2', time: '下午1:11', message: 'hello' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user1', time: '下午1:12', message: 'hi' },
    { name: 'user2', time: '下午1:01', message: 'hello' },
    { name: 'user1', time: '下午1:10', message: 'hi' },
    { name: 'user2', time: '下午1:11', message: 'hello' },
]
