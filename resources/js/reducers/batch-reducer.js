import {Types} from '../actions/batches/Types'

const initialState = {
    batches: {
        data: [],
        meta: {}
    },
    batchStudents: {
        data: [],
        meta: {}
    },
    batch: {},
    allBatches: [],
    filter: {
        program_id: 'all',
        staff_id: 'all',
        start_date: null,
        end_date: null
    }
}

export default function batchReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_BATCHES:
            return {...state, batches: action.payload}

        case Types.GET_BATCH_STUDENTS:
            return {...state, batchStudents: action.payload}

        case Types.GET_ALL_BATCHES:
            return {...state, allBatches: action.payload}

        case Types.ADD_BATCH_FILTER:
            return {...state, filter: action.payload}

        case Types.GET_BATCH:
            return {...state, batch: action.payload}

        case Types.ADD_BATCH:
            return {
                ...state,
                batches: {...state.batches, data: state.batches.data.concat(action.payload)}
            }

        case Types.UPDATE_BATCH:
            return {
                ...state,
                batch: action.payload,
                batches: {
                    ...state.batches,
                    data: state.batches.data.map((batch) => {
                        return batch.id === action.payload.id ? action.payload : batch
                    })
                }
            }

        case Types.REMOVE_BATCH:
            return {
                ...state,
                batches: {...state.batches, data: state.batches.data.filter((batch) => batch.id !== action.id)}
            }

        default:
            return state
    }
}
