import { ADD_MESSAGE } from "src/actions/messages";

const initialState = {
    list: [
        { isMine: false, text: 'Hello' },
        { isMine: true, text: 'Hello' },
        { isMine: true, text: 'Comment vas-tu ?' },
        { isMine: false, text: 'Et bien ça va bien merci et toi ?' },
        { isMine: true, text: 'Super nickel👌' },
        {
            isMine: false,
            text: 'I love cheese, especially cheese and wine cottage cheese. Cauliflower cheese who moved my cheese lancashire blue castello feta cheese strings danish fontina babybel. Smelly cheese danish fontina caerphilly camembert de normandie stinking bishop boursin cheese on toast babybel. Bocconcini melted cheese cheddar caerphilly cow halloumi cream cheese.',
        },
        {
            isMine: true,
            text: 'Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis.',
        },
    ]
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        isMine: true,
                        text: action.payload
                    }
                ]
            }
        default:
            return state;
    }
}