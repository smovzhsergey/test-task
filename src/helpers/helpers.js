export const user = {
    user: 'Test',
    avatar: 'https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-question-icon-png-image_539902.jpg',
    likes: []
};

function createID (length) {
    let id = '';
    const leters = ['a', 'b', 'c', 'd', 'e', 'f'];

    for (let i = 0; i < length; i++) {
        const numberOrLetter = Math.random();

        if (numberOrLetter > 0.5) {
            id += Math.floor(Math.random() * 10);
        } else {
            if (numberOrLetter < 0.25) {
                id += leters[Math.round(numberOrLetter * 10)];
            } else {
                id += leters[Math.round(numberOrLetter * 10)].toUpperCase();
            }
        }
    }
    return id;
}

export { createID };