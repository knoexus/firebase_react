const db = {
    users: [
        {
            userId: 'hixzv6gfvff706Z7ubQaYBQcFOf1',
            email: 'user@email.com',
            handle: 'user',
            createdAt: '2020-01-09T15:56:18.002Z',
            imageUrl: 'image/mock/mock',
            bio: 'Hi',
            website: 'https://user.com',
            location: 'London, Uk'
        }
    ],
    screams: [
        {
            userHandle: 'user',
            body: 'this is the scream body',
            createdAt: '2020-01-09T14:27:55.464Z',
            likeCount: 5,
            commentCount: 2
        }
    ],
    comments: [
        {
            userHandle: 'user',
            screamId: 'dsdadsadasdasd',
            body: 'nice one',
            createdAt: '2020-01-09T14:27:55.464Z'
        }
    ]
}

const userDetails = {
    credentials: {
        userId: 'hixzv6gfvff706Z7ubQaYBQcFOf1',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2020-01-09T15:56:18.002Z',
        imageUrl: 'image/mock/mock',
        bio: 'Hi',
        website: 'https://user.com',
        location: 'London, Uk'
    },
    likes: [
        {
            userHandle: 'user',
            screamId: 'hdsadsdasdhasd'
        },
        {
            userHandle: 'user',
            screamId: 'ass23123123'
        }
    ]
}